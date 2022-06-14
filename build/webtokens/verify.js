"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const decode_1 = require("./decode");
const sign_1 = require("./sign");
const isInPast = (exp) => {
    const now = new Date();
    return new Date(exp).setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0);
};
const verify = ({ token, secret }) => {
    const parts = token.split('.');
    if (parts.length !== 3)
        return new Error('Invalid token length');
    const [encodedHeader, encodedPayload, signature] = parts;
    const candidate = (0, sign_1.createSignature)({ encodedHeader, encodedPayload, secret });
    if (signature !== candidate)
        return new Error('Invalid token.');
    const decodedPayload = (0, decode_1.decode)(token);
    if (isInPast(decodedPayload.exp)) {
        return new Error('Token has expired.');
    }
    return decodedPayload;
};
exports.verify = verify;
