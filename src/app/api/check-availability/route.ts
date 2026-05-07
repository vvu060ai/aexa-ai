import { NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/calendar';
import { vapiResponse } from '@/lib/vapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (Check Availability) ---');
    console.log(JSON.stringify(body, null, 2));

    const toolCallId = body.message?.toolCalls?.[0]?.id;
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const timeToCheck = args.datetime || args.appointment_time;

    if (!timeToCheck) {
      return NextResponse.json({ error: 'datetime is required' }, { status: 400 });
    }

    const isAvailable = await checkAvailability(timeToCheck);

    if (isAvailable) {
      return vapiResponse(toolCallId, { available: true });
    } else {
      const date = new Date(timeToCheck);
      date.setDate(date.getDate() + 1);
      const tomorrowStr = date.toISOString().split('T')[0];
      return vapiResponse(toolCallId, {
        available: false,
        suggested_slots: [
          `${tomorrowStr}T10:00:00.000Z`,
          `${tomorrowStr}T13:30:00.000Z`,
          `${tomorrowStr}T16:00:00.000Z`,
        ],
      });
    }
  } catch (error: any) {
    console.error('Error in /api/check-availability:', error);
    return NextResponse.json({ error: error.message || 'Error checking availability' }, { status: 500 });
  }
}
