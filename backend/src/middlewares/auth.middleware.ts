import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAuthenticated } from "@feathersjs/errors";
import _ from "lodash";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddle = (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new NotAuthenticated(`auth error`);
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(error.code || 401).json(error.message);
  }
};

export default authMiddle;
