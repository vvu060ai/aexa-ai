import { NextResponse } from 'next/server';
import { cancelCalendarEvent } from '@/lib/calendar';
import { vapiResponse } from '@/lib/vapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (Cancel Appointment) ---');
    console.log(JSON.stringify(body, null, 2));

    const toolCallId = body.message?.toolCalls?.[0]?.id;
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const { appointment_time } = args;

    if (!appointment_time) {
      return NextResponse.json({ error: 'appointment_time is required' }, { status: 400 });
    }

    await cancelCalendarEvent(appointment_time);

    return vapiResponse(toolCallId, { success: true, message: 'Appointment successfully cancelled' });
  } catch (error: any) {
    console.error('Error in /api/cancel-appointment:', error);
    return NextResponse.json({ error: error.message || 'Error cancelling appointment' }, { status: 500 });
  }
}
