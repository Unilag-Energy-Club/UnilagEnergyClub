# DP-maker (Next.js) — built and run as its own Railway service
# (Railway Root Directory = uecdp).
FROM node:20-alpine

WORKDIR /app

# Build deps for sharp (native image processing) on alpine/musl.
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production

# Railway provides $PORT at runtime.
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
