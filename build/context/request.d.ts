/// <reference types="node" />
/// <reference types="node" />
import http from 'http';
import { Body } from '../parser';
/**
 * Class representing the current request.
 */
declare class Request {
    private _internals;
    /**
     * Creates an Request instance.
     * @param {http.IncomingHttpHeaders} headers
     * @param {Buffer} body
     * @param {Record<string, string>} params
     * @param {Record<string, string>} query
     * @param {any} cookies
     * @param {String} url
     */
    constructor(headers: http.IncomingHttpHeaders, body: Buffer, params: Record<string, string>, query: Record<string, string>, cookies: any, url: string);
    header(): any;
    header(key: string): string;
    /**
     * Method that returns a Body instance containing the request body.
     * @return {Body}
     */
    body(): Body;
    params(): Record<string, string>;
    params(key: string): string;
    query(): Record<string, string>;
    query(key: string): string;
    cookies(): Record<string, string>;
    cookies(key: string): string;
    /**
     * Method that returns the request url.
     * @return {String}
     */
    url(): string;
}
export { Request };
