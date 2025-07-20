import { Cart } from '../models/cart.model.js';

const cartController = {

    getCart: async (request, reply) => {
        const user = request.session.user;
        if (!user) {
            return { item: [] }
        }
        const cart = await Cart.findOne({ user_id: user.id })
            .populate('user_id', ['name', 'lastName', 'email'])
            .populate('items.product_id')
            .populate('items.product_variant_id');
        console.log(cart);
        return cart
    },

    updateCart: async (request, reply) => {

    },

    deleteCartItem: async (request, reply) => {

    },
}

export default cartController;