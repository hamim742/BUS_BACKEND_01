import { NextFunction, Request, Response } from "express";
import AppError from "../error/appError";
import httpStatus from "http-status";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../utils/verifyToken";

const checkAuth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifyUserToken = verifyToken(
        token,
        config.jwt.access_secret as Secret,
      );

      console.log(verifyUserToken);

      // Check user is exist
      const user = await prisma.user.findUnique({
        where: {
          id: verifyUserToken.userId,
        },
      });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      if (roles.length && !roles.includes(verifyUserToken.role)) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized! Only admin can access this route');
      }
      req.user = verifyUserToken;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkAuth;