import { Router } from 'express';
import { sendEmail } from '../services/email/services/emailService';

const emailRouter = Router();

// Define the route for sending email
emailRouter.post('/send', sendEmail);

export { emailRouter };
