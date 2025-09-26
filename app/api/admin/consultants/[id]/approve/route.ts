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

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const consultantId = params.id;
    const { reviewNote } = await request.json();

    // Find the consultant
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: { user: true }
    });

    if (!consultant) {
      return NextResponse.json(
        { error: 'Consultant not found' },
        { status: 404 }
      );
    }

    // Update consultant status
    const updatedConsultant = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Update consultant
      const updated = await tx.consultant.update({
        where: { id: consultantId },
        data: {
          isVerified: true,
          isActive: true,
        }
      });

      // Update user role to CONSULTANT
      await tx.user.update({
        where: { id: consultant.userId },
        data: {
          role: 'CONSULTANT'
        }
      });

      // Create notification for consultant
      await tx.notification.create({
        data: {
          userId: consultant.userId,
          type: 'SYSTEM',
          title: 'Application Approved',
          message: 'Your consultant application has been approved! You can now start accepting sessions.',
          data: {
            consultantId: consultantId,
            reviewNote: reviewNote || null
          }
        }
      });

      return updated;
    });

    return NextResponse.json({
      success: true,
      consultant: updatedConsultant,
      message: 'Consultant approved successfully'
    });

  } catch (error) {
    console.error('Consultant approval error:', error);
    return NextResponse.json(
      { error: 'Failed to approve consultant' },
      { status: 500 }
    );
  }
}