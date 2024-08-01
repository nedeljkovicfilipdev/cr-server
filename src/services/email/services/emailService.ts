import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secure: true, // Use TLS
  tls: {
    rejectUnauthorized: false,
  },
});

// Define the sendEmail function
export const sendEmail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: email, // Example email address
      to: 'nedeljkovicf.career@gmail.com', // Replace with the recipient's email address
      subject: `Message from ${firstName} ${lastName}`,
      text: `Message from ${firstName} ${lastName} (${email}):\n\n${message}`,
    });
    res.status(200).json({ success: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
