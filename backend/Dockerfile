# ---- Builder Stage ----
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# ---- Production Stage ----
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app .

# Runtime configuration
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=production

# Health checks
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/healthz || exit 1

# Secure production practices
USER node
CMD ["npm", "start"]