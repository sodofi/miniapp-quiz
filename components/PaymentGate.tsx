'use client'

import { useState } from 'react'
import { useAccount, useConnect, useSendTransaction, useTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { sdk } from '@farcaster/frame-sdk'

const PAYMENT_AMOUNT = '0.1'
const RECIPIENT_ADDRESS = '0x4858aBb6dfF69904f1c155D40A48CD8846AEA2f6' // Replace with your actual address

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
    onPaymentSuccess()
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-4 tracking-tight">UNLOCK</h1>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-4 tracking-tight text-yellow-400">
            THE QUIZ
          </h1>
          <div className="bg-yellow-400 text-black p-6 transform -rotate-2 inline-block mt-8">
            <h2 className="text-4xl md:text-6xl font-black">0.1 CELO</h2>
          </div>
        </div>

        <div className="mt-16">
          <Button
            onClick={handlePayment}
            disabled={isPaying}
            className="bg-white text-black hover:bg-yellow-400 hover:text-black text-2xl font-black px-12 py-6 h-auto border-4 border-black transform hover:scale-105 transition-transform"
          >
            {!isConnected
              ? 'CONNECT WALLET'
              : isPaying
              ? 'PROCESSING...'
              : 'PAY 0.1 CELO TO START'}
          </Button>
        </div>

        {hash && (
          <div className="mt-8 text-xl font-bold">
            Transaction pending...
            <br />
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
  )
} 