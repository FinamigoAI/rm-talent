# Dockerfile
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
RUN addgroup -S app && adduser -S app -G app
COPY --from=backend-build --chown=app:app /app/backend/dist ./dist
COPY --from=backend-build --chown=app:app /app/backend/node_modules ./node_modules
COPY --from=backend-build --chown=app:app /app/backend/prisma ./prisma
COPY --from=frontend-build --chown=app:app /app/frontend/dist ./public
ENV NODE_ENV=production
EXPOSE 8080
USER app
CMD ["node", "dist/index.js"]
