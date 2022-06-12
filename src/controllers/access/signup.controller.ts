import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RoleRequest } from 'app-request';
import { BadRequestError } from "../../core/ApiError";
import UserRepo from '../../database/repository/UserRepo';
import asyncHandler from "../../middlewares/asyncHandler";
import RoleRepo from '../../database/repository/RoleRepo';
import { RoleCode } from '../../database/model/Role';
import User from '../../database/model/User';
import { createTokens } from '../../core/authUtils';
import { SuccessResponse } from '../../core/ApiResponse';


const signUp = asyncHandler(async (req: RoleRequest, res)=>{
    const user = await UserRepo.getByEmail(req.body.email);
    if(user) 
        throw new BadRequestError('User already registered');

    const passwordHash = await bcrypt.hash(req.body.password,10);
    
    const role = await RoleRepo.findByCode(RoleCode.BUYER);
    const createdUser = await UserRepo.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            roles: [role._id]
        } as User);

    const tokens = await createTokens(createdUser);

    new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'name', 'email', 'roles', 'address']),
        tokens: tokens
    }).send(res);
});

const SignupController = { signUp };
export default SignupController;