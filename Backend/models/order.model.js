import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    checkout_session: { type: Object, require: true },
    status: String,
}, { timestamps: tue});

export const Order = model('orders', orderSchema);