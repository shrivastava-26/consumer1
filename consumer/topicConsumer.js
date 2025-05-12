const amqp = require("amqplib");
require('dotenv').config();

let topicConsume = async (binding_key = "user.*") => {
  try {
    const connection = await amqp.connect(process.env.R_PORT);
    const channel = await connection.createChannel();
    const exchange = "topic_exchange";

    await channel.assertExchange(exchange, "topic", { durable: true });
    await channel.assertQueue("topic_queue", { durable: true });
    await channel.bindQueue("topic_queue", exchange, binding_key);
    channel.consume("topic_queue", (msg) => {
      if (msg) {
        console.log(JSON.parse(msg.content));
        channel.ack(msg);

      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = topicConsume