FROM nginx:stable-alpine
COPY default.nginx /etc/nginx/conf.d/default.conf
COPY sparkfi.crt /certs/sparkfi.crt
COPY sparkfi.key /certs/sparkfi.key
EXPOSE 80/tcp
EXPOSE 443/tcp
ENTRYPOINT ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
