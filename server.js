
const hapi = require('@hapi/hapi')
const recMail = require('./consumer/consumer')
const fanoutConSume = require('./consumer/fanoutConsumer')
const topicConsume = require('./consumer/topicConsumer')
const headerConsumer = require('./consumer/headerConsumer')

const server = hapi.server({
    host:'localhost',
    port:5201
})

server.route({
    method:'GET',
    path:'/',
    handler: (req,h) => {
        return h.response({success:true, message: 'first route of consumer testing'})
    }
})

const startServer = async() => {

    await server.start();
    await recMail();
    await topicConsume();
    await fanoutConSume();
    await headerConsumer();
    console.log('server started at ', server.info.uri)
}

startServer();