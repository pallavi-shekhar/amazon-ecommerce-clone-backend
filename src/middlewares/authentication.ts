import express from 'express';
import UserRepo from '../database/repository/UserRepo';
import JWT from '../core/JWT';
import asyncHandler from './asyncHandler';
import validator, { ValidationSource } from './validator';
import { getAccessToken, validateTokenData } from '../core/authUtils';
import schema from './schema';
import { Types } from 'mongoose';
import { AccessTokenError, AuthFailureError, TokenExpiredError } from '../core/ApiError';
import { ProtectedRequest } from 'app-request';

const router = express.Router();

export default router.use(
    validator(schema.auth, ValidationSource.HEADER),
    asyncHandler(async (req: ProtectedRequest,res,next)=> {
    req.accessToken = getAccessToken(req.headers.authorization);

    try {
        const payload = await JWT.validate(req.accessToken);
        validateTokenData(payload);

        const user =  await UserRepo.getById(new Types.ObjectId(payload.sub));
        if(!user)
            throw new AuthFailureError('User not registered');

        req.user = user;

        return next();
    }
    catch(e){
        if(e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
        throw e;
    }
    
}))