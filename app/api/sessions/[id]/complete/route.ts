import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { actualMinutes } = await request.json();
    const sessionId = params.id;

    if (!actualMinutes || actualMinutes < 1) {
      return NextResponse.json(
        { error: 'Invalid session duration' },
        { status: 400 }
      );
    }

    // Get the session
    const consultationSession = await prisma.consultationSession.findUnique({
      where: { id: sessionId },
      include: {
        consultant: true,
        user: true
      }
    });

    if (!consultationSession) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (consultationSession.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (consultationSession.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Session already completed' },
        { status: 400 }
      );
    }

    // Calculate actual cost based on real duration
    const actualCost = Math.round(consultationSession.consultant.pricePerMin * actualMinutes * 100);
    const originalCost = consultationSession.cost;
    const costDifference = actualCost - originalCost;

    // Complete the session
    const updatedSession = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Update session
      const updated = await tx.consultationSession.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          duration: actualMinutes,
          cost: actualCost,
          endedAt: new Date()
        },
        include: {
          consultant: {
            select: { name: true, image: true }
          }
        }
      });

      // Handle cost adjustment if needed
      if (costDifference !== 0) {
        if (costDifference > 0) {
          // Session cost more than pre-authorized, deduct additional
          await tx.user.update({
            where: { id: session.user.id },
            data: {
              walletBalance: {
                decrement: costDifference
              }
            }
          });

          // Create additional transaction
          await tx.transaction.create({
            data: {
              userId: session.user.id,
              sessionId: sessionId,
              type: 'SESSION',
              amount: -costDifference,
              description: `Additional charges for extended session with ${consultationSession.consultant.name}`,
              status: 'COMPLETED'
            }
          });
        } else {
          // Session cost less than pre-authorized, refund difference
          await tx.user.update({
            where: { id: session.user.id },
            data: {
              walletBalance: {
                increment: Math.abs(costDifference)
              }
            }
          });

          // Create refund transaction
          await tx.transaction.create({
            data: {
              userId: session.user.id,
              sessionId: sessionId,
              type: 'REFUND',
              amount: Math.abs(costDifference),
              description: `Refund for shorter session with ${consultationSession.consultant.name}`,
              status: 'COMPLETED'
            }
          });
        }
      }

      // Update consultant session count
      await tx.consultant.update({
        where: { id: consultationSession.consultantId },
        data: {
          totalSessions: {
            increment: 1
          }
        }
      });

      return updated;
    });

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: 'Session completed successfully'
    });

  } catch (error) {
    console.error('Session completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete session' },
      { status: 500 }
    );
  }
}