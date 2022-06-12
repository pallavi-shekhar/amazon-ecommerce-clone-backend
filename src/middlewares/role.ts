import { Response, NextFunction } from 'express';
import { RoleCode } from '../database/model/Role';
import { RoleRequest } from 'app-request';

export default (roleCode: RoleCode) => (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCode = roleCode;
    next();
};
