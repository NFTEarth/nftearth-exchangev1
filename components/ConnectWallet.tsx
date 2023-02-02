import { FC } from 'react'
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  Address,
} from 'wagmi'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { HiOutlineLogout } from 'react-icons/hi'
import FormatNativeCrypto from './FormatNativeCrypto'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useMounted from 'hooks/useMounted'
import useENSResolver from '../hooks/useENSResolver'
import Avatar from './Avatar'
// import { FaWallet } from 'react-icons/fa'

const DARK_MODE = process.env.NEXT_PUBLIC_DARK_MODE
const DISABLE_POWERED_BY_RESERVOIR =
  process.env.NEXT_PUBLIC_DISABLE_POWERED_BY_RESERVOIR
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || 1

const ConnectWallet: FC = () => {
  const account = useAccount()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(account?.address)
  const { connectors } = useConnect({ chainId: +CHAIN_ID })
  const { disconnect } = useDisconnect()
  const wallet = connectors[0]
  const isMounted = useMounted()

  if (!isMounted) {
    return null
  }

  if (!account.isConnected)
    return <ConnectWalletButton>{'Connect Wallet'}</ConnectWalletButton>

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="ml-auto rounded-full border-transparent p-0 normal-case outline dark:bg-neutral-900">
        <Avatar address={account.address} avatar={ensAvatar} size={40} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={6}>
        <div
          className={`w-48 space-y-1  bg-white px-1.5 py-2 shadow-md radix-side-bottom:animate-slide-down dark:bg-neutral-900 md:w-56 ${
            DISABLE_POWERED_BY_RESERVOIR ? 'rounded' : 'rounded-t'
          }`}
        >
          <div className="group flex w-full cursor-pointer items-center justify-between rounded px-4 py-3 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            {shortEnsName ? (
              <span>{shortEnsName}</span>
            ) : (
              <span>{shortAddress}</span>
            )}
          </div>
          <div className="group flex w-full cursor-pointer items-center justify-between rounded px-4 py-3 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            <span>Balance </span>
            <span>
              {account.address && <Balance address={account.address} />}
            </span>
          </div>
          <Link
            href={`/address/${account.address}`}
            legacyBehavior={true}
            passHref
          >
            <DropdownMenu.Item asChild>
              <a className="group flex w-full cursor-pointer items-center justify-between rounded px-4 py-3 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                Portfolio
              </a>
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item asChild>
            <div
              tabIndex={0}
              key={wallet.id}
              onClick={() => {
                disconnect()
              }}
              className="group flex w-full cursor-pointer items-center justify-between rounded px-4 py-3 outline-none transition hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <span>Disconnect</span>
              <HiOutlineLogout className="h-6 w-7" />
            </div>
          </DropdownMenu.Item>
        </div>
        {/* {!DISABLE_POWERED_BY_RESERVOIR && (
          <div className="group mx-auto flex w-full cursor-pointer items-center justify-center gap-3 rounded-b-2xl bg-neutral-100  py-4 px-4 outline-none  transition dark:bg-neutral-800 ">
            <Link
              href="https://reservoirprotocol.github.io/"
              legacyBehavior={true}
              passHref
            >
              <a
                className="reservoir-tiny flex gap-2 dark:text-white"
                target="_blank"
              >
                Powered by{' '}
                <img
                  src={
                    !!DARK_MODE
                      ? `/reservoir_watermark_dark.svg`
                      : `/reservoir_watermark_light.svg`
                  }
                />
              </a>
            </Link>
          </div>
        )} */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default ConnectWallet

type Props = {
  address: string
}

export const Balance: FC<Props> = ({ address }) => {
  const { data: balance } = useBalance({
    chainId: +CHAIN_ID,
    address: address as Address,
  })
  return <FormatNativeCrypto amount={balance?.value} />
}
