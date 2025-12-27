ARG NODE_VERSION=24.8.0

# ------------------- Base -------------------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/client

WORKDIR /usr/src/client

FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=npm-cache,target=/root/.npm \
    npm ci --omit=dev --ignore-scripts

FROM deps as build

WORKDIR /usr/src/client

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,id=npm-cache,target=/root/.npm \
    npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.23

COPY --from=build --chown=nginx:nginx /usr/src/client/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/ /etc/nginx/conf.d

EXPOSE 443

HEALTHCHECK CMD wget --no-check-certificate --quiet --tries=1 --spider https://127.0.0.1 || exit 1



