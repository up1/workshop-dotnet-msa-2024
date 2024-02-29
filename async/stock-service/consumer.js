const amqp = require('amqplib');

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('orders');
  channel.consume('orders', message => {
    console.log(`Stock update triggered for: ${message.content.toString()}`);
    channel.ack(message);
    // Implement stock update logic
  });
  process.on('exit', () => {
    channel.close();
    console.log('Closing rabbitmq channel');
  });
}
connectRabbitMQ().catch(console.error);