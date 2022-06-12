import { Request } from 'express';
import User from '../database/model/User';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
