# Build React frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


# Build backend and serve frontend
FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY backend/ ./

COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]