'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useSendTransaction, useTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { sdk } from '@farcaster/frame-sdk'

const PAYMENT_AMOUNT = '0.1'
const RECIPIENT_ADDRESS = '0x4858aBb6dfF69904f1c155D40A48CD8846AEA2f6'

interface PaymentGateProps {
  onPaymentSuccess: () => void
  children: React.ReactNode
}

export function PaymentGate({ onPaymentSuccess, children }: PaymentGateProps) {
  const [isPaying, setIsPaying] = useState(false)
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  
  const { data: hash, sendTransaction } = useSendTransaction()
  
  const { isSuccess: isTransactionSuccess } = useTransaction({
    hash,
  })

  useEffect(() => {
    if (isTransactionSuccess) {
      onPaymentSuccess()
    }
  }, [isTransactionSuccess, onPaymentSuccess])

  const handlePayment = async () => {
    if (!isConnected || !address) {
      connect({ connector: connectors[0] })
      return
    }

    try {
      setIsPaying(true)
      await sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: parseEther(PAYMENT_AMOUNT),
      })
    } catch (error) {
      console.error('Payment failed:', error)
      setIsPaying(false)
    }
  }

  // Initialize Farcaster SDK
  sdk.actions.ready()

  if (isTransactionSuccess) {
    return <>{children}</>
  }

  return (
    // Outer container for full-screen web view
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      {/* Inner container that maintains Farcaster frame dimensions */}
      <div className="w-full max-w-[424px] min-h-[695px] flex flex-col items-center justify-center">
        <div className="w-full text-center">
          <div className="mb-8 md:mb-12">
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-4 tracking-tight">UNLOCK</h1>
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-4 tracking-tight text-yellow-400">
              THE QUIZ
            </h1>
            <div className="bg-yellow-400 text-black p-4 md:p-8 transform -rotate-2 inline-block mt-6">
              <h2 className="text-3xl md:text-5xl font-black">0.1 CELO</h2>
            </div>
          </div>

          <div className="mt-12">
            <Button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full md:w-auto bg-white text-black hover:bg-yellow-400 hover:text-black text-xl md:text-3xl font-black px-8 md:px-16 py-4 md:py-8 h-auto border-4 border-black transform hover:scale-105 transition-transform"
            >
              {!isConnected
                ? 'CONNECT WALLET'
                : isPaying
                ? 'PROCESSING...'
                : 'PAY 0.1 CELO TO START'}
            </Button>
          </div>

          {hash && (
            <div className="mt-6 text-lg md:text-2xl font-bold">
              {!isTransactionSuccess ? (
                <>
                  Transaction pending...
                  <br />
                </>
              ) : (
                <>
                  Transaction completed!
                  <br />
                </>
              )}
              <a
                href={`https://explorer.celo.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                View on Explorer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 