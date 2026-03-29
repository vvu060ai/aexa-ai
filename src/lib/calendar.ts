import { google } from 'googleapis';

export const getGoogleCalendarClient = () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // Redirect URI set previously
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({ version: 'v3', auth: oAuth2Client });
};

export const checkAvailability = async (appointmentTime: string) => {
  const calendar = getGoogleCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  
  // Parse the time or assume it's valid format (e.g. ISO)
  let startTime;
  try {
    startTime = new Date(appointmentTime);
    if (isNaN(startTime.getTime())) {
       // if not a valid date, we throw
       throw new Error('Invalid date');
    }
  } catch(e) {
    console.error("Invalid time requested:", appointmentTime);
    return false;
  }

  // Check 30 minute slot
  const endTime = new Date(startTime.getTime() + 30 * 60000);

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        timeZone: 'UTC',
        items: [{ id: calendarId }],
      },
    });

    const busySlots = response.data.calendars?.[calendarId]?.busy || [];
    return busySlots.length === 0;
  } catch (error) {
    console.error('Error checking Google Calendar availability:', error);
    throw error;
  }
};

export const createCalendarEvent = async (details: {
  name: string;
  phone: string;
  email: string;
  problem: string;
  appointmentTime: string;
}) => {
  const calendar = getGoogleCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  const startTime = new Date(details.appointmentTime);
  const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 mins

  try {
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: {
        summary: `Dental Appointment - ${details.name}`,
        description: `Patient: ${details.name}\nPhone: ${details.phone}\nEmail: ${details.email}\nProblem: ${details.problem}`,
        start: {
          dateTime: startTime.toISOString(),
        },
        end: {
          dateTime: endTime.toISOString(),
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
};
