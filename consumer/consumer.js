const amqp = require("amqplib");
require("dotenv").config();

const recMail = async () => {
  try {
    console.log("hii consumer");
    const connection = await amqp.connect(process.env.R_PORT);
    const channel = await connection.createChannel();

    await channel.assertExchange("mail_exchange", "direct", { durable: false });

    await channel.consume("mail_queue", (msg) => {
      if (msg) {
        console.log(JSON.parse(msg.content));
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = recMail;