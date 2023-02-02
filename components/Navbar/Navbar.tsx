// import useEnvChain from 'hooks/useEnvChain'
// import Link from 'next/link'
// import { FC } from 'react'

// const NAVBAR_LOGO = process.env.NEXT_PUBLIC_NAVBAR_LOGO
// const SOURCE_ID = process.env.NEXT_PUBLIC_SOURCE_ID
// const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
// const DESKTOP_NAVBAR_LOGO = process.env.NEXT_PUBLIC_DESKTOP_NAVBAR_LOGO
// const NAVBAR_LOGO_LINK = process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK

// type Props = {
//   variant?: 'desktop' | 'mobile' | undefined
//   className?: string
// }

// const Navbar: FC<Props> = ({ variant, className }) => {
//   const logo = NAVBAR_LOGO || '/reservoir.svg'
//   const desktopLogo = DESKTOP_NAVBAR_LOGO || '/reservoir-desktop.svg'
//   const chain = useEnvChain()
//   let logoAlt = 'Logo'

//   if (SOURCE_NAME) {
//     logoAlt = SOURCE_NAME
//   } else if (SOURCE_ID) {
//     logoAlt = SOURCE_ID
//   }

//   const mobileVariant = variant == 'mobile'
//   const desktopVariant = variant == 'desktop'

//   return (
//     <Link href={NAVBAR_LOGO_LINK || '/'} legacyBehavior={true} passHref>
//       <a
//         className={`relative inline-flex flex-none items-center justify-center gap-1 ${className}`}
//       >
//         <img src={logo} alt={logoAlt} className={`h-9 w-auto`} />

//         {chain?.testnet && (
//           <div
//             className={`reservoir-tiny inline rounded-[4px] bg-[#ef5c5c] p-1 py-[2px]
//           ${
//             !variant || desktopVariant
//               ? 'md:absolute md:left-[-50px] md:bottom-[8px]'
//               : ''
//           }
//           `}
//           >
//             Testnet
//           </div>
//         )}
//       </a>
//     </Link>
//   )
// }

// export default Navbar

import {
  /*ReactElement, useEffect, useState*/ FormEvent,
  useState,
} from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import ConnectWallet from 'components/ConnectWallet'
import { FaBars, FaSearch, FaShoppingCart, FaTimes } from 'react-icons/fa'
// import ConnectWallet from 'components/ConnectWallet'
// import HamburgerMenu from 'components/HamburgerMenu'
// import dynamic from 'next/dynamic'
// import ThemeSwitcher from 'components/ThemeSwitcher'
// import CartMenu from 'components/CartMenu'
// import { paths } from '@nftearth/reservoir-sdk'
// import setParams from 'lib/params'
// import NavbarLogo from 'components/Navbar/Navbar'
// import SearchMenu from 'components/SearchMenu'
// import { useMediaQuery } from '@react-hookz/web'
// import useMounted from 'hooks/useMounted'

// const SearchCollections = dynamic(() => import('components/SearchCollections'))
const NAVBAR_LOGO_LINK = process.env.NEXT_PUBLIC_NAVBAR_LOGO_LINK
const logo = process.env.NEXT_PUBLIC_NAVBAR_LOGO || '/reservoir.svg'
// const CommunityDropdown = dynamic(() => import('components/CommunityDropdown'))
// const EXTERNAL_LINKS = process.env.NEXT_PUBLIC_EXTERNAL_LINKS || null
// const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
// const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
// const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID
// const DEFAULT_TO_SEARCH = process.env.NEXT_PUBLIC_DEFAULT_TO_SEARCH

// function getInitialSearchHref() {
//   const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE
//   const pathname = `${PROXY_API_BASE}/search/collections/v1`
//   const query: paths['/search/collections/v1']['get']['parameters']['query'] =
//     {}

//   if (COLLECTION_SET_ID) {
//     query.collectionsSetId = COLLECTION_SET_ID
//   } else {
//     if (COMMUNITY) query.community = COMMUNITY
//   }

//   return setParams(pathname, query)
// }

const Navbar = () => {
  // const isMounted = useMounted()
  // const [showLinks, setShowLinks] = useState(true)
  // const [filterComponent, setFilterComponent] = useState<ReactElement | null>(
  //   null
  // )
  // const isMobile = useMediaQuery('(max-width: 770px)')
  // const showDesktopSearch = useMediaQuery('(min-width: 1200px)')
  // const [hasCommunityDropdown, setHasCommunityDropdown] =
  //   useState<boolean>(false)

  // const externalLinks: { name: string; url: string }[] = []

  // if (typeof EXTERNAL_LINKS === 'string') {
  //   const linksArray = EXTERNAL_LINKS.split(',')

  //   linksArray.forEach((link) => {
  //     let values = link.split('::')
  //     externalLinks.push({
  //       name: values[0],
  //       url: values[1],
  //     })
  //   })
  // }

  // const isGlobal = !COMMUNITY && !COLLECTION && !COLLECTION_SET_ID
  // const filterableCollection = isGlobal || COMMUNITY || COLLECTION_SET_ID

  // useEffect(() => {
  //   setShowLinks(externalLinks.length > 0)
  // }, [])

  // useEffect(() => {
  //   if (filterableCollection) {
  //     const href = getInitialSearchHref()

  //     fetch(href).then(async (res) => {
  //       let initialResults = undefined

  //       if (res.ok) {
  //         initialResults =
  //           (await res.json()) as paths['/search/collections/v1']['get']['responses']['200']['schema']
  //       }

  //       const smallCommunity =
  //         initialResults?.collections &&
  //         initialResults.collections.length >= 2 &&
  //         initialResults.collections.length <= 10

  //       const hasCommunityDropdown =
  //         !DEFAULT_TO_SEARCH &&
  //         (COMMUNITY || COLLECTION_SET_ID) &&
  //         smallCommunity

  //       if (hasCommunityDropdown) {
  //         setFilterComponent(
  //           <CommunityDropdown
  //             collections={initialResults?.collections}
  //             defaultCollectionId={COLLECTION}
  //           />
  //         )
  //         setHasCommunityDropdown(true)
  //       } else {
  //         setHasCommunityDropdown(false)
  //         !showDesktopSearch
  //           ? setFilterComponent(
  //               <SearchMenu
  //                 communityId={COMMUNITY}
  //                 initialResults={initialResults}
  //               />
  //             )
  //           : setFilterComponent(
  //               <SearchCollections
  //                 communityId={COMMUNITY}
  //                 initialResults={initialResults}
  //               />
  //             )
  //       }
  //     })
  //   }
  // }, [filterableCollection, showDesktopSearch])

  // if (!isMounted) {
  //   return null
  // }
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href={NAVBAR_LOGO_LINK || '/'} legacyBehavior={true} passHref>
          <a className={styles.logo}>
            <img src={logo} alt="logo" className={`h-9 w-auto`} /> NFTEarth
          </a>
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FaSearch className={styles.icon} />
          <input
            autoComplete="off"
            type="search"
            placeholder="Search for collections and accounts"
          />
        </form>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/stats">Stats</Link>
            </li>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
            <li>
              <button>
                <FaShoppingCart />
              </button>
            </li>
            <li>
              <ConnectWallet />
            </li>
          </ul>
        </nav>
        <div className={styles.mobile__actions}>
          <button>
            <FaSearch />
          </button>
          <button>
            <FaBars onClick={() => setIsMobileMenuVisible(true)} />
          </button>
        </div>

        <div className={styles.mobile__menu} data-visible={isMobileMenuVisible}>
          <button
            data-action="close"
            onClick={() => setIsMobileMenuVisible(false)}
          >
            <FaTimes />
          </button>
          <span>Menu</span>
          <Link href="/stats">Stats</Link>
          <Link href="/stats">Sell</Link>
          <button>Connect Wallet</button>
        </div>
      </div>

      {/* <SearchCollections />
      <HamburgerMenu externalLinks={[]} />
      <ThemeSwitcher />
      <CartMenu />
      <ConnectWallet />
      <CommunityDropdown collections={undefined} />
      {(hasCommunityDropdown || showDesktopSearch) && (
        <div className="flex h-full w-full items-center">
          {filterComponent && filterComponent}
        </div>
      )}
      {showLinks && (
        <div className="z-10 ml-12 mr-12 hidden items-center gap-11 md:flex">
          {externalLinks.map(({ name, url }) => (
            <a
              key={url}
              href={url}
              className="text-dark reservoir-h6 hover:text-[#1F2937] dark:text-white"
            >
              {name}
            </a>
          ))}
        </div>
      )}
      {isMobile ? (
        <div className="ml-auto flex gap-x-5">
          {!hasCommunityDropdown && filterComponent && filterComponent}
          <CartMenu />
          <HamburgerMenu externalLinks={externalLinks} />
        </div>
      ) : (
        <div className="z-10 ml-auto shrink-0 gap-2 md:flex xl:gap-4">
          {!hasCommunityDropdown && !showDesktopSearch && (
            <div className="ml-auto flex">
              {filterComponent && filterComponent}
            </div>
          )}
          <ThemeSwitcher />
          <CartMenu />
          <ConnectWallet />
        </div>
      )} */}
    </div>
  )
}

export default Navbar
