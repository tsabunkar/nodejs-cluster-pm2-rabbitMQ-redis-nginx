# Steps:

TERMINAL 1:

- run the nginx server (using docker):
  - Add configuration file (jph-reverse-proxy.conf) to nginx configuration(nginx.conf) file
    - \$ cd nginx/ngnix-reverse-proxy/config
    - \$ sudo docker build -t nginx-test:1.17 . (building custom docker image <-- Just by command docker build but follow below technique)
    - \$ sudo docker-compose build --no-cache [<--- Create image only onces]
    - \$ sudo docker-compose up --force-recreate

----or-----

TERMINAL 1:

- downloading and installing nginx locally:
  - sudo apt install nginx
  - nginx -v
- Running nginx server by adding custom server config file
  - cd /etc/nginx
  - nano nginx.conf
  - ( include jph-reverse-proxy.conf;)
  - \$ ll ~/tejas/workspace/vsc/nodejs-cluster-pm2-rabbitMQ-redis-nginx/nginx/ngnix-reverse-proxy/config/jph-reverse-proxy.conf
  - \$ sudo cp ~/tejas/workspace/vsc/nodejs-cluster-pm2-rabbitMQ-redis-nginx/nginx/ngnix-reverse-proxy/config/jph-reverse-proxy.conf . [Copy file]
  - \$ ll
  - \$ nginx -t -c /etc/nginx/nginx.conf [TO check nginx config file is compiled correct]
  - \$ sudo service nginx status (or) sudo systemctl status nginx
  - IF ERROR : Nginx: Job for nginx.service failed because the control process exited
    - (This is bcoz- Apache2 server runs by default in Ubuntu, so we need to stop that and enable instead nginx)
    - \$ sudo /etc/init.d/apache2 stop
    - \$ sudo systemctl restart nginx
  - http://localhost/posts
  - http://localhost/comments (Check weather nginx is acting like reverse proxy)

REF:
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

TERMINAL 2:

- run redix server
  - docker run --name my-redis-container -d redis:6
  - sudo docker inspect container <container_id_redis>
  - [Copy + paste the ipv4 adddress of redis inside ./middlewares/keys/js file]
  - docker run -it --name my-redis-cli --link my-redis-container:redis --rm redis:6 redis-cli -h redis -p 6379

TERMINAL 3:

- cd nginx/ngnix-reverse-proxy/express-app-cluster-with-local-redis
- pm2 stop all
- pm2 start ecosystem.config.js

TERMINAL 4:

- pm2 monit

TERMINAL 5:

- Goto browser :
  - http://127.0.0.1:3000/jph/posts
  - http://127.0.0.1:3000/jph/comments
    or
  - http://localhost:3000/jph/posts
  - http://localhost:3000/jph/comments

INSTEAD of VISITING ABOVE URL- since we are using nginx as reverse proxy so

- Goto browser :
  - http://172.18.0.2/posts
  - http://172.18.0.2/comments
    or
  - http://localhost/posts
  - http://localhost/comments

---

# Nginx commands

- sudo systemctl stop nginx
- sudo systemctl start nginx
- sudo systemctl status nginx
- sudo systemctl restart nginx
- sudo systemctl reload nginx
- sudo systemctl disable nginx
- sudo systemctl enable nginx
