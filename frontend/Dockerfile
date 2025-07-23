# ---- Build Stage ----
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default files and copy build
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security headers and optimizations
RUN echo "server_tokens off;" >> /etc/nginx/nginx.conf

EXPOSE 80