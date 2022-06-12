import { model, Schema, Document, Types } from 'mongoose';
import Order from './Order';

export const DOCUMENT_NAME = 'AggregateOrder';
export const COLLECTION_NAME = 'aggregateorders';

export default interface AggregateOrder extends Document{
    user: Types.ObjectId;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order'   
            }
        ]
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

export const AggregateOrderModel = model<AggregateOrder>(DOCUMENT_NAME, schema, COLLECTION_NAME);