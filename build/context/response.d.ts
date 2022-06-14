/// <reference types="node" />
import http from 'http';
import { HttpVerb } from '../routing';
/**
 * Class representing the Response object.
 */
declare class Response {
    private _internals;
    /**
     * Creates a Response instance.
     * @param {http.ServerResponse} NativeResponse
     * @param {HttpVerb} method
     */
    constructor(NativeResponse: http.ServerResponse, method: HttpVerb);
    header(name: string, value: string): Response;
    header(headers: Record<string, string>): Response;
    /**
     * Method for setting the status code.
     * @param {number} status
     */
    status(status: number): void;
    body(payload: any): Response;
    body(): any;
    /**
     * Method for sending the response. After calling the send method the
     * feature stack will be collapsed.
     */
    send(): void;
    /**
     * Method that returns a check value for wether the request was send or not.
     * @return {boolean}
     */
    wasSend(): boolean;
}
export { Response };
