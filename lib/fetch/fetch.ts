import { paths } from '@nftearth/reservoir-sdk'
import setParams from 'lib/params'
import { Dispatch } from 'react'

const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE
type TokensResponse = paths['/tokens/v5']['get']['responses']['200']['schema']

export async function getDetails(
  contract: string | undefined,
  token: string | undefined,
  setDetails: Dispatch<TokensResponse>
) {
  const query: paths['/tokens/v5']['get']['parameters']['query'] = {
    tokens: [`${contract}:${token}`],
  }
  const href = setParams(`${PROXY_API_BASE}/tokens/v5`, query)
  const res = await fetch(href)
  const json = (await res.json()) as TokensResponse

  setDetails(json)
}
