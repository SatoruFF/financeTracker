import { NotAuthenticated } from "@feathersjs/errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
const authMiddle = (req, res, next) => {
    var _a;
    try {
        if (req.method === "OPTIONS") {
            return next();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new NotAuthenticated(`auth error`);
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(error.code || 401).json(error.message);
    }
};
export default authMiddle;
//# sourceMappingURL=auth.middleware.js.map