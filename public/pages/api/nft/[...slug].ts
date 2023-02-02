import { NextApiRequest, NextApiResponse } from 'next'
import { setParams } from '@nftearth/reservoir-sdk'

const SIMPLEHASH_API_BASE = process.env.NEXT_PUBLIC_SIMPLEHASH_API_BASE
const SIMPLEHASH_API_KEY = process.env.NEXT_PUBLIC_SIMPLEHASH_API_KEY

const simpleHashProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method, headers: reqHeaders } = req
  const { slug } = query

  delete query.slug

  let endpoint: string = ''

  if (typeof slug === 'string') {
    endpoint = slug
  } else {
    endpoint = (slug || ['']).join('/')
  }

  const url = new URL(endpoint, SIMPLEHASH_API_BASE)
  setParams(url, query)

  try {
    const options: RequestInit | undefined = {
      method,
    }

    const headers = new Headers()

    if (SIMPLEHASH_API_KEY) headers.set('x-api-key', SIMPLEHASH_API_KEY)

    if (typeof body === 'object') {
      headers.set('Content-Type', 'application/json')
      options.body = JSON.stringify(body)
    }

    options.headers = headers

    const response = await fetch(url.href, options)

    let data: any

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) throw data

    // 200 OK
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    if (contentType?.includes('image/')) {
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(Buffer.from(data))
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    // 400 Bad Request
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
    res.status(400).json(error)
  }
}

export default simpleHashProxy;