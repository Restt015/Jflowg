import { ObjectId } from 'mongodb';
import { Cart } from '../models/cart.model.js';

const cartController = {

    getCart: async (request, reply) => {
        const user = request.session.user;
        if (!user) {
            return { item: [] }
        }
        try {
            const cart = await Cart.findOne({ user_id: user.id })
                .populate('user_id', ['name', 'lastName', 'email'])
                .populate('items.product_id')
                .populate('items.product_variant_id');
            console.log(cart);
            return cart
        } catch (err) {
            reply.status(500).send('Error al encontrar carrito', err);
        }
    },

    updateCart: async (request, reply) => {
        const { id } = request.session.user,
            updatedData = request.body;
        try {
            const updatedUserCart = await Cart.findOneAndUpdate({ user_id: id }, updatedData, {
                new: true,
                runValidators: true
            })
            if (!updatedUserCart) return reply.code(404);
            reply.code(200)
        } catch (err) {
            reply.status(500).send('Error al actializar carrito', err);
        }
    },

    deleteCartItem: async (request, reply) => {
        const { id } = request.session.user,
            item = request.body;
        try {
            const cart = await Cart.findOneAndUpdate({ user_id: id },
                { $pull: { items: item } },
                {
                    new: true,
                    runValidators: true
                }
            );
            reply.send(200)
        } catch (err) {
            reply.status(500).send('Error al eliminar producto')
        }
    },
}

export default cartController;