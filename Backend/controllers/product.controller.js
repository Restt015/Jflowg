import {Product} from '../models/product.model.js';

const productController = {

    getProducts: async (request, reply) => {
        const products = await Product.find()
        .populate('sub_category_id')
        .populate('variants');
        return reply.send({
            count: products.length,
            products: products
        });
    },


    getProduct: async (request, reply) => {
        const id = request.params.id;
        const product = await Product.findById(id) 
        .populate('sub_category_id')
        .populate('variants');
        if (!product) return reply.status(404).send("No se encontraron recursos");
        return reply.send(product);
    },


    storeProduct: async (request, reply) => {
        const { name, price, category, description, image } = request.body;
        if (!name || !price || !category) return reply.code(400).send('Error en el formulario');
        try {
            const newProduct = await Product.create({ name, price, category, description, image });
            reply.code(201).send(newProduct);
        } catch (err) {
            console.error(err);
            reply.code(500).send('Error al crear producto');
        }
    },


    updateProduct: async (request, reply) => {
        const id = request.params.id;
        if (!request.body) return reply.code(400).send('Error en el formulario');
        const product = await Product.findByIdAndUpdate(id, request.body, { new: true });
        if (!product) return reply.code(404).send('No se encontraron recursos');
        reply.code(200).send(product);
    },


    deleteProduct: async (request, reply) => {
        const id = request.params.id;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return reply.code(404).send('No se encontraron recursos');
        reply.code(200).send('Producto eliminado');
    }
};

export default productController;