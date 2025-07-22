import cartController from '../controllers/cart.controller.js';
import { isLogedIn } from '../validators/auth.validator.js';
const cartRoutes = async (fastify, options) => {

    fastify.get('/api/v1/cart', {
        handler: cartController.getCart
    });

    fastify.patch('/api/v1/cart', {
        preHandler: isLogedIn,
        handler: cartController.updateCart
    });
   
    fastify.delete('/api/v1/cart', {
        preHandler: isLogedIn,
        handler: cartController.deleteCartItem
    });
    
}

export default cartRoutes;