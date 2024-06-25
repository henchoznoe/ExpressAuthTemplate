import { Request, Response, NextFunction } from "express";
import { errorResponse } from "@http/responses";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify, VerifyErrors } from "jsonwebtoken";
import { JWTPayloadType } from "@type/auth";

export const authorizeRouteAccess = (roles: number[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if ( !authHeader ) return errorResponse(res, 401, 'No token provided');

    const token = authHeader.split(' ')[1];

    const options = {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    };

    verify(token, process.env.JWT_SECRET, options, (err: VerifyErrors, user: JWTPayloadType) => {
      if ( err instanceof TokenExpiredError ) return errorResponse(res, 401, 'Token has expired');
      if ( err instanceof NotBeforeError ) return errorResponse(res, 401, 'Token is not valid yet');
      if ( err instanceof JsonWebTokenError ) return errorResponse(res, 401, err.message);
      if ( !roles.includes(user.roleId) ) return errorResponse(res, 403, 'Access denied');
      next();
    });
  }
}
