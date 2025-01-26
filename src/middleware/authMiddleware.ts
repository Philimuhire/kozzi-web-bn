import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; 
  console.log("Token received:", token);

  if (!token) {
    res.status(401).json({ message: 'No token provided' }); 
    return; 
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
