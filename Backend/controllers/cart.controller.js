import User from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import { ProductVariant } from '../models/productVariant.model.js';
import { Category } from '../models/category.model.js';
import { SubCategory } from '../models/subCategory.model.js';
import { Cart } from '../models/cart.model.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const cartController = {

    getCart: async (request, reply) => {
        // console.log(request.params.id);
        const cart = await Cart.find().populate('user_id').populate('items.product_id').populate('items.product_variant_id');
        console.log(cart);
        return cart || { item: ['no sirve pa'] }
    },

    updateCart: async (request, reply) => {

    },

    deleteCartItem: async (request, reply) => {

    },
}   

export default cartController;