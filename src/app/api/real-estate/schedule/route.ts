import { NextResponse } from 'next/server';
import { checkAvailability, createCalendarEvent } from '@/lib/calendar';
import { vapiResponse } from '@/lib/vapi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('--- Incoming Vapi Tool Call (RE Schedule) ---');
    console.log(JSON.stringify(body, null, 2));

    const toolCallId = body.message?.toolCalls?.[0]?.id;
    const args = body.message?.toolCalls?.[0]?.function?.arguments || body;
    const { name, phone, project, datetime } = args;

    if (!name || !phone || !project || !datetime) {
      return NextResponse.json(
        { error: 'name, phone, project, and datetime are required' },
        { status: 400 }
      );
    }

    const isAvailable = await checkAvailability(datetime);
    if (!isAvailable) {
      return vapiResponse(toolCallId, { success: false, error: 'Slot not available' });
    }

    await createCalendarEvent({
      name,
      phone,
      email: '',
      problem: `Project interest: ${project}`,
      appointmentTime: datetime,
      summary: `Site Visit - ${project} - ${name}`,
    });

    return vapiResponse(toolCallId, { success: true, message: 'Site visit booked successfully' });
  } catch (error: any) {
    console.error('Error in /api/real-estate/schedule:', error);
    return NextResponse.json({ error: error.message || 'Error booking site visit' }, { status: 500 });
  }
}
