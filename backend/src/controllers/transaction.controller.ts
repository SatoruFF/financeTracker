import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import "dotenv/config";

import { UserService } from "../services/user.service.js";
import { validateAuth } from "../helpers/valdateAuth.js";

export class TransactionController {
  static async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
    } catch (error: any) {
      return res.status(error.code || 400).json(error.message);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
    } catch (error: any) {
      return res.status(error.code || 400).json(error.message);
    }
  }

  static async auth(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.user?.id;
      const userData = await UserService.auth(id);

      return res.json(userData);
    } catch (error: any) {
      return res.status(error.code || 400).json(error.message);
    }
  }
}
