var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import { UserService } from "../services/user.service.js";
export class TransactionController {
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return res.status(error.code || 400).json(error.message);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return res.status(error.code || 400).json(error.message);
            }
        });
    }
    static auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const userData = yield UserService.auth(id);
                return res.json(userData);
            }
            catch (error) {
                return res.status(error.code || 400).json(error.message);
            }
        });
    }
}
//# sourceMappingURL=transaction.controller.js.map