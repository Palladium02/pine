"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
/**
 * Class representing the current context.
 */
class Context {
    /**
     * Creates a Context instance.
     * @param {Request} request
     * @param {Response} response
     * @param {http.IncomingMessage} NativeRequest
     * @param {http.ServerResponse} NativeResponse
     * @param {State} state
     * @param {Application} app
     */
    constructor(request, response, NativeRequest, NativeResponse, state, app) {
        this.request = request;
        this.response = response;
        this.NativeRequest = NativeRequest;
        this.NativeResponse = NativeResponse;
        this.state = state;
        this.app = app;
    }
}
exports.Context = Context;
