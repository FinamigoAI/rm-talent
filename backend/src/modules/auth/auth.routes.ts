import { Router } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler';
import { validarBody } from '../../middleware/validateBody';
import { authMiddleware } from '../../middleware/auth.middleware';
import { rateLimitLogin } from '../../middleware/rateLimit.middleware';
import { loginSchema } from './auth.schemas';
import { loginHandler, logoutHandler, meHandler } from './auth.controller';

export const authRouter = Router();
authRouter.post('/login', rateLimitLogin, validarBody(loginSchema), asyncHandler(loginHandler));
authRouter.post('/logout', asyncHandler(logoutHandler));
authRouter.get('/me', authMiddleware, asyncHandler(meHandler));
