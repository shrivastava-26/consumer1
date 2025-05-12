const amqp = require('amqplib');
const { message } = require('../../HapiApp/schemas/userSchema');
require('dotenv').config()

const headerConsumer = async () => {

    const connection = await amqp.connect(process.env.R_PORT);
    const channel = await connection.createChannel()
    const exchange = 'header_exchange';
    await channel.assertExchange(exchange,'headers', {durable:true})
    await channel.assertQueue('header_queue', {durable:true})
    await channel.bindQueue('header_queue', exchange,"", {
         "x-match": "all", 
       type: "user.created",
        region: "india"
    })

    channel.consume('header_queue', (msg)=> {
        if(msg){
            console.log(JSON.parse(msg.content))
            channel.ack(msg)
        }
    })
}


module.exports = headerConsumer;