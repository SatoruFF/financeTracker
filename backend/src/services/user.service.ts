import _ from "lodash"
import bcrypt from "bcrypt";
import "dotenv/config"
import { prisma } from "../configs/index.js";
import { generateJwt } from "../helpers/generateJwt.js";
import { BadRequest } from "@feathersjs/errors";


interface IUserData {
  email: string;
  password: string;
  userName?: string;
}

export class UserService {
  static async registration(userData: IUserData) {
    // Validate user data
    const candidate = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (candidate) {
        throw new BadRequest(`User with email: ${userData.email} already exists`)
    }

    // create user in dataBase
    const hashPassword = await bcrypt.hash(userData.password, 5);

    const user = await prisma.user.create({
      data: {
        userName: userData.userName || "test",
        email: userData.email,
        password: hashPassword,
      },
    });

    const { accessToken } = generateJwt(user.id);

    const userSettings = await prisma.userConfig.create({
      data: {
        userId: user.id,
      },
    });

    const userDto = {
        accessToken,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        userSettings,
      }

    return userDto;
  }

  static async login(email: string, password: string) {
    const user: any = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequest(`User with email: ${email} not found`)
      }

      const isPassValid = bcrypt.compareSync(password, user.password);

      if (!isPassValid) {
        throw new BadRequest(`Uncorrect data`)
      }

      const { accessToken } = generateJwt(user.id);

      return {
        accessToken,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      }
  }

  static async auth(id: number | undefined) {
    const user: any = await prisma.user.findUnique({
        where: {
          id,
        },
      });
            
      const token = generateJwt(user.id);

      return {
        token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      }
  }
}