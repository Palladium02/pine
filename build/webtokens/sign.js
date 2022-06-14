"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignature = exports.sign = void 0;
const crypto_1 = __importDefault(require("crypto"));
const DEFAULT_OPTIONS = {
    expiresIn: 8.64e7,
};
const createSignature = ({ encodedHeader, encodedPayload, secret }) => {
    const signature = crypto_1.default.createHmac('SHA256', secret);
    return signature
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64url');
};
exports.createSignature = createSignature;
const sign = ({ payload, secret, options }) => {
    const mergedOptions = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    const header = {
        alg: 'HS256',
        typ: 'JWT',
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const now = Date.now();
    const expiresIn = now + mergedOptions.expiresIn;
    const encodedPayload = Buffer.from(JSON.stringify(Object.assign(Object.assign({}, payload), { exp: expiresIn }))).toString('base64url');
    const signature = createSignature({ encodedHeader, encodedPayload, secret });
    return [encodedHeader, encodedPayload, signature].join('.');
};
exports.sign = sign;
