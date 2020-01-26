FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /usr/share/nginx/html