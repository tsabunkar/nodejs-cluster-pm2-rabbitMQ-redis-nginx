const rq = require('amqplib/callback_api');

const fabObj = require('../fibonacci-series');

// !Creating Producer
function sendValueInFabQueue1(num) {
  // !default url to connect with rabbitMQ
  rq.connect('amqp://localhost', (err, connection) => {
    if (err) process.exit();

    const queueName = 'FabSeries1';

    // ! when connection is sucessful then create a channel
    connection.createChannel((error, channel) => {
      if (error) {
        console.log(error);
        process.exit();
      } else {
        let fabNum = fabObj.calculateFibonacciValue(num);

        // !asserting existance of queue, if durable is true -> queues are persisted to the
        // !disk & it will survive broker restart (queues which are not durable --> Transient
        // !queues)
        channel.assertQueue(queueName, { durable: false });
        // !sending message to the queue
        channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));
        console.log(`Queue Name is - ${queueName}`);
      }
    });
  });
}

module.exports = sendValueInFabQueue1;
