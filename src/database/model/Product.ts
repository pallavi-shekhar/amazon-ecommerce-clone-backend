import { model, Schema , Document, Types } from 'mongoose';
import ProductMedia from './ProductMedia';

export const DOCUMENT_NAME = 'Product';
export const COLLECTION_NAME = 'products';

export default interface Product extends Document{
    name: string;
    description: string;
    category: Types.ObjectId;
    price: number;
    discountPercentage: number;
    productMedias: ProductMedia[];
    seller: Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema(
    {
        name: {
            type:Schema.Types.String,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        discountPercentage: {
            type: Schema.Types.Number,
            default: 0
        },
        productMedias: [{
            type: Schema.Types.ObjectId,
            ref: 'ProductMedia'
        }],
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            select: false
        },
        updatedAt: {
            type: Date,
            required: true,
            select: false
        }
    },
    {
        versionKey: false
    }
);

export const ProductModel = model<Product>(DOCUMENT_NAME, schema, COLLECTION_NAME);