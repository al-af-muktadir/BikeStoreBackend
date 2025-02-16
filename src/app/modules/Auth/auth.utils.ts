import jwt, { JwtPayload } from 'jsonwebtoken';

export const VerifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
