import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../lib/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.talent_session;
  if (!token) return res.status(401).json({ error: 'no autenticado' });
  try {
    const claims = await verificarToken(token);
    req.user = { id: claims.sub, email: claims.email };
    next();
  } catch {
    return res.status(401).json({ error: 'token inválido' });
  }
}
