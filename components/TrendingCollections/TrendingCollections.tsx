import styles from './TrendingCollections.module.css'

const dummyData = [
  {
    name: 'Sewer Pass',
    floorPrice: 2.53,
    volume: 933,
    supply: 1104,
  },
  {
    name: 'Danguiz Editions',
    floorPrice: 0.06,
    volume: 92,
    supply: 1104,
  },
  {
    name: 'Angry Apes Society',
    floorPrice: 0.08,
    volume: 126,
    supply: 1104,
  },
  {
    name: 'a KID called BEAST',
    floorPrice: 0.39,
    volume: 377,
    supply: 1104,
  },
  {
    name: 'The-Collector',
    floorPrice: 0.09,
    volume: 64,
    supply: 1104,
  },
  {
    name: 'JapanDreamCollection',
    floorPrice: 0.2,
    volume: 45,
    supply: 1104,
  },
  {
    name: 'MoonGrace',
    floorPrice: 0.14,
    volume: 44,
    supply: 1104,
  },
  {
    name: 'Proceed w/ Caution',
    floorPrice: 0.58,
    volume: 252,
    supply: 1104,
  },
  {
    name: 'Mutant Hounds',
    floorPrice: 0.51,
    volume: 67,
    supply: 1104,
  },
]

const TrendingCollections = () => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.head}>
          <div>COLLECTION</div>
          <div className={styles.price}>FLOOR PRICE</div>
          <div className={styles.volume}>VOLUME</div>
          <div className={styles.supply}>SUPPLY</div>
        </div>
        {dummyData.map((d, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.details}>
              <div className={styles.index}>{i + 1}</div>
              <div className={styles.thumbnail}></div>
              <div className={styles.name}>{d.name}</div>
            </div>
            <div className={styles.price}>{d.floorPrice} ETH</div>
            <div className={styles.volume}>{d.volume} ETH</div>
            <div className={styles.supply}>{d.volume}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingCollections
