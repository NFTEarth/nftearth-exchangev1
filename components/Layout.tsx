import { /*ComponentProps,*/ FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar'
// import Navbar from './Navbar'
import NetworkWarning from './NetworkWarning'

type Props = {
  // navbar: ComponentProps<typeof Navbar>
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Toaster
        position={'top-right'}
        containerStyle={{ zIndex: 100000000000 }}
      />
      <NetworkWarning />
      <Navbar />
      {children}
      {/* <main> */}
      {/* <Navbar {...navbar} /> */}
      {/* </main> */}
    </>
  )
}

export default Layout
