const express = require('express');
const redis = require('redis');

const keys = require('./middlewares/keys');

const redisMiddleware = require('./middlewares/redis-middleware');

// !requiring the 3rd party apis
const usersApi = require('./jsonplaceholder/jph-users-api');
const postsApi = require('./jsonplaceholder/jph-posts-api');
const commentsApi = require('./jsonplaceholder/jph-comments-api');

const routes = express.Router();

// !adding the redis middleware
routes.use(redisMiddleware);

// !connecting with redis server
let client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

routes.get('/posts', (request, response) => {
  postsApi
    .fetchPosts()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );
        // !setting the data into redis
        client.set('posts', JSON.stringify(data));
        // !sending response to caller
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});
routes.get('/comments', (request, response) => {
  commentsApi
    .fetchComments()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );
        client.setex('comments', 300, JSON.stringify(data));
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});
routes.get('/users', (request, response) => {
  usersApi
    .fetchUsers()
    .then(
      (response) => response.json(),
      (reason) => Promise.reject(reason)
    )
    .then(
      (data) => {
        console.log(
          `Data Fetched from Server with process ID - ${process.pid}`
        );
        client.set('users', JSON.stringify(data));
        response.send(data);
      },
      (reason) => response.status(500).send('Something went wrong!')
    );
});
module.exports = routes;
