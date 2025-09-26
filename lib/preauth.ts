import { prisma } from './prisma';

export interface PreAuthResult {
  success: boolean;
  message: string;
  userBalance: number;
  requiredAmount: number;
  remainingBalance?: number;
}

/**
 * Ensures user has sufficient credits for a session
 * @param userId - User ID to check
 * @param centsNeeded - Amount needed in cents
 * @returns PreAuthResult with success status and details
 */
export async function ensurePreauth(userId: string, centsNeeded: number): Promise<PreAuthResult> {
  try {
    // Get user's current wallet balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletBalance: true, name: true }
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
        userBalance: 0,
        requiredAmount: centsNeeded
      };
    }

    const userBalance = user.walletBalance;

    // Check if user has sufficient balance
    if (userBalance < centsNeeded) {
      const shortfall = centsNeeded - userBalance;
      return {
        success: false,
        message: `Insufficient credits. You need €${(shortfall / 100).toFixed(2)} more to start this session.`,
        userBalance,
        requiredAmount: centsNeeded
      };
    }

    // Success - user has sufficient balance
    return {
      success: true,
      message: 'Pre-authorization successful',
      userBalance,
      requiredAmount: centsNeeded,
      remainingBalance: userBalance - centsNeeded
    };

  } catch (error) {
    console.error('Pre-auth error:', error);
    return {
      success: false,
      message: 'Pre-authorization failed due to system error',
      userBalance: 0,
      requiredAmount: centsNeeded
    };
  }
}

/**
 * Calculate session cost for pre-authorization
 * @param pricePerMin - Price per minute in euros
 * @param estimatedMinutes - Estimated session duration (default: 5 minutes)
 * @returns Cost in cents
 */
export function calculateSessionCost(pricePerMin: number, estimatedMinutes: number = 5): number {
  return Math.round(pricePerMin * estimatedMinutes * 100);
}

/**
 * Get consultant pricing for pre-auth calculations
 * @param consultantId - Consultant ID
 * @returns Consultant pricing info
 */
export async function getConsultantPricing(consultantId: string) {
  const consultant = await prisma.consultant.findUnique({
    where: { id: consultantId },
    select: {
      id: true,
      name: true,
      pricePerMin: true,
      availability: true
    }
  });

  return consultant;
}

/**
 * Pre-authorize a session with a specific consultant
 * @param userId - User ID
 * @param consultantId - Consultant ID
 * @param estimatedMinutes - Estimated session duration
 * @returns PreAuthResult with session details
 */
export async function preauthSession(
  userId: string, 
  consultantId: string, 
  estimatedMinutes: number = 5
): Promise<PreAuthResult & { consultant?: any }> {
  try {
    // Get consultant pricing
    const consultant = await getConsultantPricing(consultantId);
    
    if (!consultant) {
      return {
        success: false,
        message: 'Consultant not found',
        userBalance: 0,
        requiredAmount: 0
      };
    }

    if (consultant.availability === 'offline') {
      return {
        success: false,
        message: 'Consultant is currently offline',
        userBalance: 0,
        requiredAmount: 0,
        consultant
      };
    }

    // Calculate required amount
    const requiredAmount = calculateSessionCost(consultant.pricePerMin, estimatedMinutes);

    // Check user balance
    const preAuthResult = await ensurePreauth(userId, requiredAmount);

    return {
      ...preAuthResult,
      consultant
    };

  } catch (error) {
    console.error('Session pre-auth error:', error);
    return {
      success: false,
      message: 'Session pre-authorization failed',
      userBalance: 0,
      requiredAmount: 0
    };
  }
}