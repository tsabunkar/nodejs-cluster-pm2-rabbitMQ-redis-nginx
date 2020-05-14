# Steps:

TERMINAL 1:

- run the nginx server :
  - Add configuration file (jph-reverse-proxy.conf) to nginx configuration(nginx.conf) file
    - \$ cd nginx/ngnix-reverse-proxy/config
    - \$ sudo docker build -t nginx-test:1.17 . (building custom docker image <-- Just by command docker build but follow below technique)
    - \$ sudo docker-compose build --no-cache [<--- Create image only onces]
    - \$ sudo docker-compose up --force-recreate

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
