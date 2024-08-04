import { Router } from 'express';
import { getEmail, sendEmail } from '../services/email/services/emailService';

const emailRouter = Router();

// Define the route for sending email
emailRouter.post('/send', sendEmail);
emailRouter.get('/getemail', getEmail);

export { emailRouter };
