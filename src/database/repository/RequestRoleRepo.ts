import { Types } from "mongoose";
import { InternalError } from "../../core/ApiError";
import RequestRole, { RequestRoleModel } from "../model/RequestRole";
import User from "../model/User";
import UserRepo from "./UserRepo";


export default class RequestRoleRepo{

    public static async create(requestRole: RequestRole): Promise<RequestRole>{
        requestRole.createdAt = requestRole.updatedAt = new Date();

        return RequestRoleModel.create(requestRole);
    }

    public static async getAll(): Promise<RequestRole[]> {

        return  await RequestRoleModel.find().lean<RequestRole[]>()
                               .populate({
                                    path: "user"
                                })
                               .populate({
                                    path: "requestedRole"
                                })
                               .exec();
    }

    public static async getById(requestRoleId: Types.ObjectId): Promise<RequestRole> {
        const requestRole =  await RequestRoleModel.findById(requestRoleId)
                                                    .populate({
                                                    path: 'user'
                                                    })
                                                    .populate({
                                                    path: "requestedRole"
                                                    })
                                                    .lean<RequestRole>()
                                                    .exec();

        if(requestRole === null || requestRole._id === undefined)
            throw new InternalError('Invalid request for role update');
        
        return requestRole;       
    }

    public static update(requestRole: RequestRole) {
        requestRole.updatedAt = new Date();

        RequestRoleModel.updateOne({ _id: requestRole._id }, { $set: { ...requestRole}})
                        .lean<RequestRole>().exec();
    }

}