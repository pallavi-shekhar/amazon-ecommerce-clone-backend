import { model, Schema , Document } from 'mongoose';

export const DOCUMENT_NAME = 'ProductMedia';
export const COLLECTION_NAME = 'productmedias'; 

export const enum UrlType{
    IMAGE =  'IMAGE',
    VIDEO =  'VIDEO'
}

export default interface ProductMedia extends Document{
    productUrl: string;
    mediaType: UrlType;
}

const schema = new Schema(
    {
        productUrl: {
            type:Schema.Types.String,
            required: true,
        },
        mediaType: {
            type: Schema.Types.String,
            required: true,
            enum: [UrlType.IMAGE, UrlType.VIDEO]
        }      
    },
    {
        versionKey: false
    }
);

export const ProductMediaModel = model<ProductMedia>(DOCUMENT_NAME, schema, COLLECTION_NAME);