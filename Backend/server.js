import fastify from './app.js';

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server running on port 3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();