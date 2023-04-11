import { Schema } from 'mongoose';

const productSchema = new Schema({
    timestamp: { type: String, default: new Date().toLocaleString() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: Array }
}, { versionKey: false });

export default productSchema;
