import { NextResponse } from 'next/server';
import { createCalendarEvent } from '@/lib/calendar';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (Schedule Appointment) ---');
    console.log(JSON.stringify(body, null, 2));

    // Extract args from Vapi structure or direct body
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;

    const { name, phone, email, problem, appointment_time } = args;

    if (!name || !phone || !email || !problem || !appointment_time) {
      return NextResponse.json(
        { error: 'Missing required scheduling fields' },
        { status: 400 }
      );
    }

    // 1. Create the calendar event
    await createCalendarEvent({
      name,
      phone,
      email,
      problem,
      appointmentTime: appointment_time,
    });

    // 2. Send the confirmation email
    await sendConfirmationEmail({
      name,
      email,
      appointmentTime: appointment_time,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Appointment successfully scheduled'
    });
  } catch (error: any) {
    console.error('Error in /api/schedule-appointment:', error);
    return NextResponse.json(
      { error: error.message || 'Error scheduling appointment' },
      { status: 500 }
    );
  }
}
