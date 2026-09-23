# rm-talent

Producto Talent standalone — Node.js 20/Express/Prisma/PostgreSQL + React/Vite/Tailwind.

Decisión explícita del usuario (2026-09-22/23): **sin SSO ni MFA por ahora** — login simple
usuario/contraseña (bcrypt + JWT HS256 con `jose`, un solo secreto compartido). La integración
con el IdP de `riskmanagementv1.0` (exchange code, D-20 del SPEC) queda para cuando se decida
conectar Talent a la suite — ver `CLAUDE.md` de `riskmanagementv1.0` sección "Conectar los 4
módulos reales".

No confundir con `github.com/vitamijdel/Talent.git` (clonado en `Documents\git\Talent`) — ese
es OTRO prototipo/mockup HTML, un diagrama de flujo/pantallas de diseño sin lógica.

**El prototipo real que sí se portó a este repo** fue un demo funcional aparte,
`rm-talent-demo` en Cloud Run (`https://rm-talent-demo-yjvrwuopua-pv.a.run.app`), construido
colaborativamente en una sesión anterior pero **sin repo propio** — un solo archivo HTML de
~2100 líneas con su propio sistema de diseño completo (colores, tipografía Space
Grotesk/Manrope/Inter, componentes) y 22 pantallas interactivas (login/hub, herramienta del
reclutador completa, flujo móvil del candidato). Ese HTML se descargó, se analizó a fondo, y se
portó **1:1** a React real — mismas clases, mismo copy, mismos datos — en vez de rehacerse desde
cero. El HTML original ya no existe en ningún lado (era solo un archivo temporal de la sesión
donde se hizo el análisis); este repo es ahora la única fuente de verdad para ese diseño.

## Hecho

- **Backend real funcionando de punta a punta**: Express+Prisma+Postgres, login/logout/me
  (cookie httpOnly, JWT HS256 7 días).
- **Frontend: el prototipo completo portado a React** (2026-09-23), no solo el login:
  - **Sistema de diseño** (`frontend/src/theme.css`) — copiado del prototipo verbatim: mismas
    variables de color, tipografía, componentes (`.btn`, `.pill`, `.card`, `.tbl`, `.kpi`,
    `.sect`/`.itm`/`.find` del expediente, `.steps`/`.cfgpane` del wizard, `.phone`/`.pview` del
    flujo móvil). Tailwind se eliminó por completo — no se usa nada de él.
  - **Herramienta del reclutador** (`/app/*`, protegida por login): bandeja de solicitudes,
    detalle de solicitud, configurador de vacante (wizard de 5 pasos), publicación con QR
    generado localmente (sin librería externa, `components/Qr.tsx`), lista de vacantes, tablero
    de candidatos, expediente del candidato (con flujo real de "resolver hallazgo con motivo" vía
    `contexts/CandidatesContext.tsx`, estado en memoria compartido entre pantallas), guía de
    entrevista, selección y cierre, base de talento/descartados, vista de líder de área.
  - **Flujo móvil del candidato** (`/candidato`, público, sin login): 10 pasos con animaciones de
    validación en vivo (RFC, identidad, documentos) y modo "play automático" — el archivo más
    grande y complejo del port (`pages/CandidateStage.tsx` + `data/candidatoStage.ts`).
  - Todo esto es **estado de cliente únicamente** (sin persistencia real en Postgres para estos
    módulos) — exactamente el mismo alcance que tenía el prototipo original. Ver "Pendientes".
- **Desplegado en GCP `pdi-labs`**, mismo patrón que `riskmanagementv1.0`:
  - Cloud SQL: reutiliza la instancia existente `riskmanagement-db` (no una nueva) — base de
    datos `rmtalent`, usuario dedicado `rmtalent_app`.
  - Secrets: `rmtalent-database-url`, `rmtalent-jwt-secret`.
  - Cloud Run: servicio `rm-talent`, región `us-central1`, `--max-instances=1`.
  - URL viva: `https://rm-talent-763701440071.us-central1.run.app`
  - Login + todas las pantallas verificadas en vivo contra la URL real (no solo local),
    incluyendo el flujo de "resolver hallazgo" y el flujo móvil del candidato.
- Lecciones de `riskmanagementv1.0` pre-aplicadas desde el día uno: `binaryTargets` de Prisma
  para Alpine/OpenSSL, `apk add openssl` en el Dockerfile, usuario no-root, manejo de respuestas
  204 en `api/client.ts`.

## Pendientes

- **Sincronizar con GitHub**: este repo no tiene remoto configurado todavía (a diferencia de
  `riskmanagementv1.0`, que ya está en `github.com/FinamigoAI/riskmanagementv1.0.git`). Falta
  decidir el remoto real y hacer el primer push.
- **Los 11 módulos de la herramienta del reclutador son UI sin backend real todavía**: se ve y
  se siente como el producto terminado, pero las solicitudes/vacantes/candidatos son datos fijos
  de demo (los mismos 5 candidatos, la misma VAC-1184) — no hay tablas Prisma para
  `Solicitud`/`Vacante`/`Candidato`/etc., ni el motor de screening real (pre-filtro → documental
  → identidad → listas) que describe el SPEC. El siguiente trabajo real de este proyecto es
  conectar cada pantalla a datos reales, empezando por decidir el modelo de datos (`Solicitud`,
  `Vacante`, `Candidato`, `Hallazgo`, `Validacion`) — el SPEC completo (`Downloads\SPEC.md` v2.2)
  describe el motor de screening como una máquina de estados de larga duración persistida en
  Postgres.
- **Sin auditoría/bitácora todavía**: a diferencia de `riskmanagementv1.0`, no hay `AuditLog` con
  hash-chain. El SPEC (RN-53) la requiere para producción real.
- **Sin multi-tenancy**: tabla `User` plana, sin `organizationId`. El SPEC (D7) exige aislamiento
  estricto por organización — no implementado todavía.

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
