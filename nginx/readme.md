# proj stru

- nginx-reverse-proxy :
  - (Nginx acting as reverse proxy for express server- that is cached by redis and running in PM2)
- nginx-load-balancer_reverse-proxy:
  - (Nginx acting as both reverse proxy and LOAD BALANCER for express server- that is cached by redis and running in PM2)
  - Files changed :
    - ecosystem.config.js (Using argument properties, 2 different PORTS - 3000, 3001)
    - jph-routes.js (process.argv[0])
    - Need to add new configuration file in nginx folder
      - express-jph-api.conf (add this config file, instead of jph-reverse-proxy.conf)

---

## Understanding --> express-jph-api.conf

- nginx uses upstream to define cluster of web servers
- cluster name is : expressapi
- In this cluster we are declaring two servers
  - localhost:3000 (This server will listen on all request on PORT-3000)
  - localhost:3001 (This server will listen on all request on PORT-3001)
- When nginx listen on PORT:80, it will distribute the request between this two abover servers
