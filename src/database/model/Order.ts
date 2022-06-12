import { model, Schema, Document, Types } from 'mongoose';
import Product from './Product';

export const DOCUMENT_NAME = 'Order';
export const COLLECTION_NAME = 'orders';

export default interface Order extends Document{
    user: Types.ObjectId;
    orderedPrice: number;
    product: Product;
    productPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderedPrice: {
        type: Schema.Types.Number,
        required: true
    },
    productPrice: {
        type: Schema.Types.Number,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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
})

export const OrderModel = model<Order>(DOCUMENT_NAME, schema, COLLECTION_NAME);