import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'ApiKey';
export const COLLECTION_NAME = 'api_keys';


export default interface ApiKey extends Document{
    key: string;
    status?: boolean;
    metadata: string;
    createdAt: Date;
    updatedAt: Date
}

const schema = new Schema({
    key: {
        type: Schema.Types.String,
        required: true,
    },
    metadata: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
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

export const ApiKeyModel = model<ApiKey>(DOCUMENT_NAME, schema, COLLECTION_NAME);
