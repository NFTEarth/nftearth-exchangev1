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

const CollectionsCarousel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Top Collections</div>
      </div>
      <div className={styles.grid}>
        {dummyData.map((d, i) => (
          <Link key={i} href="/">
            <div className={styles.card}>
              <div className={styles.thumbnail}></div>
              <div className={styles.details}>
                <div className={styles.name}>{d.name}</div>
                <div className={styles.price}>Floor: {d.price} ETH</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CollectionsCarousel
