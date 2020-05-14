# Steps to run

TERMINAL 1:

- Before running the application, run the redis server
  - docker run --name my-redis-container -d redis:6
  - sudo docker inspect container <container_id_redis>
  - [Copy + paste the ipv4 adddress of redis inside ./middlewares/keys/js file]
  - docker run -it --name my-redis-cli --link my-redis-container:redis --rm redis:6 redis-cli -h redis -p 6379

TERMINAL 2:

- cd redis/redis-express-pm2/ (come inside where you have ecosystem.config,js file)
- pm2 stop all
- pm2 start ecosystem.config.js

TERMINAL 3:

- pm2 monit

NORMAL TEST:

- Goto browser :
  - http://127.0.0.1:3000/jph/posts
  - http://127.0.0.1:3000/jph/comments
    or
  - http://localhost:3000/jph/posts
  - http://localhost:3000/jph/comments

TERMINAL 4: (LOAD TEST)

- loadtest -n 10000 -c 200 --rps 200 https://localhost:3000/jph/posts

---

REF:
https://www.ionos.com/community/hosting/redis/using-redis-in-docker-containers/
https://www.tutorialspoint.com/redis/redis_environment.htm
