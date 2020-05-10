const express = require('express');
// ! inbuilt nodejs cluster module -> Take full advantage of multi-core machine
const cluster = require('cluster');
// ! inbuilte os module
const totalCPUs = require('os').cpus().length;

const fabObj = require('./fibonacci-series');

// !if process is master process
if (cluster.isMaster) {
  console.log(`Total Number of CPU Counts is ${totalCPUs}`);

  // !forking child process using cluster node modules
  for (var i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // !online event -> When a new worker/child process is forked by master then it should
  // !response with online event
  cluster.on('online', (worker) => {
    console.log(
      `Worker Id is ${worker.id} and worker's PID is ${worker.process.pid}`
    );
  });

  // !this event is emitted if any worker dies
  cluster.on('exit', (worker) => {
    console.log(
      `Worker Id ${worker.id} and PID is ${worker.process.pid} is offline`
    );
    console.log("Let's fork new worker!");
    // ! once worker is dead, lets fork new child process/worker
    cluster.fork();
  });
} else {
  // !Creating express app
  const app = express();

  app.get('/', (request, response) => {
    console.log(
      `Worker Process Id - ${cluster.worker.process.pid} has accepted the request!`
    );
    let number = fabObj.calculateFibonacciValue(
      Number.parseInt(request.query.number)
    );
    response.send(`<h1>${number}</h1>`);
  });

  app.listen(3000, () => console.log('Express App is running on PORT : 3000'));
}
