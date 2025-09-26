import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      users,
      consultants,
      specialties,
      blogPosts,
      consultationSessions,
      reviews,
      transactions,
      notifications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.consultant.count(),
      prisma.specialty.count(),
      prisma.blogPost.count(),
      prisma.consultationSession.count(),
      prisma.review.count(),
      prisma.transaction.count(),
      prisma.notification.count(),
    ]);

    // Additional stats
    const [
      activeConsultants,
      onlineConsultants,
      publishedPosts,
      completedSessions,
      averageRating,
      adminUsers,
      regularUsers,
      consultantUsers,
    ] = await Promise.all([
      prisma.consultant.count({ where: { isActive: true } }),
      prisma.consultant.count({ where: { availability: 'online' } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.consultationSession.count({ where: { status: 'COMPLETED' } }),
      prisma.consultant.aggregate({
        _avg: { rating: true },
        where: { reviewCount: { gt: 0 } },
      }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.user.count({ where: { role: 'CONSULTANT' } }),
    ]);

    return NextResponse.json({
      counts: {
        users,
        consultants,
        specialties,
        blogPosts,
        consultationSessions,
        reviews,
        transactions,
        notifications,
      },
      stats: {
        activeConsultants,
        onlineConsultants,
        publishedPosts,
        completedSessions,
        averageRating: averageRating._avg.rating || 0,
        usersByRole: {
          admin: adminUsers,
          user: regularUsers,
          consultant: consultantUsers,
        },
      },
      timestamp: new Date().toISOString(),
      status: 'healthy',
    });
  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json(
      { 
        error: 'Database check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        status: 'error',
      },
      { status: 500 }
    );
  }
}