import mongoose, { Schema } from "mongoose";
  
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sub_categories' },
  variants: [{ type: Schema.Types.ObjectId, ref: 'products_variants' }],
}, { timestamps: true });

export const Product = mongoose.model("products", productSchema);