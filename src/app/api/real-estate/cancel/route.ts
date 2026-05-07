import { NextResponse } from 'next/server';
import { cancelCalendarEvent } from '@/lib/calendar';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (RE Cancel) ---');
    console.log(JSON.stringify(body, null, 2));

    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const { datetime } = args;

    if (!datetime) {
      return NextResponse.json({ error: 'datetime is required' }, { status: 400 });
    }

    await cancelCalendarEvent(datetime);

    return NextResponse.json({ success: true, message: 'Site visit cancelled successfully' });
  } catch (error: any) {
    console.error('Error in /api/real-estate/cancel:', error);
    return NextResponse.json(
      { error: error.message || 'Error cancelling site visit' },
      { status: 500 }
    );
  }
}
