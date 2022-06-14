"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const parser_1 = require("../parser");
/**
 * Class representing the current request.
 */
class Request {
    /**
     * Creates an Request instance.
     * @param {http.IncomingHttpHeaders} headers
     * @param {Buffer} body
     * @param {Record<string, string>} params
     * @param {Record<string, string>} query
     * @param {any} cookies
     * @param {String} url
     */
    constructor(headers, body, params, query, cookies, url) {
        this._internals = {
            headers,
            params,
            query,
            cookies,
            url,
            body: new parser_1.Body(body, headers['content-type'] || ''),
        };
    }
    /**
     * Method to retrieve the request headers or a single one.
     * @param {string} key
     * @return {any}
     */
    header(key) {
        if (key)
            return this._internals.headers[key];
        return this._internals.headers;
    }
    /**
     * Method that returns a Body instance containing the request body.
     * @return {Body}
     */
    body() {
        return this._internals.body;
    }
    /**
     * Method to retrieve the url parameter or a single one.
     * @param {String} key
     * @return {any}
     */
    params(key) {
        if (key)
            return this._internals.params[key];
        return this._internals.params;
    }
    /**
     * Method to retrieve the query parameter or a single one.
     * @param {String} key
     * @return {any}
     */
    query(key) {
        if (key)
            return this._internals.query[key];
        return this._internals.query;
    }
    /**
     * Method to retrieve the request cookies.
     * @param {String} key
     * @return {any}
     */
    cookies(key) {
        if (key)
            return this._internals.cookies[key];
        return this._internals.cookies;
    }
    /**
     * Method that returns the request url.
     * @return {String}
     */
    url() {
        return this._internals.url;
    }
}
exports.Request = Request;
