FROM nginx:stable-alpine3.23

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/ /etc/nginx/conf.d

HEALTHCHECK CMD wget --no-check-certificate --quit --tries=1 --spider https://127.0.0.1:4000 || exit 1
