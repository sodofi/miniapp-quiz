'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useSendTransaction, useTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { sdk } from '@farcaster/frame-sdk'
import { X } from 'lucide-react'

const PAYMENT_AMOUNT = '0.1'
const RECIPIENT_ADDRESS = '0x4858aBb6dfF69904f1c155D40A48CD8846AEA2f6' // Replace with your actual address

interface PaymentGateProps {
  onPaymentSuccess: () => void
  children: React.ReactNode
}

export function PaymentGate({ onPaymentSuccess, children }: PaymentGateProps) {
  const [isPaying, setIsPaying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  
  const { data: hash, sendTransaction } = useSendTransaction()
  
  const { isSuccess: isTransactionSuccess } = useTransaction({
    hash,
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isTransactionSuccess) {
      setShowSuccess(true)
      timeout = setTimeout(() => {
        handleSuccessDismiss()
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isTransactionSuccess])

  const handleSuccessDismiss = () => {
    setShowSuccess(false)
    onPaymentSuccess()
  }

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

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white text-black p-8 rounded-lg max-w-md w-full mx-4 relative transform rotate-2">
          <button
            onClick={handleSuccessDismiss}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">SUCCESS! 🎉</h2>
            <p className="text-xl font-bold mb-4">Transaction confirmed!</p>
            <a
              href={`https://explorer.celo.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 hover:text-yellow-700 underline font-bold block mb-4"
            >
              View on Explorer
            </a>
            <Button
              onClick={handleSuccessDismiss}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-8 py-3 transform hover:scale-105 transition-transform"
            >
              START QUIZ
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isTransactionSuccess) {
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

        {hash && !isTransactionSuccess && (
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