import { NextResponse } from 'next/server';
import { isStripeEnabled } from '@/lib/stripe';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: true, // We'll assume it's working if we can respond
      stripe: isStripeEnabled(),
      auth: !!(process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL),
    },
  };

  return NextResponse.json(health);
}