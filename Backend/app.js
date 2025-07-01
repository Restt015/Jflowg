// Import the framework and instantate it
// ESM
import Fastify from 'fastify'
import userRoutes from './routes/user.route.js';

const PORT = 3000;

const fastify = Fastify({
  logger: true
})

fastify.register(userRoutes);


// Run the server
fastify.listen({ port: PORT }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
