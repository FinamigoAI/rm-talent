import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL requerida'),
  ALLOWED_ORIGINS: z.string().min(1, 'ALLOWED_ORIGINS requerida'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET requiere al menos 32 caracteres'),
});

export function loadEnv(raw: NodeJS.ProcessEnv) {
  const parsed = schema.parse(raw);
  return {
    ...parsed,
    ALLOWED_ORIGINS: parsed.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean),
  };
}

export const env = loadEnv(process.env);
