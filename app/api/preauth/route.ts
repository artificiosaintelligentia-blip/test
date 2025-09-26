import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ensurePreauth, preauthSession } from '@/lib/preauth';

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

    const body = await request.json();
    const { consultantId, estimatedMinutes = 5, centsNeeded } = body;

    let result;

    if (consultantId) {
      // Pre-auth for a specific consultant session
      result = await preauthSession(session.user.id, consultantId, estimatedMinutes);
    } else if (centsNeeded) {
      // Generic pre-auth for a specific amount
      result = await ensurePreauth(session.user.id, centsNeeded);
    } else {
      return NextResponse.json(
        { error: 'Either consultantId or centsNeeded is required' },
        { status: 400 }
      );
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Pre-auth API error:', error);
    return NextResponse.json(
      { error: 'Pre-authorization failed' },
      { status: 500 }
    );
  }
}