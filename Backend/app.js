// Import the framework and instantate it
// ESM
import Fastify from 'fastify'
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';

const PORT = 3000;

const fastify = Fastify({
  logger: true
})

fastify.register(userRoutes);
fastify.register(productRoutes);



export default fastify;