const express = require('express');
// !nodejs cluster module
const cluster = require('cluster');
// ! total number of logical cpu cores
const totalCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master Process Id is - ${process.pid}`);

  // !using child_process module we are forking two child process
  const worker1 = require('child_process').fork(
    './master-child-communication/workers/fab-series-worker1'
  );
  const worker2 = require('child_process').fork(
    './master-child-communication/workers/fab-series-worker2'
  );

  console.log(`Child Process ID is ${worker1.pid}`);
  console.log(`Child Process ID is ${worker2.pid}`);

  // !When child process send message to parent/master process, thus master process
  // !is listening to message event
  worker1.on('message', function (number) {
    // Receive results from child process - 1
    console.log(`Fab Number from Child Process - 1 is ${number}`);
  });
  worker2.on('message', function (number) {
    // Receive results from child process - 2
    console.log(`Fab Number from Child Process - 2 is ${number}`);
  });

  // ! cluster will listen to online event
  cluster.on('online', (worker) => {
    // !prinitng worker process id who send the event
    console.log(`Message received from - ${worker.process.pid}`);
    // !master will listen to message event
    worker.on('message', (num) => {
      if (num % 2 === 0) {
        worker1.send(num);
      } else {
        worker2.send(num);
      }
    });
  });

  // ! looping to fork/create child/worker processes
  // ! (totalCPUs-2) bcoz- already 2 are already utilized by child_process module
  for (let i = 0; i < totalCPUs - 2; i++) {
    let worker = cluster.fork();
    console.log(`Worker started on PID - ${worker.process.pid}`);
  }
  console.log(`Total Number of CPU Count is ${totalCPUs}`);
} else {
  const app = express();
  //http://localhost:3000?number=20
  app.get('/', (request, response) => {
    // !Request is recieved, send to master process
    process.send(request.query.number);
    console.log(`Process Id ${process.pid} received the request!`);
    response.send(
      '<h3>The request has been received successfully! We will send an email once your calculation is ready!</h3>'
    );
    response.end();
  });

  app.listen(3000, () => console.log('Express App is running on PORT : 3000'));
}
