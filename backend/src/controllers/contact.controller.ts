import { Resend } from 'resend';
import { Request , Response } from 'express';

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactForm = async (req:Request, res:Response) => {
  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.TO_EMAIL!,
      subject: `Contact Form Submission from ${name}`,
      html: emailBody,
    });

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
