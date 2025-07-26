import { ObjectId } from 'mongodb';
import { Cart } from '../models/cart.model.js';
import { Order } from '../models/order.model.js';
//import Stripe from 'stripe';

//const stripe = new Stripe(process.env.STRIPE_SK)

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
            return cart
        } catch (err) {
            reply.status(500).send('Error al encontrar carrito', err);
        }
    },

    updateCart: async (request, reply) => {
        const { id } = request.session.user,
            newItems = request.body;
        try {
            const { items } = await Cart.findOne({ user_id: id })
            const newCart = [...newItems.items, ...items];

            const updatedUserCart = await Cart.findOneAndUpdate({ user_id: id },
                { $set: { items: newCart } },
                {
                    new: true,
                    runValidators: true
                })
            if (!updatedUserCart) return reply.code(404);
            reply.code(200).send("Se ha actualizado el carrito")
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
            reply.code(200).send("Item eliminado")
        } catch (err) {
            reply.status(500).send('Error al eliminar producto')
        }
    },

    checkout: async (request, reply) => {
        try {
            const domainURL = `http://localhost:${process.env.PORT}`;
            const { items } = request.body;

            if (!items) return reply.status(404).send({ error: 'Ha ocurrido un error' });

            const cartItems = items.map(i => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: i.product_id.name,
                    },
                    unit_amount: Math.round(i.product_variant_id.price * 100),
                },
                quantity: i.quantity
            }));

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: cartItems,
                success_url: `${domainURL}/api/v1/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${domainURL}/api/v1/cancel?session_id={CHECKOUT_SESSION_ID}`,
            });

            reply.send({ url: session.url });

        } catch (err) {
            console.error(err);
            reply.status(500).send({ error: 'Error iniciando compra' });
        }
    },

    success: async (request, reply) => {
        const user = request.session.user;
        const session = await stripe.checkout.sessions.retrieve(request.query.session_id);
        await Order.create({
            checkout_session: session,
            user_id: user.id,
            status: 'succeeded'
        });
        reply.type('text/html').send(`<h2>¡Compra exitosa!</h2><a href="http://localhost:${process.env.CLIENT_PORT}">Volver</a>`);
    },

    cancel: async (request, reply) => {
        const user = request.session.user;
        const session = await stripe.checkout.sessions.retrieve(request.query.session_id);
        await Order.create({
            checkout_session: session,
            user_id: user.id,
            status: 'failed'
        });
        reply.type('text/html').send(`<h2>Compra cancelada</h2><a href="http://localhost:${process.env.CLIENT_PORT}">Volver</a>`);
    }
}

export default cartController;