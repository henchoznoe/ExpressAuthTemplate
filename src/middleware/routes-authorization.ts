import { Request, Response, NextFunction } from "express";
import { errorResponse } from "@http/responses";
import { verify, VerifyErrors } from "jsonwebtoken";
import { JWTPayloadType } from "@type/auth";

export const authorizeRouteAccess = (roles: number[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if ( !authHeader ) return errorResponse(res, 401, 'No token provided');
    const token = authHeader.split(' ')[1];
    verify(token, process.env.JWT_SECRET, (err: VerifyErrors, user: JWTPayloadType) => {
      if ( err ) return errorResponse(res, 401, err.message);
      if ( !roles.includes(user.roleId) ) return errorResponse(res, 403, 'Access denied');
      next();
    });
  }
}
