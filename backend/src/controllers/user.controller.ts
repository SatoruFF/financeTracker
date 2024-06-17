import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import "dotenv/config";

import { UserService } from "../services/user.service.js";
import { validateAuth } from "../helpers/valdateAuth.js";

export class UserController {
  static async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userName, email, password } = _.get(req, ["body"], {});

      validateAuth({ userName, email, password })

      const userData = await UserService.registration({
        userName,
        email,
        password,
      });

      return res.json(userData);
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
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      return res.json(userData);
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
