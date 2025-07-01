import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productFilePath = path.join(__dirname, '../data/products.json');

const getProducts = () => JSON.parse(fs.readFileSync(productFilePath, 'utf-8')),
    findProduct = id => getProducts().find(p => parseInt(id) === p.id)

const productController = {

    getProducts: async (request, reply) => {
        return reply.send({
            count: getProducts().length,
            products: getProducts()
        })
    },

    getProduct: async (request, reply) => {
        const id = request.params.id,
            product = findProduct(id)
        if (!product) reply.status(404).send("No se encontráron recursos");
        return reply.send(product);
    },

    storeProduct: async (request, reply) => {
        const products = getProducts();

        if (!request.body || !request.body.name || !request.body.price || request.body.category) {
            const newProduct = {
                id: products.length + 1,
                ...request.body
            };
            products.push(newProduct);
            fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
            reply.code(201).redirect('/api/v1/products');
        }
    },

    updateProduct: async (request, reply) => {
        const id = request.params.id,
            productExist = findProduct(id);
        if (!request.body) return reply.code(400).send('Error en el formulario');
        if (!productExist) return reply.code(404).send('No se encontráron recursos');
        const products = getProducts().map(p => p.id === parseInt(id) ? { ...p, ...request.body } : p);
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
        reply.code(200).redirect('api/v1/products');
    },

    deleteUser: async (request, reply) => {
        const id = request.params.id,
            productExist = findProduct(id);
        if (!productExist) return reply.code(404).send('No se encontráron recursos');
        const products = getProducts().filter(p => p.id !== parseInt(id));
        fs.writeFileSync(productFilePath, JSON.stringify(products, null, 2));
        reply.code(200).redirect('/api/v1/products');
    }
};

export default productController;