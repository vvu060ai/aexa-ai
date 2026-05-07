import { NextResponse } from 'next/server';
import { checkAvailability, rescheduleCalendarEvent } from '@/lib/calendar';
import { vapiResponse } from '@/lib/vapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (RE Reschedule) ---');
    console.log(JSON.stringify(body, null, 2));

    const toolCallId = body.message?.toolCalls?.[0]?.id;
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const { old_datetime, new_datetime } = args;

    if (!old_datetime || !new_datetime) {
      return NextResponse.json(
        { error: 'old_datetime and new_datetime are required' },
        { status: 400 }
      );
    }

    const isAvailable = await checkAvailability(new_datetime);
    if (!isAvailable) {
      return vapiResponse(toolCallId, { success: false, status: 'unavailable', message: 'That slot is not available' });
    }

    await rescheduleCalendarEvent(old_datetime, new_datetime);

    return vapiResponse(toolCallId, { success: true, message: 'Site visit rescheduled successfully' });
  } catch (error: any) {
    console.error('Error in /api/real-estate/reschedule:', error);
    return NextResponse.json({ error: error.message || 'Error rescheduling site visit' }, { status: 500 });
  }
}
