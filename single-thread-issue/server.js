const express = require('express');

const fabObj = require('./fibonacci-series');

const app = express();
// http://localhost:3000?number=10
app.get('/', (request, response) => {
  let number = fabObj.calculateFibonacciValue(
    Number.parseInt(request.query.number)
  );
  response.send(`<h1>${number}</h1>`);
});

app.listen(3000, () => console.log('Express App is running on PORT : 3000'));

// !Drawback of Nodejs using Single Thread
/**
 * If we request http://localhost:3000?number=145
 * and try to request http://localhost:3000?number=2
 * second will request will not be proceed until the first request is completed
 * This is bcoz nodejs uses single thread not the completed potential of our machine which is
 * multi-core, so we can run our application in cluster
 * - If we create a cluster, we can create number of process based on our requirement
 * - Each process can run in separate core
 * - All this process will share same port of our application
 * - Thus we can distribute load of our application to number of process
 * -
 */
