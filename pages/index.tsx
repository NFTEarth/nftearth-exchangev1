import Layout from 'components/Layout'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { paths } from '@reservoir0x/reservoir-sdk'
import setParams from 'lib/params'
import Head from 'next/head'
// import TrendingCollectionTable from 'components/TrendingCollectionTable'
import Footer from 'components/Footer'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomCollectionsGrid from '../components/CustomCollectionsGrid'
import Link from 'next/link'

// Environment variables
// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE

// OPTIONAL
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
const REDIRECT_HOMEPAGE = process.env.NEXT_PUBLIC_REDIRECT_HOMEPAGE
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ fallback }) => {
  const router = useRouter()

  useEffect(() => {
    if (REDIRECT_HOMEPAGE && COLLECTION) {
      router.push(`/collections/${COLLECTION}`)
    }
  }, [COLLECTION, REDIRECT_HOMEPAGE])

  // Return error page if the API base url or the environment's
  // chain ID are missing
  if (!CHAIN_ID) {
    console.debug({ CHAIN_ID })
    return <div>There was an error</div>
  }

  if (REDIRECT_HOMEPAGE && COLLECTION) return null

  return (
    <Layout navbar={{}}>
      <Head>
        <Head>
          <title>{META_TITLE}</title>
          <meta name="description" content={META_DESCRIPTION} />
          <meta name="twitter:image" content={META_IMAGE} />
          <meta name="og:image" content={META_IMAGE} />
        </Head>
      </Head>
      <div className="col-span-full px-6 md:px-16 mb-[50px]">
        <div className="mb-9 flex w-full items-center justify-between">
          <div className="hero-home">
            <Link href="/stats" legacyBehavior={true}>
              <a
                className="btn-primary-outline gap-1 rounded-full border-transparent bg-gray-100 normal-case focus:ring-0 dark:border-neutral-600 dark:bg-neutral-900 dark:ring-primary-900 dark:focus:ring-4"
              >
                <strong>Discover</strong>
              </a>
            </Link>
            <div>
              <h2>NFT Buy and Sell NFTs on L2</h2>
            </div>
          </div>
        </div>
        <div className="mb-9 flex w-full items-center justify-between mt-[60px]">
          <div className="reservoir-h4 dark:text-white">
            Top Collections
          </div>
        </div>
        <CustomCollectionsGrid collections={fallback.trendingCollections} />
        <div className="mb-9 flex w-full items-center justify-between mt-[40px]">
          <div className="reservoir-h4 dark:text-white">
            Trending Collections
          </div>
        </div>
        <CustomCollectionsGrid collections={fallback.topCollections} />
      </div>
      <Footer />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  fallback: {
    topCollections: paths['/collections/v5']['get']['responses']['200']['schema'],
    trendingCollections: paths['/collections/v5']['get']['responses']['200']['schema']
  }
}> = async () => {
  const options: RequestInit | undefined = {}

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const url = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 8,
    sortBy: '1DayVolume',
    normalizeRoyalties: true,
  }

  let query2: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 8,
    sortBy: 'allTimeVolume',
    normalizeRoyalties: true,
  }

  if (COLLECTION && !COMMUNITY) query.contract = [COLLECTION]
  if (COMMUNITY) query.community = COMMUNITY
  if (COLLECTION_SET_ID) query.collectionsSetId = COLLECTION_SET_ID

  const href = setParams(url, query)
  const href2 = setParams(url, query2)

  const res = await fetch(href, options)
  const res2 = await fetch(href2, options)

  const trendingCollections = (await res.json()) as Props['fallback']['trendingCollections']
  const topCollections = (await res2.json()) as Props['fallback']['topCollections']

  return {
    props: {
      fallback: {
        trendingCollections,
        topCollections
      },
    },
  }
}
