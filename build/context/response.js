"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
/**
 * Class representing the Response object.
 */
class Response {
    /**
     * Creates a Response instance.
     * @param {http.ServerResponse} NativeResponse
     * @param {HttpVerb} method
     */
    constructor(NativeResponse, method) {
        this._internals = {
            NativeResponse,
            wasSend: false,
            header: {},
            status: method === 'POST' ? 201 : 200,
            body: null,
        };
    }
    /**
     * Method for adding headers to the response.
     * @param {String | object} f
     * @param {String} s
     * @return {Response}
     */
    header(f, s) {
        if (f && s) {
            if (typeof f === 'string') {
                this._internals.header[f] = s;
            }
        }
        else {
            if (typeof f === 'object') {
                this._internals.header = Object.assign(Object.assign({}, this._internals.header), f);
            }
        }
        return this;
    }
    /**
     * Method for setting the status code.
     * @param {number} status
     */
    status(status) {
        this._internals.status = status;
    }
    /**
     * Adds response or returns the current response body.
     * @param {any} payload
     * @return {Response|any}
     */
    body(payload) {
        if (payload) {
            this._internals.body = payload;
            return this;
        }
        return this._internals.body;
    }
    /**
     * Method for sending the response. After calling the send method the
     * feature stack will be collapsed.
     */
    send() {
        this._internals.wasSend = true;
        this._internals.NativeResponse.writeHead(this._internals.status, this._internals.header);
        this._internals.NativeResponse.write(this._internals.body);
    }
    /**
     * Method that returns a check value for wether the request was send or not.
     * @return {boolean}
     */
    wasSend() {
        return this._internals.wasSend;
    }
}
exports.Response = Response;
