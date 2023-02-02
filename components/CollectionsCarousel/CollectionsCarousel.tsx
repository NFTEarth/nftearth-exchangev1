import { optimizeImage } from 'lib/optmizeImage'
// import Image from 'next/image'
import Link from 'next/link'
import styles from './CollectionsCarousel.module.css'

const dummyData = [
  {
    name: 'FashionDuck',
    price: 0.02,
  },
  {
    name: 'NecroParadise',
    price: 0.05,
  },
  {
    name: 'RTFKT PodX',
    price: 0.37,
  },
  {
    name: 'Regulars',
    price: 0.12,
  },
  {
    name: 'FreakyGirls',
    price: 0.04,
  },
  {
    name: "SAM PIERSON'S DRAIN BRAIN",
    price: 0.05,
  },
  {
    name: 'archive edition',
    price: 0.04,
  },
  {
    name: 'Quantum by Beeple My Father',
    price: 0.05,
  },
  {
    name: 'Proceed w/ Caution',
    price: 0.05,
  },
]

interface IProps {
  collections: any
}

const CollectionsCarousel = ({ collections }: IProps) => {
  const { collections: collectionsData } = collections
  const mappedCollections = collectionsData
    ? collectionsData.filter(
        (collection: any) => !collection?.sampleImages?.includes(null)
      )
    : []

  console.log('collections =>', collections)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Top Collections</div>
      </div>
      {!collectionsData && (
        <div className={styles.grid}>
          {dummyData.map((collection, idx) => (
            <Link key={idx} href="/">
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  {/* <Image src={collection?.image} alt="image" /> */}
                </div>
                <div className={styles.details}>
                  <div className={styles.name}>{collection?.name}</div>
                  <div className={styles.price}>
                    Floor: {collection.price} ETH
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {collectionsData && (
        <div className={styles.grid}>
          {mappedCollections.map((collection: any, idx: number) => (
            <Link
              key={`${collection?.name}${idx}`}
              href="#"
              //{`/collections/${collection?.slug}`}
            >
              <div className={styles.card}>
                <div className={styles.thumbnail}>
                  <img
                    src={optimizeImage(collection?.image, 80)}
                    alt="collection image"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.name}>{collection?.name}</div>
                  <div className={styles.price}>
                    Floor: {idx + 0.38 * 0.5} ETH
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default CollectionsCarousel
