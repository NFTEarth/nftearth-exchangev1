import { FC } from 'react'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import ImagesGrid from './ImagesGrid'
import usePaginatedCollections from 'hooks/usePaginatedCollections'
import LoadingCardCollection from './LoadingCardCollection'
import Masonry from 'react-masonry-css'

type Props = {
  collections: any
}

const CollectionsGrid: FC<Props> = ({ collections }) => {
  const {
    collections: collectionsData
  } = collections

  const mappedCollections = collectionsData
    ? collectionsData
        // @ts-ignore
        .filter((collection) => !collection?.sampleImages?.includes(null))
    : []
  const didReachEnd = true;

  return (
    <Masonry
      key="collectionGridMasonry"
      breakpointCols={{
        default: 5,
        1536: 4,
        1280: 3,
        1024: 3,
        768: 2,
        640: 2,
        500: 1,
      }}
      className="masonry-grid col-span-full px-2"
      columnClassName="masonry-grid_column"
    >
      {!collectionsData
        ? Array(16)
            .fill(null)
            .map((_, index) => (
              <div
                key={`loading-card-${index}`}
                className="h-[310px] w-full animate-pulse bg-white shadow-md dark:bg-neutral-900"
              />
            ))
        : mappedCollections
            .map((collection: any, idx: number) => (
              <Link
                key={`${collection?.name}${idx}`}
                href={`/collections/${idx}`}
                legacyBehavior={true}
                passHref
              >
                <a className="group mb-6 block transform-gpu overflow-hidden rounded-[16px] border border-[#D4D4D4] bg-white p-3 transition ease-in hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg hover:ease-out dark:border-0 dark:bg-neutral-800 dark:ring-1 dark:ring-neutral-600">
                  <ImagesGrid
                    sample_images={collection?.sampleImages}
                    value={collection?.name || ''}
                  />
                  <div className="mt-3 flex items-center gap-2">
                    {(collection?.image_url || false) ? (
                      <img
                        src={optimizeImage(collection?.image_url, 80)}
                        className="h-12 w-12 rounded-full"
                        alt="Collection Image"
                      />
                    ) : (
                      <div className="h-12 w-12 flex-none rounded-full bg-gradient-to-br from-primary-500 to-primary-900"></div>
                    )}

                    <div className="reservoir-subtitle dark:text-white">
                      {collection?.name}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
    </Masonry>
  )
}

export default CollectionsGrid
