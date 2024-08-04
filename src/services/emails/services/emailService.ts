import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: email,
      to: 'info@diversevisa.com',
      subject: `Message from ${firstName} ${lastName} (${email})`,
      text: `Message:\n\n${message}`,
    });
    res.status(200).json({ success: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export const getEmail = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Radi" });
};
