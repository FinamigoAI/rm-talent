import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { env } from './config/env';
import { authRouter } from './modules/auth/auth.routes';

export function buildApp() {
  const app = express();
  app.set('trust proxy', true);
  app.use(helmet());
  app.use(cookieParser());
  app.use('/api', cors({ origin: env.ALLOWED_ORIGINS, credentials: true }), express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRouter);

  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(publicDir, 'index.html')));

  app.use(errorHandler);
  return app;
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  res.status(500).json({ error: 'error interno' });
}
