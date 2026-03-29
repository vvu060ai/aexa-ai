import { NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/calendar';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (Check Availability) ---');
    console.log(JSON.stringify(body, null, 2));

    const { appointment_time } = body.message?.toolCalls?.[0]?.function?.arguments || body;
    
    // Fallback if the body structure is straight JSON vs Vapi's specific payload format
    const timeToCheck = typeof appointment_time === 'string' 
      ? appointment_time 
      : body.appointment_time;

    if (!timeToCheck) {
      return NextResponse.json(
        { error: 'appointment_time is required' },
        { status: 400 }
      );
    }

    const isAvailable = await checkAvailability(timeToCheck);

    if (isAvailable) {
      return NextResponse.json({
        available: true,
      });
    } else {
      // Logic for suggesting alternatives could be implemented here
      // For now we'll suggest 3 generic times for the next day
      const date = new Date(timeToCheck);
      date.setDate(date.getDate() + 1); // Tomorrow
      
      const tomorrowStr = date.toISOString().split('T')[0];
      return NextResponse.json({
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
    return NextResponse.json(
      { error: error.message || 'Error checking availability' },
      { status: 500 }
    );
  }
}
