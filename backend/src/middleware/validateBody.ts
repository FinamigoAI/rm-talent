import { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validarBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      return res.status(422).json({ error: 'solicitud inválida' });
    }
    req.body = resultado.data;
    next();
  };
}
