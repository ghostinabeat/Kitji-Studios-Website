import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable must be set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  budget?: string | null;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
      
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>This project inquiry was sent from the Kitji Studios website "Start Your Project" form.</small></p>
    `;

    await resend.emails.send({
      from: 'website@kitjistudios.com',
      to: 'sales@kitjistudios.com',
      subject: `New Project Inquiry: ${data.projectType} - ${data.name}`,
      html: emailContent,
      replyTo: data.email,
    });

    return true;
  } catch (error) {
    console.error('Resend email error:', error);
    return false;
  }
}