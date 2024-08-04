import { Router } from 'express';
import { getEmail, sendEmail } from '../services/emails/services/emailService';

const emailRouter = Router();

// Define the route for sending email
emailRouter.get('/', getEmail);
emailRouter.post('/', sendEmail);

export { emailRouter };
