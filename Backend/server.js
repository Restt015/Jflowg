import fastify from './app.js';

const PORT = 3001
// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server running on port 3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();