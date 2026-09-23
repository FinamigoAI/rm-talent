import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { buildApp } from '../../app';
import { prisma } from '../../lib/prisma';

const email = 'demo@talent-test.mx';
const password = 'Contrasena-Demo-123';

beforeAll(async () => {
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email } });
  await prisma.$disconnect();
});

describe('POST /api/auth/login', () => {
  it('con credenciales correctas, entrega una cookie y /me responde', async () => {
    const app = buildApp();
    const loginRes = await request(app).post('/api/auth/login').send({ email, password });
    expect(loginRes.status).toBe(200);
    const cookie = loginRes.headers['set-cookie']?.[0];
    expect(cookie).toMatch(/talent_session=.+HttpOnly/);

    const meRes = await request(app).get('/api/auth/me').set('Cookie', cookie!);
    expect(meRes.status).toBe(200);
    expect(meRes.body.email).toBe(email);
  });

  it('con contraseña incorrecta, 401', async () => {
    const res = await request(buildApp()).post('/api/auth/login').send({ email, password: 'incorrecta' });
    expect(res.status).toBe(401);
  });

  it('sin cookie, /me responde 401', async () => {
    const res = await request(buildApp()).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('logout borra la cookie', async () => {
    const res = await request(buildApp()).post('/api/auth/logout');
    expect(res.status).toBe(204);
    expect(res.headers['set-cookie']?.[0]).toMatch(/talent_session=;/);
  });
});
