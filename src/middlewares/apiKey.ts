import express from 'express';
import asyncHandler from './asyncHandler';
import validator, { ValidationSource } from './validator';
import ApiKeyRepo from '../database/repository/ApiKeyRepo';
import schema from './schema';
import { PublicRequest } from 'app-request';
import { ForbiddenError } from '../core/ApiError';


const router = express.Router();

export default router.use(
    validator(schema.apiKey, ValidationSource.HEADER),
    asyncHandler(async (req: PublicRequest, res, next) => {
        // @ts-ignore
        req.apiKey = req.headers['x-api-key'].toString();
 
        const apikey = await ApiKeyRepo.findByKey(req.apiKey);
        
        if(!apikey) throw new ForbiddenError();

        return next();
    })
)