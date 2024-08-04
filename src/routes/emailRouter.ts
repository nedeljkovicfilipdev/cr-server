import { Router } from 'express';
import { EmailService } from '../services/emails/services/emailService';

const emailRouter = Router();
const emailService = new EmailService();

emailRouter.post('/', (req, res) => emailService.sendEmail(req, res));

export { emailRouter };
