import { SignJWT, jwtVerify } from 'jose';
import { env } from '../config/env';

const secreto = new TextEncoder().encode(env.JWT_SECRET);

// v1 mínima a propósito: HS256 con un secreto compartido, sin JWKS ni
// rotación de llaves — suficiente para un login propio simple. El SPEC
// (docs/SPEC.md §8.5) describe el modelo completo cuando se conecte MFA/SSO.
export async function firmarToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secreto);
}

export async function verificarToken(token: string): Promise<{ sub: string; email: string }> {
  const { payload } = await jwtVerify(token, secreto);
  return { sub: payload.sub as string, email: payload.email as string };
}
