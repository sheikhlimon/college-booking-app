import { Request, Response, NextFunction } from 'express';
import admin, { isFirebaseInitialized } from '../config/firebase';

// Used by controllers to access the authenticated user's identity
export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!isFirebaseInitialized()) {
    res.status(503).json({ message: 'Authentication not configured on server' });
    return;
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
