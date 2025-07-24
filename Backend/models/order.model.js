import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    checkout_session: { type: Object, require: true },
    user_id: {type: Schema.Types.ObjectId, ref: 'users', require: true},
    status: String,
}, { timestamps: true});

export const Order = model('orders', orderSchema);