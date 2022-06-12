import { ProtectedRequest } from 'app-request';
import RequestRoleRepo from '../../database/repository/RequestRoleRepo';
import RequestRole from '../../database/model/RequestRole';
import asyncHandler from '../../middlewares/asyncHandler';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { Types } from 'mongoose';
import User from '../../database/model/User';
import UserRepo from '../../database/repository/UserRepo';
import { InternalError } from '../../core/ApiError';

const create = asyncHandler(async (req: ProtectedRequest, res) => {    
    let roleRequest = {
      user: req.user._id,
      requestedRole: req.body.requestedRole,
      approved: false,
    } as RequestRole;

    const order = await RequestRoleRepo.create(roleRequest);

    return new SuccessResponse("Role request created successfully", order).send(res);
  });

const getAll = asyncHandler(async (req: ProtectedRequest, res) => {
    const requests = await RequestRoleRepo.getAll();

    return new SuccessResponse("Role requests retrieved successfully",requests).send(res);
});

const update = asyncHandler(async (req: ProtectedRequest, res) => {
    let approverId = req.user._id;
    let requestRoleId = new Types.ObjectId(req.params.id);
    let user: User;

    const requestRole = await RequestRoleRepo.getById(requestRoleId);
    requestRole.approvedBy = approverId;   
    requestRole.approved = true; 

    const fetchedUser = await UserRepo.getById(requestRole.user);
    if(fetchedUser === null || fetchedUser._id === undefined)
      throw new InternalError('User not registered')

    user = fetchedUser;
    user.roles.push(requestRole.requestedRole);

    RequestRoleRepo.update(requestRole);
    UserRepo.update(user);
    
    return new SuccessMsgResponse("Role requests upadated successfully").send(res);
});

const RoleRequestController = { create, getAll, update };
export default RoleRequestController;