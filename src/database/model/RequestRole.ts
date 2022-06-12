import { Schema, model, Document, Types } from 'mongoose';
import Role from './Role';

export const DOCUMENT_NAME = 'RequestRole';
export const COLLECTION_NAME = 'requestroles';


export default interface RequestRole extends Document{
    user: Types.ObjectId;
    requestedRole: Role;
    approvedBy: Types.ObjectId;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedRole: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Schema.Types.Boolean,
        default: false
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

export const RequestRoleModel = model<RequestRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
