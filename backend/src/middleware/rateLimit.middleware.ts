import rateLimit from 'express-rate-limit';

export const rateLimitLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'demasiados intentos, intenta más tarde' },
  skip: () => process.env.NODE_ENV === 'test',
});
