const amqplib = require('amqplib');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let rabbitConnection;
/* An exchange is where the rabbitMq computation takes place. 
According to the messaging strategy defined by the exchange type, messages are sent to an exchange that distributes them to consumers. */
const exchange = 'logs'
const sendRabbitMqMessage = async (message) => {
  if (!rabbitConnection) {
    rabbitConnection = await amqplib.connect('amqp://localhost');
  }

  const channel = await rabbitConnection.createChannel();
  /* Type "fanout" means sending the message to all consumers that subscribed to that exchange. */
  await channel.assertExchange(exchange, 'fanout')
  /* Notice that we pass an empty string as the queue name. This means the queue will be defined per consumer. */
  await channel.publish(exchange, '', Buffer.from(message))
}

// Create metric
const opentelemetry = require('@opentelemetry/api');
const meter = opentelemetry.metrics.getMeter('example-meter');
const messageCount = meter.createCounter("send_message_count", {
  description: "Counts total number of messages sent"
});

app.get('/', async (req, res) => {
  // Create metric
  const attributes = { messaegeType: 'Hello message' };
  messageCount.add(1, attributes);
  
  const message = 'Hello World!'
  console.log(`Send message: '${message}'`);
  await sendRabbitMqMessage(message);

  res.send(message)
})
app.listen(port, () => {
  console.log(`${process.env.SERVICE} Running`)
})