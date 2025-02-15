import * as Dialog from '@radix-ui/react-dialog'
import ConnectWalletButton from 'components/ConnectWalletButton'
import NavbarLogo from 'components/navbar/NavbarLogo'
import Link from 'next/link'
import { FC, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { HiOutlineLogout, HiX } from 'react-icons/hi'
import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'
import { Balance } from './ConnectWallet'
import EthAccount from './EthAccount'
import ThemeSwitcher from './ThemeSwitcher'
import useENSResolver from '../hooks/useENSResolver'

type Props = {
  externalLinks: {
    name: string
    url: string
  }[]
}

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || 1

const HamburgerMenu: FC<Props> = ({ externalLinks }) => {
  const [open, setOpen] = useState(false)
  const { connectors } = useConnect({ chainId: +CHAIN_ID })
  const accountData = useAccount()
  const { disconnect } = useDisconnect()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(accountData.address);
  const wallet = connectors[0]

  const hasExternalLinks = externalLinks.length > 0
  return (
    <Dialog.Root onOpenChange={setOpen} open={open} modal={false}>
      <Dialog.Trigger className="z-10 block p-1.5 md:hidden">
        <FiMenu className="h-6 w-6" />
      </Dialog.Trigger>

      <Dialog.Content
        className="fixed inset-0 z-20 transform bg-white shadow-md dark:bg-black"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-neutral-300 px-6 py-4 dark:border-neutral-600">
          <NavbarLogo variant="desktop" />
          <Dialog.Close className="py-3 px-5 text-white flex py-1.5 px-[5px] dark:text-white">
            <HiX className="h-6 w-6" />
          </Dialog.Close>
        </div>

        <div className="my-2 px-4">
          <ThemeSwitcher />
        </div>
        {accountData.isConnected ? (
          <>
            <div className="flex items-center justify-center border-b border-neutral-300 bg-neutral-100 p-4 text-[#4B5563] hover:text-[#1F2937] dark:border-neutral-600 dark:bg-black dark:text-white dark:hover:bg-neutral-600">
              <EthAccount
                address={accountData.address}
                ens={{
                  avatar: ensAvatar,
                  name: shortEnsName,
                }}
              />
            </div>

            <div className="flex items-center justify-between border-b border-neutral-300 p-4 text-[#4B5563] hover:text-[#1F2937] dark:border-neutral-600 dark:text-white">
              <span>Balance </span>
              <span>
                {accountData.address && (
                  <Balance address={accountData.address} />
                )}
              </span>
            </div>

            {hasExternalLinks && (
              <div className="grid">
                {externalLinks.map(({ name, url }) => (
                  <a
                    key={url}
                    href={url}
                    rel="noopener noreferrer"
                    className="border-b border-neutral-300 p-4 text-[#4B5563] hover:text-[#1F2937] dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}

            <Link href={`/address/${accountData.address}`} legacyBehavior={true} passHref>
              <a
                className="group flex w-full cursor-pointer items-center justify-between rounded border-b border-neutral-300 p-4 text-[#4B5563] outline-none transition hover:bg-neutral-100 hover:text-[#1F2937] focus:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
                onClick={() => setOpen(false)}
              >
                Portfolio
              </a>
            </Link>

            <button
              key={wallet.id}
              onClick={() => disconnect()}
              className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded border-b border-neutral-300 p-4 text-[#4B5563] outline-none transition hover:bg-neutral-100 hover:text-[#1F2937] focus:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-600"
            >
              <span>Disconnect</span>
              <HiOutlineLogout className="h-6 w-7" />
            </button>
          </>
        ) : (
          <div className="mt-12 px-4">
            <ConnectWalletButton className="w-full">
              <span>Connect Wallet</span>
            </ConnectWalletButton>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default HamburgerMenu
