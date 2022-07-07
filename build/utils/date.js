"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
const date = () => {
    const now = new Date();
    const hours = prefix(now.getHours());
    const minutes = prefix(now.getMinutes());
    const seconds = prefix(now.getSeconds());
    return `${hours}}:${minutes}:${seconds} ${prefix(now.getMonth() + 1)}/${prefix(now.getDate())}/${now.getFullYear()}`;
};
exports.date = date;
const prefix = (n) => {
    return (n < 10) ? `0${n}` : '' + n;
};
