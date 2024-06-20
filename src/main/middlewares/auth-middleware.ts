import { type NextFunction, type Request, type Response } from 'express';
import { makeAuthUseCase } from '../factories/usecases/auth-factory';
import { UnauthorizedError } from '@alissondavisalmeida/jobber-shared';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req?.session?.jwt) {
    return res.status(401).send({ error: 'Not authorized' });
  }

  try {
    const auth = makeAuthUseCase();
    const payload = await auth.authenticate({ token: req.session.jwt });
    req.currentUser = payload;
  } catch (err) {
    throw new UnauthorizedError('Invalid token', 'UnauthorizedError');
  }

  next();
};

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    return res.status(401).send({ error: 'Not authorized' });
  }

  next();
};
