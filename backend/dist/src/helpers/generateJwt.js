import jwt from "jsonwebtoken";
import "dotenv/config";
export const generateJwt = (id) => {
    return {
        accessToken: jwt.sign({
            id,
        }, process.env.SECRET_KEY, {
            expiresIn: "12h",
        }),
    };
};
//# sourceMappingURL=generateJwt.js.map