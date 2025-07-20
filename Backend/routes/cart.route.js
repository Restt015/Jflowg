import cartController from '../controllers/cart.controller.js';

const cartRoutes = async (fastify, options) => {

    fastify.get('/api/v1/cart', cartController.getCart);

}

export default cartRoutes;