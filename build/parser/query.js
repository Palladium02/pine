"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURL = void 0;
/**
 * Function that parses the query parameters of an url, returns both value
 * the url and the query parameters.
 * @param {String} url
 * @param {Boolean} typeguess
 * @return {Array<String, object>}
 */
const parseURL = (url, typeguess = false) => {
    const results = {
        0: '',
        1: '',
        2: '',
    };
    let state = 0;
    /**
     * states:
     *  0 => path
     *  1 => query
     *  2 => fragment
     */
    for (let i = 0; i < url.length; i++) {
        if (url[i] === '?') {
            state = 1;
        }
        else if (url[i] === '#') {
            state = 2;
        }
        else {
            results[state] += url[i];
        }
    }
    const query = querystring(results[1], typeguess);
    return [
        results[0],
        query,
        results[2],
    ];
};
exports.parseURL = parseURL;
/**
 * Function that parses a querystring.
 * @param {String} query
 * @param {Boolean} typeguess
 * @return {Object}
 */
const querystring = (query, typeguess) => {
    const result = {};
    if (query.length === 0) {
        return result;
    }
    /**
     * states:
     *  0 => key
     *  1 => value
     */
    let state = 0;
    let currentKey = '';
    let currentValue = '';
    for (let i = 0; i < query.length; i++) {
        if (query[i] === '=') {
            state = 1;
        }
        else if (query[i] === '&') {
            state = 0;
            result[currentKey] = currentValue;
            currentKey = '';
            currentValue = '';
        }
        else {
            (state === 1) ? currentValue += query[i] : currentKey += query[i];
        }
    }
    if (currentValue.length !== 0) {
        result[currentKey] = currentValue;
    }
    if (!typeguess) {
        return result;
    }
    const keys = Object.keys(result);
    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = parseToType(result[keys[i]]);
    }
    return result;
};
/**
 * Function that converts string value to matching other type.
 * @param {String} value
 * @return {String | Boolean | Number}
 */
const parseToType = (value) => {
    if (/^\d+$/gm.test(value))
        return parseInt(value, 10);
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    return value;
};
