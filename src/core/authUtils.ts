import { Tokens } from 'app-request';
import { AuthFailureError, InternalError } from './ApiError';
import JWT, { JwtPayload } from './JWT';
import { Types } from 'mongoose';
import User from '../database/model/User';
import { tokenInfo } from '../config';

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer ')) 
    throw new AuthFailureError('Invalid Authorization');

  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !Types.ObjectId.isValid(payload.sub)
  )
    throw new AuthFailureError('Invalid Access Token');
    
  return true;
};

export const createTokens = async (
  user: User,
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      tokenInfo.accessTokenValidityDays,
    ),
  );

  if (!accessToken) 
    throw new InternalError();

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user._id.toString(),
      tokenInfo.refreshTokenValidityDays,
    ),
  );

  if (!refreshToken) 
    throw new InternalError();

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};
