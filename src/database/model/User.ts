import { model, Schema, Document } from 'mongoose';
import Address from './Address';
import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document{
    name: string;
    email: string;
    password: string;
    roles: Role[];
    dateOfBirth?: Date;
    dateOfJoining?: Date;
    status: boolean;
    address: Address[];
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email:{
        type: Schema.Types.String,
        required: true,
        trim:true,
        select: false
    },
    password: {
        type: Schema.Types.String,
        select: false
    },
    roles: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    },
    dateOfBirth:{
        type: Schema.Types.Date,
    },
    dateOfJoining:{
        type: Schema.Types.Date,
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
    address: {
        type:[
            {
            type: Schema.Types.ObjectId,
            ref: 'Address'
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

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

