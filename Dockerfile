# ---- Build the Vite SPA ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes these in at build time. Railway passes matching service
# variables as build args when declared here.
ARG VITE_CONTENTFUL_SPACE_ID
ARG VITE_CONTENTFUL_ACCESS_TOKEN
ARG VITE_POCKETBASE_URL
ARG VITE_ADMIN_PASSWORD
ENV VITE_CONTENTFUL_SPACE_ID=$VITE_CONTENTFUL_SPACE_ID \
    VITE_CONTENTFUL_ACCESS_TOKEN=$VITE_CONTENTFUL_ACCESS_TOKEN \
    VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL \
    VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD

RUN npm run build

# ---- Serve + reverse proxy ----
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
