"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webtoken = void 0;
const application_1 = require("../application");
const verify_1 = require("./verify");
const webtoken = (secret) => {
    return (context) => {
        const token = context.request.header('bearer-token');
        if (!token)
            throw new application_1.HttpUnauthorized('Unauthorized.');
        if ((0, verify_1.verify)({ token, secret }) instanceof Error) {
            throw new application_1.HttpUnauthorized('Unauthorized.');
        }
    };
};
exports.webtoken = webtoken;
