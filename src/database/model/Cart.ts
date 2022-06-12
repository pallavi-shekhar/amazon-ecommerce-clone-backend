import { model, Schema, Document, Types } from 'mongoose';
import Product from './Product';

export const DOCUMENT_NAME = 'Cart';
export const COLLECTION_NAME = 'carts';

export default interface Cart extends Document {
    user: Types.ObjectId;
    products: Product[];
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    }
},
{
    versionKey: false
})

export const CartModel = model<Cart>(DOCUMENT_NAME, schema, COLLECTION_NAME);