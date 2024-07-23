// middleware/checkBlacklist.ts
import { Request, Response, NextFunction } from 'express';
import { TokenBlacklist } from '../models/TokenBlacklistDocument'; // Model for storing blacklisted tokens

export const checkBlacklist = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const blacklistedToken = await TokenBlacklist.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }

  next();
};
