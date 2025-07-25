# Builder stage (Node.js)
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage (Nginx)
FROM nginx:alpine
# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/
# Health check
RUN echo "OK" > /usr/share/nginx/html/healthz
# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]