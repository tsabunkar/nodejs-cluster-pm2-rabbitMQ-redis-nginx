# Steps to run

- Before running the application, run the redis server
  - docker run --name my-redis-container -d redis:6
  - docker run -it --name my-redis-cli --link my-redis-container:redis --rm redis:6 redis-cli -h redis -p 6379
  - redis:6379> PING

TERMINAL 1:

- cd redis-pub-sub/
- pm2 start ecosystem.config.js

TERMINAL 2:

- pm2 monit

TERMINAL 3:

- loadtest -n 10000 -c 100 --rps 100 https://localhost:3000?number=23

---

REF:
https://www.ionos.com/community/hosting/redis/using-redis-in-docker-containers/
https://www.tutorialspoint.com/redis/redis_environment.htm
