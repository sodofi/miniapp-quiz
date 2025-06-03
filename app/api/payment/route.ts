import { NextResponse } from 'next/server'
import { createPublicClient, http, parseEther } from 'viem'
import { celo } from 'wagmi/chains'

const publicClient = createPublicClient({
  chain: celo,
  transport: http()
})

export async function POST(request: Request) {
  try {
    const { amount, to, from } = await request.json()

    // For Farcaster Mini Apps, we don't need to send the transaction from the server
    // Instead, we'll return the transaction data for the client to sign and send
    return NextResponse.json({
      to,
      value: amount,
      from,
    })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
} 