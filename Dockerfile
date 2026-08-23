# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# /vibes — last.fm config baked at build time via GH Actions build-args
# (repo secrets VITE_LASTFM_USER / VITE_LASTFM_KEY). VITE_* end up in the
# client bundle by design; absent args degrade /vibes to the notice state.
ARG VITE_LASTFM_USER
ARG VITE_LASTFM_KEY
ENV VITE_LASTFM_USER=$VITE_LASTFM_USER \
    VITE_LASTFM_KEY=$VITE_LASTFM_KEY
RUN npm run build

# Serve stage — static SPA for Dokploy/Traefik
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
