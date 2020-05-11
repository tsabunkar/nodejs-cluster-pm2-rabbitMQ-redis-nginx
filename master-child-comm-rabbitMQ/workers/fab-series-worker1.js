const rq = require('amqplib/callback_api');

// ! Create Consumer
rq.connect('amqp://localhost', (err, connection) => {
  if (err) {
    process.exit();
  } else {
    const queueName = 'FabSeries1';
    connection.createChannel((err, channel) => {
      channel.assertQueue(queueName, { durable: false });

      // ! Consumer will read message from the queue
      channel.consume(
        queueName,
        (message) => {
          console.log(`Waiting for messages`);
          console.log(`${queueName} - ${message.content.toString()}`);
        },
        { noAck: true }
      );
    });
  }
});
