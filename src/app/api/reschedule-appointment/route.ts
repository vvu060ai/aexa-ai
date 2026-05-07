import { NextResponse } from 'next/server';
import { checkAvailability, rescheduleCalendarEvent } from '@/lib/calendar';
import { vapiResponse } from '@/lib/vapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (Reschedule Appointment) ---');
    console.log(JSON.stringify(body, null, 2));

    const toolCallId = body.message?.toolCalls?.[0]?.id;
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const { current_appointment_time, new_appointment_time } = args;

    if (!current_appointment_time || !new_appointment_time) {
      return NextResponse.json(
        { error: 'current_appointment_time and new_appointment_time are required' },
        { status: 400 }
      );
    }

    const isAvailable = await checkAvailability(new_appointment_time);
    if (!isAvailable) {
      const date = new Date(new_appointment_time);
      date.setDate(date.getDate() + 1);
      const tomorrowStr = date.toISOString().split('T')[0];
      return vapiResponse(toolCallId, {
        status: 'unavailable',
        message: 'That time is not available. Here are some alternatives.',
        suggested_slots: [
          `${tomorrowStr}T10:00:00.000Z`,
          `${tomorrowStr}T13:30:00.000Z`,
          `${tomorrowStr}T16:00:00.000Z`,
        ],
      });
    }

    await rescheduleCalendarEvent(current_appointment_time, new_appointment_time);

    return vapiResponse(toolCallId, { success: true, message: 'Appointment successfully rescheduled' });
  } catch (error: any) {
    console.error('Error in /api/reschedule-appointment:', error);
    return NextResponse.json({ error: error.message || 'Error rescheduling appointment' }, { status: 500 });
  }
}
