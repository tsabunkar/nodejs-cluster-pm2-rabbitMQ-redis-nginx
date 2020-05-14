const redis = require('redis');

const keys = require('../keys');
const fibonacciSeriesObj = require('../fibonacci-series');

let subscriber = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
});

// !using redis method subscriber
subscriber.subscribe('math-subscription1');

// ! listen to particular channel
subscriber.on('message', (channel, message) => {
  let seriesValue = fibonacciSeriesObj.calculateFibonacciValue(
    Number.parseInt(message)
  );
  console.log(`Fibonacci series value is ${seriesValue}`);
});
