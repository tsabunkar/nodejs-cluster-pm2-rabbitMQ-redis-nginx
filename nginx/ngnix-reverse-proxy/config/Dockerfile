FROM nginx:1.17

RUN mkdir -p /etc/nginx
# RUN touch /etc/nginx/nginx.conf

COPY ./jph-reverse-proxy.conf /etc/nginx/
COPY ./nginx.conf /etc/nginx/

RUN cat /etc/nginx/nginx.conf