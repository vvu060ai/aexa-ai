import { google } from 'googleapis';

const getCalendar = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString()
    ),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return google.calendar({ version: 'v3', auth });
};

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

export const checkAvailability = async (appointmentTime: string) => {
  const calendar = getCalendar();

  let startTime: Date;
  try {
    startTime = new Date(appointmentTime);
    if (isNaN(startTime.getTime())) throw new Error('Invalid date');
  } catch {
    console.error('Invalid time requested:', appointmentTime);
    return false;
  }

  const endTime = new Date(startTime.getTime() + 30 * 60000);

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: 'UTC',
        items: [{ id: CALENDAR_ID }],
      },
    });
    const busySlots = response.data.calendars?.[CALENDAR_ID]?.busy || [];
    return busySlots.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

export const createCalendarEvent = async (details: {
  name: string;
  phone: string;
  email: string;
  problem: string;
  appointmentTime: string;
  summary?: string;
}) => {
  const calendar = getCalendar();
  const startTime = new Date(details.appointmentTime);
  const endTime = new Date(startTime.getTime() + 30 * 60000);

  try {
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: details.summary ?? `Dental Appointment - ${details.name}`,
        description: `Patient: ${details.name}\nPhone: ${details.phone}\nEmail: ${details.email}\nProblem: ${details.problem}`,
        start: { dateTime: startTime.toISOString() },
        end: { dateTime: endTime.toISOString() },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

const findEventNearTime = async (appointmentTime: string) => {
  const calendar = getCalendar();
  const target = new Date(appointmentTime);
  const timeMin = new Date(target.getTime() - 5 * 60000);
  const timeMax = new Date(target.getTime() + 5 * 60000);

  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items || [];
  if (events.length === 0) throw new Error('No event found near that time');
  return events[0];
};

export const rescheduleCalendarEvent = async (
  currentTime: string,
  newTime: string
) => {
  const calendar = getCalendar();
  const event = await findEventNearTime(currentTime);
  if (!event.id) throw new Error('Event has no ID');

  const newStart = new Date(newTime);
  const newEnd = new Date(newStart.getTime() + 30 * 60000);

  const response = await calendar.events.update({
    calendarId: CALENDAR_ID,
    eventId: event.id,
    requestBody: {
      ...event,
      start: { dateTime: newStart.toISOString() },
      end: { dateTime: newEnd.toISOString() },
    },
  });
  return response.data;
};

export const cancelCalendarEvent = async (appointmentTime: string) => {
  const calendar = getCalendar();
  const event = await findEventNearTime(appointmentTime);
  if (!event.id) throw new Error('Event has no ID');

  await calendar.events.delete({
    calendarId: CALENDAR_ID,
    eventId: event.id,
  });
};
