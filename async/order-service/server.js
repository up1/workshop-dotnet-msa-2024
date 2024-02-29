const express = require('express');
const amqp = require('amqplib');
const app = express();
const port = 3001;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const result = await channel.assertQueue('orders');
  return { connection, channel };
}
app.get('/purchase/:productId', async (req, res) => {
  const { productId } = req.params;
  const { connection, channel } = await connectRabbitMQ();
  channel.sendToQueue('orders', Buffer.from(`Product ${productId} purchased`));
  res.send(`Purchase made for product ${productId}, stock update initiated`);
  setTimeout(() => {
    connection.close();
  }, 500);
});
app.listen(port, () => {
  console.log(`Order service running at http://localhost:${port}`);
});