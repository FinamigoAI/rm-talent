import { Request, Response } from 'express';
import { login } from './auth.service';
import { env } from '../../config/env';

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const jwt = await login(email, password);
    res.cookie('talent_session', jwt, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('login failed', err);
    res.status(401).json({ error: 'credenciales inválidas' });
  }
}

export async function logoutHandler(_req: Request, res: Response) {
  res.clearCookie('talent_session', { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: 'lax' });
  res.status(204).send();
}

export async function meHandler(req: Request, res: Response) {
  res.json({ id: req.user!.id, email: req.user!.email });
}
