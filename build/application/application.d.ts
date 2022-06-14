/// <reference types="node" />
/// <reference types="node" />
import http from 'http';
import https from 'https';
import { Router } from '../routing';
interface ApplicationConfiguration {
    port?: number;
    cert?: string;
    key?: string;
}
/**
 * A class representing the Application.
 * ```ts
 * const app = new Application({
 *   port: 80,
 * });
 * ```
 */
declare class Application {
    private _internals;
    /**
     * Creates an Application instance.
     * @param {ApplicationConfiguration} config
     */
    constructor(config: ApplicationConfiguration);
    /**
     * Method for registering router to the application.
     * @param {Router} feature
     * @return {Application}
     */
    use(feature: Router): Application;
    /**
     * Method for closing the running server.
     * @return {Application}
     */
    dispose(): Application;
    /**
     * Method for exposing the server property. Might be used
     * in combination with socket.io.
     * @return {http.Server | https.Server | null}
     */
    server(): http.Server | https.Server | null;
    /**
     * Method for starting the server.
     * @return {void}
     */
    listen(): void;
    /**
     * Method for adding events to the built-in events system.
     * @param {String} event
     * @param {Function<void>} handler
     */
    on(event: string, handler: () => void): void;
    /**
     * Method for dispatching an registered event.
     * @param {String} event
     */
    dispatch(event: string): void;
    /**
     * Method that is run on every request.
     * @param {http.IncomingMessage} NativeRequest
     * @param {http.ServerResponse} NativeResponse
     */
    private _listener;
    /**
     * Method for creating a http/s server based on the given configuration.
     * @param {Partial<ApplicationConfiguration>} config
     * @return {String}
     */
    private _makeServer;
    /**
     * Method that generates a routing table based on the routes registered.
     * @return {void}
     */
    private _makeRoutingtable;
    /**
     * Method that registers a handler for the SIGINT event.
     */
    private _setEvents;
}
export { Application };
