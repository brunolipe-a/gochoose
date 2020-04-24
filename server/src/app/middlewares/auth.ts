import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { User } from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided." })
  }

  const [, token] = authHeader.split(' ');

  try {
    // @ts-ignore
    const { id } = await promisify(jwt.verify)(token, process.env.APP_SECRET || "gochoose");

    req.user = await User.findOneOrFail(id);

    next();
  } catch (e) {
    return res.status(401).json({ error: "Token invalid" })
  }
}
