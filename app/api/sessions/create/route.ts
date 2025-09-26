import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { preauthSession } from '@/lib/preauth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { consultantId, type, estimatedMinutes = 5, scheduledAt } = await request.json();

    if (!consultantId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Pre-authorize the session
    const preAuthResult = await preauthSession(session.user.id, consultantId, estimatedMinutes);
    
    if (!preAuthResult.success) {
      return NextResponse.json(
        { 
          error: 'Pre-authorization failed',
          message: preAuthResult.message,
          userBalance: preAuthResult.userBalance,
          requiredAmount: preAuthResult.requiredAmount
        },
        { status: 400 }
      );
    }

    const consultant = preAuthResult.consultant;
    if (!consultant) {
      return NextResponse.json(
        { error: 'Consultant not found' },
        { status: 404 }
      );
    }

    // Calculate session cost
    const sessionCost = Math.round(consultant.pricePerMin * estimatedMinutes * 100);

    // Create the session
    const consultationSession = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create consultation session
      const newSession = await tx.consultationSession.create({
        data: {
          userId: session.user.id,
          consultantId,
          type: type.toUpperCase(),
          cost: sessionCost,
          status: type === 'APPOINTMENT' ? 'PENDING' : 'ACTIVE',
          scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
          startedAt: type !== 'APPOINTMENT' ? new Date() : null,
        },
        include: {
          consultant: {
            select: { name: true, image: true, pricePerMin: true }
          }
        }
      });

      // For immediate sessions (not appointments), deduct credits
      if (type !== 'APPOINTMENT') {
        await tx.user.update({
          where: { id: session.user.id },
          data: {
            walletBalance: {
              decrement: sessionCost
            }
          }
        });

        // Create transaction record
        await tx.transaction.create({
          data: {
            userId: session.user.id,
            sessionId: newSession.id,
            type: 'SESSION',
            amount: -sessionCost,
            description: `${type} session with ${consultant.name}`,
            status: 'COMPLETED'
          }
        });
      }

      return newSession;
    });

    return NextResponse.json({
      success: true,
      session: consultationSession,
      message: 'Session created successfully'
    });

  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}