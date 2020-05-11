const fabObj = require('../fibonacci-series');

// ! message event, as soon as message is recieved this child process will calculate the
// ! fibonaci-series logic and send to master process
process.on('message', (number) => {
  let fabNum = fabObj.calculateFibonacciValue(number);
  console.log(`Fibonacci-series - 1 PID is ${process.pid}`);

  // !Send the computed result of business logic back to master process
  process.send(fabNum);
});
