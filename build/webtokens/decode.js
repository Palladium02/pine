"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const decode = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3)
        return new Error('Invalid token length.');
    const encodedPayload = parts[1];
    return JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
};
exports.decode = decode;
