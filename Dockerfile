# Base image as ARG
ARG NODE_VERSION=24.14.0-alpine
FROM node:${NODE_VERSION} AS base
RUN apk update && apk add --no-cache libc6-compat
RUN npm i -g pnpm

# Set work directory
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package*.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

# Stage 2: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Stage 3: Production
FROM base AS production

# Set environment
ENV NODE_ENV=production
ENV PORT=3500

# Workdir & app files
WORKDIR /app
COPY --from=builder /app/package*.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

# Install production-only dependencies
RUN pnpm install --prod --frozen-lockfile && \
    addgroup -S glowvitra && adduser -S gv_user -G glowvitra && \
    chown -R gv_user:glowvitra /app

USER gv_user

# Expose port
EXPOSE ${PORT}

CMD ["pnpm", "run", "start:prod"]