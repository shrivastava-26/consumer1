const amqp = require("amqplib");
require("dotenv").config;

const fanoutConSume = async () => {
  try {
    const exchange = "fanout_exchange";
    const connction = await amqp.connect(process.env.R_PORT);
    const channel = await connction.createChannel();
    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue("corn_queue", { durable: true });
    await channel.bindQueue("corn_queue", exchange, "");

    await channel.consume("corn_queue", (msg) => {
      if (msg) {
        console.log(JSON.parse(msg.content));
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = fanoutConSume;
