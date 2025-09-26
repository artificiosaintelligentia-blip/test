import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

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

    const { sessionId, rating, comment } = await request.json();

    if (!sessionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid review data' },
        { status: 400 }
      );
    }

    // Verify session exists and belongs to user
    const consultationSession = await prisma.consultationSession.findUnique({
      where: { id: sessionId },
      include: {
        consultant: true,
        review: true
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

    if (consultationSession.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Can only review completed sessions' },
        { status: 400 }
      );
    }

    if (consultationSession.review) {
      return NextResponse.json(
        { error: 'Session already reviewed' },
        { status: 400 }
      );
    }

    // Create review and update consultant rating
    const review = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the review
      const newReview = await tx.review.create({
        data: {
          userId: session.user.id,
          consultantId: consultationSession.consultantId,
          sessionId,
          rating,
          comment: comment || null,
          isVerified: true, // Reviews from completed sessions are verified
          isVisible: true
        },
        include: {
          user: {
            select: { name: true, image: true }
          }
        }
      });

      // Get all reviews for this consultant to recalculate rating
      const allReviews = await tx.review.findMany({
        where: {
          consultantId: consultationSession.consultantId,
          isVisible: true
        },
        select: { rating: true }
      });

      // Calculate new average rating
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / allReviews.length;
      const reviewCount = allReviews.length;

      // Update consultant rating and review count
      await tx.consultant.update({
        where: { id: consultationSession.consultantId },
        data: {
          rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
          reviewCount
        }
      });

      return newReview;
    });

    return NextResponse.json({
      success: true,
      review,
      message: 'Review created successfully'
    });

  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}