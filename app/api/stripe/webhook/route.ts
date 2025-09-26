import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeEnabled } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isStripeEnabled() || !stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    );
  }

  try {
    const buf = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { userId, amount } = session.metadata;

      if (userId && amount) {
        const amountInCents = Math.round(parseFloat(amount) * 100);

        // Start a transaction to ensure data consistency
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // Create transaction record
          await tx.transaction.create({
            data: {
              userId,
              type: 'TOPUP',
              amount: amountInCents,
              description: `Credits gekocht via Stripe - €${amount}`,
              status: 'COMPLETED',
              stripeSessionId: session.id,
              stripePaymentId: session.payment_intent,
              metadata: {
                paymentMethod: session.payment_method_types?.[0] || 'unknown',
                customerEmail: session.customer_email,
              },
            },
          });

          // Update user wallet balance
          await tx.user.update({
            where: { id: userId },
            data: {
              walletBalance: {
                increment: amountInCents,
              },
            },
          });
        });

        console.log(`Wallet top-up completed: User ${userId}, Amount: €${amount}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}