import { NextResponse } from 'next/server'
import farcasterConfig from '../../../../public/.well-known/farcaster.json'

export async function GET() {
  return NextResponse.json(farcasterConfig, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
  })
} 