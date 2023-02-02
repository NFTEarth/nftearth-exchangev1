import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC, ReactElement } from 'react'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { useAccount } from 'wagmi'

type Props = {
  className?: HTMLButtonElement['className']
  children: ReactElement | ReactNode
}

const ConnectWalletButton: FC<Props> = ({ className = '', children }) => {
  const account = useAccount()

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'

        return (
          <div
            {...((!ready || account.isConnected) && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'none',
              },
            })}
          >
            {(() => {
              return (
                <button
                  onClick={openConnectModal}
                  type="button"
                  data-action="connect"
                >
                  {children}
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWalletButton
