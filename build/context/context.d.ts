/// <reference types="node" />
import http from 'http';
import { Application, State } from '../application';
import { Request, Response } from './';
/**
 * Class representing the current context.
 */
declare class Context {
    request: Request;
    response: Response;
    NativeRequest: http.IncomingMessage;
    NativeResponse: http.ServerResponse;
    state: State;
    app: Application;
    /**
     * Creates a Context instance.
     * @param {Request} request
     * @param {Response} response
     * @param {http.IncomingMessage} NativeRequest
     * @param {http.ServerResponse} NativeResponse
     * @param {State} state
     * @param {Application} app
     */
    constructor(request: Request, response: Response, NativeRequest: http.IncomingMessage, NativeResponse: http.ServerResponse, state: State, app: Application);
}
export { Context };
