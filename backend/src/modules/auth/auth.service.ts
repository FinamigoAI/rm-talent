import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { firmarToken } from '../../lib/jwt';

export async function login(email: string, password: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciales inválidas');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Credenciales inválidas');
  return firmarToken(user.id, user.email);
}
