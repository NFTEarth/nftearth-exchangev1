import Layout from 'components/Layout'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { paths } from '@nftearth/reservoir-sdk'
import setParams from 'lib/params'
import Head from 'next/head'
import TrendingCollectionTable from 'components/TrendingCollectionTable'
import SortTrendingCollections from 'components/SortTrendingCollections'
import Footer from 'components/Footer'
import { useMediaQuery } from '@react-hookz/web'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomCollectionsGrid from '../components/CustomCollectionsGrid'
import Link from 'next/link'
import Navbar from 'components/Navbar'
import HeroSection from 'components/HeroSection'
import CollectionsCarousel from 'components/CollectionsCarousel'
import CollectionsTable from 'components/CollectionsTable'

// Environment variables
// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE
const SIMPLEHASH_API_BASE = process.env.NEXT_PUBLIC_SIMPLEHASH_API_BASE
const SIMPLEHASH_API_KEY = process.env.NEXT_PUBLIC_SIMPLEHASH_API_KEY

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
  // const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)')
  console.log('fallback =>', fallback)
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
    <Layout>
      <Head>
        <Head>
          <title>{META_TITLE}</title>
          <meta name="description" content={META_DESCRIPTION} />
          <meta name="twitter:image" content={META_IMAGE} />
          <meta name="og:image" content={META_IMAGE} />
        </Head>
      </Head>
      <HeroSection />
      <CollectionsCarousel collections={fallback.topCollections} />
      <CollectionsTable />
      {/* <Navbar /> */}
      {/* <div className="main col-span-full mb-[50px] px-6 md:px-16">
        <div className="mb-9 flex w-full items-center justify-between">
          <div className="hero-home">
            <Link href="/stats" legacyBehavior={true}>
              <a className="gap-1 rounded-full border-transparent bg-gray-100 py-4 px-6 normal-case text-black focus:ring-0 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:ring-primary-900 dark:focus:ring-4">
                <strong>Discover</strong>
              </a>
            </Link>
          </div>
        </div>
        <div className="mb-9 mt-[60px] flex w-full items-center justify-between">
          <div className="reservoir-h4 text-white">Top Collections</div>
        </div>
        <CustomCollectionsGrid collections={fallback.topCollections} />
        <div className="mb-9 flex w-full items-center justify-between">
          <div className="reservoir-h4 text-white">Trending Collections</div>
          {!isSmallDevice && <SortTrendingCollections />}
        </div>
        <TrendingCollectionTable fallback={fallback} />
      </div> */}
      <Footer />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  fallback: {
    topCollections: any
    collections: paths['/collections/v5']['get']['responses']['200']['schema']
  }
}> = async () => {
  const options: RequestInit | undefined = {}

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const collectionsSetId =
    'f6eff166c8536189c31b52c20ce2d425871e6a57f7f5bc7ac7b5d8d362ba9633'

  const url = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    sortBy: '1DayVolume',
    collectionsSetId,
    normalizeRoyalties: true,
  }

  const url2 = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query2: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 20,
    sortBy: '1DayVolume',
    normalizeRoyalties: true,
  }

  const href = setParams(url, query)
  const href2 = setParams(url2, query2)
  const res = await fetch(href, options)
  const res2 = await fetch(href2, options)

  const topCollections =
    (await res.json()) as Props['fallback']['topCollections']
  const collections = (await res2.json()) as Props['fallback']['collections']

  return {
    props: {
      fallback: {
        topCollections,
        collections,
      },
    },
  }
}
