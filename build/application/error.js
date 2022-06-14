"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUnauthorized = exports.HttpBadRequest = exports.HttpForbidden = exports.HttpException = void 0;
/**
 * The parent class for all HttpExceptions.
 */
class HttpException {
    /**
     * Creates a HttpException instance.
     * @param {any} message
     * @param {number} status
     */
    constructor(message, status) {
        this._internals = {
            message,
            status,
        };
    }
    /**
     * Getter for the status property.
     * @return {number}
     */
    getStatus() {
        return this._internals.status;
    }
    /**
     * Getter for the message property.
     * @return {any}
     */
    getMessage() {
        return this._internals.message;
    }
}
exports.HttpException = HttpException;
/**
 * Class for the HttpForbidden error.
 */
class HttpForbidden extends HttpException {
    /**
     * Creates HttpForbidden instance.
     * @param {any} message
     */
    constructor(message) {
        super(message, 403);
    }
}
exports.HttpForbidden = HttpForbidden;
/**
 * Class for the HttpBadRequest error.
 */
class HttpBadRequest extends HttpException {
    /**
     * Creates HttpBadRequest instance.
     * @param {any} message
     */
    constructor(message) {
        super(message, 400);
    }
}
exports.HttpBadRequest = HttpBadRequest;
/**
 * Class for the HttpUnauthorized error.
 */
class HttpUnauthorized extends HttpException {
    /**
     * Creates HttpUnauthorized instance.
     * @param {any} message
     */
    constructor(message) {
        super(message, 401);
    }
}
exports.HttpUnauthorized = HttpUnauthorized;
