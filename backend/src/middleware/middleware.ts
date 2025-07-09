import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { JWTUser } from "../types";
export function isAuth(req: Request, res: Response, next: NextFunction) {
  const {token} = req.cookies;
  if (!token) next(new AppError("Unauthanticated please login again", 401));
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      next(new AppError("Internal server error", 500));
      return;
    }
    const decode = jwt.verify(token, secret);
    req.user = decode as JWTUser;
    next();
  } catch (error:any) {
    next(new AppError(error.message, 500));
  }
}

export const authorizedRoles =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserRoles = req?.user?.role;
    if (!currentUserRoles)
      return next(new AppError("Unauthanticated please login again", 401));
    if (!roles.includes(currentUserRoles)) {
      return next(
        new AppError("you do not have permission to access this routes", 403)
      );
    }
    next();
  };
