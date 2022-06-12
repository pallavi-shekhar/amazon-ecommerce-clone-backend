import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Address';
export const COLLECTION_NAME = 'addresses';

export default interface Address extends Document{
    fullname: string;
    mobile: number;
    pincode: number;
    line1: string;
    line2: string;
    landmark?: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    fullname: {
        type: Schema.Types.String,
        required: true,
    },
    mobile: {
        type: Schema.Types.Number,
        required: true,
        length:10
    },
    pincode: {
        type: Schema.Types.Number,
        required: true,
        length:6
    },
    line1: {
        type: Schema.Types.String,
        required: true,
    },
    line2: {
        type: Schema.Types.String,
        required: true,
    },
    landmark: {
        type: Schema.Types.String,
    },
    city: {
        type: Schema.Types.String,
        required: true,
    },
    state: {
        type: Schema.Types.String,
        required: true,
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
});

export const AddressModel = model<Address>(DOCUMENT_NAME, schema, COLLECTION_NAME);
