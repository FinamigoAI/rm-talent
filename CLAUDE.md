# rm-talent

Producto Talent standalone — Node.js 20/Express/Prisma/PostgreSQL + React/Vite/Tailwind.

Decisión explícita del usuario (2026-09-22/23): **sin SSO ni MFA por ahora** — login simple
usuario/contraseña (bcrypt + JWT HS256 con `jose`, un solo secreto compartido). La integración
con el IdP de `riskmanagementv1.0` (exchange code, D-20 del SPEC) queda para cuando se decida
conectar Talent a la suite — ver `CLAUDE.md` de `riskmanagementv1.0` sección "Conectar los 4
módulos reales".

No confundir con `github.com/vitamijdel/Talent.git` (clonado en `Documents\git\Talent`) — ese
repo es solo un prototipo/mockup HTML interactivo, no tiene backend real. Este repo (`rm-talent`)
es el build real.

## Hecho

- **Esqueleto mínimo funcionando de punta a punta**: backend Express+Prisma+Postgres con
  login/logout/me (cookie httpOnly, JWT HS256 7 días), frontend React con página de login y un
  dashboard que lista los 10 módulos v1 del SPEC (M1-M11, todos "Próximamente" por ahora).
- **Desplegado en GCP `pdi-labs`** (2026-09-23), mismo patrón que `riskmanagementv1.0`:
  - Cloud SQL: reutiliza la instancia existente `riskmanagement-db` (no una nueva) — base de
    datos `rmtalent`, usuario dedicado `rmtalent_app`.
  - Secrets: `rmtalent-database-url`, `rmtalent-jwt-secret`.
  - Cloud Run: servicio `rm-talent`, región `us-central1`, `--max-instances=1`.
  - URL viva: `https://rm-talent-763701440071.us-central1.run.app`
  - Login/`/me` verificados en vivo contra la URL real (no solo local).
- Lecciones de `riskmanagementv1.0` pre-aplicadas desde el día uno (para no repetir bugs ya
  conocidos): `binaryTargets` de Prisma para Alpine/OpenSSL, `apk add openssl` en el Dockerfile,
  usuario no-root, manejo de respuestas 204 en `api/client.ts`, `index.css` con
  `@import "tailwindcss";` creado e importado desde el inicio.

## Pendientes

- **Sincronizar con GitHub**: este repo no tiene remoto configurado todavía (a diferencia de
  `riskmanagementv1.0`, que ya está en `github.com/FinamigoAI/riskmanagementv1.0.git`). Falta
  decidir el remoto real y hacer el primer push.
- **Módulos M1-M11**: hoy son solo tarjetas "Próximamente" en el dashboard — ningún módulo real
  (Catálogo, Requisición, Vacante, Postulación, Screening, Expediente, Decisión, Bitácora,
  Notificaciones, Proveedores) está construido. El SPEC completo (`docs/SPEC.md` si se copia
  aquí, o ver `Downloads\SPEC.md` v2.2) describe el motor de screening como una máquina de
  estados de larga duración persistida en Postgres — arquitectura no trivial, sin construir.
- **Sin auditoría/bitácora todavía**: a diferencia de `riskmanagementv1.0`, este esqueleto no
  tiene `AuditLog` con hash-chain. El SPEC (RN-53) la requiere para producción real.
- **Sin multi-tenancy**: tabla `User` plana, sin `organizationId`. El SPEC (D7) exige aislamiento
  estricto por organización — no implementado en este esqueleto mínimo.

## Nota operativa importante — Prisma + Cloud SQL + `gcloud sql users set-password`

**Encontrado 2026-09-23, costó ~40 min de diagnóstico:** el usuario `rmtalent_app` fue creado y
su password seteado vía `gcloud sql users create --password=...` / `gcloud sql users
set-password`. Con esas credenciales, una conexión Postgres normal (`pg`, driver de Node)
autenticaba sin problema — pero el motor de Prisma (Rust, `@prisma/client`) fallaba siempre con
`P1000: Authentication failed`, tanto por el proxy TCP local como por el socket Unix real en
producción (mismo error en los logs de Cloud Run).

**Causa:** `gcloud sql users set-password`/`create` (vía la API de administración de Cloud SQL)
no siempre genera el hash de password de la forma que el motor de Prisma sabe negociar. La
solución fue resetear el password con SQL directo (`ALTER USER rmtalent_app WITH PASSWORD
'...'`, ejecutado como el propio usuario contra sí mismo, o como cualquier rol con privilegio),
que sí usa el `password_encryption` real del servidor (scram-sha-256 en Postgres 16) de forma
compatible con Prisma.

**Regla para el futuro:** si un usuario de Cloud SQL se va a usar con Prisma, después de
crearlo/resetear su password con `gcloud sql users`, verificar con una conexión de prueba usando
Prisma directamente (`npx prisma db execute --url "..." --stdin <<< "select 1;"`) — no basta con
probar con `psql`/`pg`, porque ese motor SÍ tolera el hash que Prisma rechaza. Si falla, correr
`ALTER USER <user> WITH PASSWORD '<pass>'` por SQL directo como fix.
