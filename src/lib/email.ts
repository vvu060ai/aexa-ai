import { Resend } from 'resend';

// Make sure to handle the case where RESEND_API_KEY might not be set yet (e.g., in dev)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendConfirmationEmail = async (details: {
  name: string;
  email: string;
  appointmentTime: string;
}) => {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing. Skipping email confirmation.");
    return;
  }
  
  const formattedTime = new Date(details.appointmentTime).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Change this to your verified domain later if you have one on Resend
      to: [details.email],
      subject: 'Dental Appointment Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Appointment Confirmed</h2>
          <p>Hello <strong>${details.name}</strong>,</p>
          <p>Your dental appointment has been successfully scheduled.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Time:</strong> ${formattedTime}</p>
          </div>
          
          <p>If you need to reschedule or cancel, please contact us.</p>
          <br/>
          <p>Thank you for choosing Bright Smile Dental Clinic.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};
