import bcrypt from 'bcrypt';
import _ from 'lodash';
import { AuthFailureError, BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import asyncHandler from "../../middlewares/asyncHandler";
import UserRepo from "../../database/repository/UserRepo";
import { createTokens } from '../../core/authUtils';

const login = asyncHandler(async (req,res) =>{
    const user = await UserRepo.getByEmail(req.body.email);
    if(!user) 
        throw new BadRequestError('User not registered');
    
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) 
        throw new AuthFailureError('Authentication failure');

    const tokens = await createTokens(user);

    new SuccessResponse('Login Success', {
        user: _.pick(user, ['_id', 'name', 'roles', 'address']),
        tokens: tokens
      }).send(res);
});

const LoginController = { login };
export default LoginController;