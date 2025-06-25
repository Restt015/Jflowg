// Import the framework and instantate it
// ESM
import Fastify from 'fastify'

const PORT = 3000;

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

// Run the server
fastify.listen({ port: PORT }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
