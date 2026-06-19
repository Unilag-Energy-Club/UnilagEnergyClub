# DP-maker (Next.js) — built and run as its own Railway service
# (Railway Root Directory = uecdp).
FROM node:20-alpine

WORKDIR /app

# Build deps for sharp (native image processing) on alpine/musl, plus
# fontconfig + a real font so librsvg can render the SVG name overlay
# (without these, SVG <text> renders blank on alpine).
RUN apk add --no-cache libc6-compat fontconfig ttf-dejavu && fc-cache -f

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production

# Railway provides $PORT at runtime.
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
