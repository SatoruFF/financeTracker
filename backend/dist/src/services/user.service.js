var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import "dotenv/config";
import { prisma } from "../configs/index.js";
import { generateJwt } from "../helpers/generateJwt.js";
import { BadRequest } from "@feathersjs/errors";
export class UserService {
    static registration(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate user data
            const candidate = yield prisma.user.findUnique({
                where: {
                    email: userData.email,
                },
            });
            if (candidate) {
                throw new BadRequest(`User with email: ${userData.email} already exists`);
            }
            // create user in dataBase
            const hashPassword = yield bcrypt.hash(userData.password, 5);
            const user = yield prisma.user.create({
                data: {
                    userName: userData.userName || "test",
                    email: userData.email,
                    password: hashPassword,
                },
            });
            const { accessToken } = generateJwt(user.id);
            const userSettings = yield prisma.userConfig.create({
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
            };
            return userDto;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                throw new BadRequest(`User with email: ${email} not found`);
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                throw new BadRequest(`Uncorrect data`);
            }
            const { accessToken } = generateJwt(user.id);
            const userSettings = yield prisma.userConfig.findFirst({
                where: {
                    userId: user.id,
                },
            });
            return {
                accessToken,
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role,
                },
                userSettings,
            };
        });
    }
    static auth(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
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
            };
        });
    }
}
//# sourceMappingURL=user.service.js.map