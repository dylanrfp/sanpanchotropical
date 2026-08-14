import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and a message.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const helpTopic = subject?.trim() || 'General Inquiry';

    // Configure Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });

    const formattedMessage = message.replace(/\n/g, '<br/>');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #1A3636; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: #F7F4EE; font-size: 20px; margin: 0; letter-spacing: 0.05em; font-weight: 700; text-transform: uppercase;">
            San Pancho Tropical — New Inquiry
          </h1>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 15px; color: #4b5563; margin: 0 0 16px 0;">You have received a new contact inquiry from the website:</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #9ca3af; width: 140px; font-weight: 600;">Full Name:</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #9ca3af; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0; color: #111827;">
                <a href="mailto:${email}" style="color: #2D6A6A; text-decoration: none; font-weight: 500;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #9ca3af; font-weight: 600;">Topic / Request:</td>
              <td style="padding: 10px 0; color: #111827;">${helpTopic}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f9fafb; border-left: 4px solid #2D6A6A; padding: 16px; border-radius: 6px; margin: 24px 0;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 700; margin: 0 0 8px 0;">Message / Specifications:</p>
          <div style="font-size: 15px; line-height: 1.6; color: #1f2937;">
            ${formattedMessage}
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px; text-align: center;">
          <p style="font-size: 13px; color: #9ca3af; margin: 0;">
            You can directly reply to this email to respond to <strong>${name}</strong> (${email}).
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"San Pancho Tropical Inquiry" <${process.env.SMTP_USER || 'noreply@mexicosta.com'}>`,
      to: 'vicky@mexicosta.com',
      replyTo: `${name} <${email}>`,
      subject: `New Inquiry from ${name}: ${helpTopic}`,
      text: `New Website Inquiry\n\nName: ${name}\nEmail: ${email}\nTopic: ${helpTopic}\n\nMessage:\n${message}\n`,
      html: htmlContent,
    };

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[Contact API] SMTP_USER or SMTP_PASS is missing in environment variables');
      return NextResponse.json(
        { 
          error: 'Email service is not configured yet (missing SMTP credentials on Vercel). Please reach out directly via WhatsApp or configure SMTP_USER/SMTP_PASS in Vercel settings.' 
        },
        { status: 500 }
      );
    }

    await transporter.sendMail(mailOptions);
    console.log(`[Contact API] Inquiry from ${email} delivered to vicky@mexicosta.com`);

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been sent successfully! Vicky will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact inquiry submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your inquiry. Please try again or reach out directly on WhatsApp.' },
      { status: 500 }
    );
  }
}
