"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
/**
 * Class representing the request body.
 */
class Body {
    /**
     * Creates a Body instance.
     * @param {Buffer} body
     * @param {String} type
     */
    constructor(body, type) {
        this._internals = {
            body: {},
            raw: body,
            type: '',
        };
        this._determineContenttype(type);
    }
    /**
     * Method that will initially parse the raw body and return the result.
     * @return {any}
     */
    read() {
        switch (this._internals.type) {
            case 'json':
                try {
                    this._internals.body = JSON.parse(this._internals.raw.toString());
                }
                catch (_a) {
                    this._internals.body = {};
                }
                return this._internals.body;
            case 'text':
                this._internals.body = this._internals.raw.toString();
                return this._internals.body;
            case 'form':
                this._internals.body = Object.entries(this._internals.raw.toString()
                    .split('&')
                    .map((pair) => pair.split('=')));
                return this._internals.body;
        }
    }
    /**
     * Method that returns the parsed request body or an empty object.
     * @return {any}
     */
    value() {
        return this._internals.body;
    }
    /**
     * Method that will return the raw request body.
     * @return {Buffer}
     */
    raw() {
        return this._internals.raw;
    }
    /**
     * Method that will returned the contenttype in a simplified form.
     * @return {String}
     */
    type() {
        return this._internals.type;
    }
    /**
     * Method that determines the contenttype and returns a simplified form of it.
     * @param {String} type
     */
    _determineContenttype(type) {
        switch (type) {
            case 'application/json':
                this._internals['type'] = 'json';
                break;
            case 'type/text':
                this._internals['type'] = 'text';
            case 'application/x-www-form-urlencoded':
                this._internals['type'] = 'form';
            default:
                this._internals['type'] = 'text';
        }
    }
}
exports.Body = Body;
