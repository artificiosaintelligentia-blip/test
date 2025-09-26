import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper functions for common queries
export const prismaHelpers = {
  // Get consultant with all relations
  getConsultantWithDetails: (id: string) =>
    prisma.consultant.findUnique({
      where: { id },
      include: {
        user: true,
        specialties: {
          include: {
            specialty: true,
          },
        },
        reviews: {
          where: { isVisible: true },
          include: {
            user: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            consultationSessions: true,
            reviews: true,
            favorites: true,
          },
        },
      },
    }),

  // Get user with wallet and recent activity
  getUserWithActivity: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        consultationSessions: {
          include: {
            consultant: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        favorites: {
          include: {
            consultant: {
              select: { name: true, image: true, availability: true, pricePerMin: true },
            },
          },
        },
        notifications: {
          where: { isRead: false },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    }),

  // Get consultants with filters
  getConsultantsWithFilters: (filters: {
    specialty?: string;
    availability?: string;
    minRating?: number;
    maxPrice?: number;
    search?: string;
    limit?: number;
    offset?: number;
  }) => {
    const where: any = {
      isActive: true,
      isVerified: true,
    };

    if (filters.specialty) {
      where.specialties = {
        some: {
          specialty: {
            name: {
              contains: filters.specialty,
              mode: 'insensitive',
            },
          },
        },
      };
    }

    if (filters.availability) {
      where.availability = filters.availability;
    }

    if (filters.minRating) {
      where.rating = {
        gte: filters.minRating,
      };
    }

    if (filters.maxPrice) {
      where.pricePerMin = {
        lte: filters.maxPrice,
      };
    }

    if (filters.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          specialty: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          bio: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return prisma.consultant.findMany({
      where,
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
        _count: {
          select: {
            reviewRelations: true,
            consultationSessions: true,
          },
        },
      },
      orderBy: [
        { availability: 'asc' }, // Online first
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: filters.limit || 20,
      skip: filters.offset || 0,
    });
  },
};