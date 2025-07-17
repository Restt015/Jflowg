import mongoose, { Schema } from 'mongoose';
import { Category } from '../models/category.model.js';

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { String },
    parent_id: { type: Schema.Types.ObjectId, ref: 'categories' },
}, { timestamps: true })

export const SubCategory = mongoose.model('sub_categories', subCategorySchema);