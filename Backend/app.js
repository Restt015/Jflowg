import 'dotenv/config';
// Import the framework and instantate it
// ESM
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  cookie:{
    secure: false, // Set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
})

fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  authorized: true
})

fastify.register(userRoutes);
fastify.register(productRoutes);


export default fastify;