import { BadRequest } from "@feathersjs/errors";
import _ from "lodash";
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
export const validateAuth = (body) => {
    const { email, password } = body;
    console.log(body);
    if (!email || !password) {
        throw new BadRequest(`login and password must be required`);
    }
    if (!validateEmail(email)) {
        throw new BadRequest(`not a valid email`);
    }
    if (_.size(password) < 4 || _.size(password) > 24) {
        throw new BadRequest(`password length must be between 4 and 24 characters`);
    }
};
//# sourceMappingURL=valdateAuth.js.map