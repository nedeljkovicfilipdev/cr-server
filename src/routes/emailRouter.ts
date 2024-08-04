import { Router } from 'express';
import { EmailService } from '../services/emails/services/emailService';

const emailRouter = Router();
const emailService = new EmailService();

emailRouter.post('/', (req, res) => emailService.sendEmail(req, res));
emailRouter.get('/', (req, res) => emailService.getEmail(req, res));

export { emailRouter };
