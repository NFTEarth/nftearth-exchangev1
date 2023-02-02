import TrendingCollections from 'components/TrendingCollections'
import Link from 'next/link'
import { useState } from 'react'
import styles from './CollectionsTable.module.css'

interface IProps {
  collections: any
}

const CollectionsTable = ({ collections }: IProps) => {
  const [collectionsType, setCollectionsType] = useState<'TR' | 'TP'>('TR')
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            data-active={collectionsType == 'TR'}
            onClick={() => setCollectionsType('TR')}
          >
            Trending
          </button>
          {/* <button
            data-active={collectionsType == 'TP'}
            onClick={() => setCollectionsType('TP')}
          >
            Top
          </button> */}
          <Link href="#">View all</Link>
        </div>
        <TrendingCollections data={collections} />
      </div>
    </section>
  )
}

export default CollectionsTable
