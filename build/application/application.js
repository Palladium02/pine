"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const context_1 = require("../context");
const routing_1 = require("../routing");
const parser_1 = require("../parser");
const _1 = require("./");
/**
 * A class representing the Application.
 * ```ts
 * const app = new Application({
 *   port: 80,
 * });
 * ```
 */
class Application {
    /**
     * Creates an Application instance.
     * @param {ApplicationConfiguration} config
     */
    constructor(config) {
        this._internals = {
            server: null,
            router: [],
            table: new routing_1.Table(),
            subscriber: new _1.Events(),
            port: undefined,
            type: '',
        };
        this._internals.port = config.port;
        this._makeServer(config);
        this._setEvents();
    }
    /**
     * Method for registering router to the application.
     * @param {Router} feature
     * @return {Application}
     */
    use(feature) {
        if (feature instanceof routing_1.Router) {
            this._internals.router.push(feature);
        }
        return this;
    }
    /**
     * Method for closing the running server.
     * @return {Application}
     */
    dispose() {
        var _a;
        this._internals.subscriber.dispatch('shutdown');
        (_a = this._internals.server) === null || _a === void 0 ? void 0 : _a.close();
        return this;
    }
    /**
     * Method for exposing the server property. Might be used
     * in combination with socket.io.
     * @return {http.Server | https.Server | null}
     */
    server() {
        return this._internals.server;
    }
    /**
     * Method for starting the server.
     * @return {void}
     */
    listen() {
        var _a, _b;
        this._makeRoutingtable();
        this._internals.subscriber.dispatch('booted');
        if (this._internals.type === 'http') {
            (_a = this._internals.server) === null || _a === void 0 ? void 0 : _a.listen(this._internals.port ? this._internals.port : 80);
        }
        else {
            (_b = this._internals.server) === null || _b === void 0 ? void 0 : _b.listen(this._internals.port ? this._internals.port : 443);
        }
        this._internals.subscriber.dispatch('ready');
    }
    /**
     * Method for adding events to the built-in events system.
     * @param {String} event
     * @param {Function<void>} handler
     */
    on(event, handler) {
        this._internals.subscriber.on(event, handler);
    }
    /**
     * Method for dispatching an registered event.
     * @param {String} event
     */
    dispatch(event) {
        this._internals.subscriber.dispatch(event);
    }
    /**
     * Method that is run on every request.
     * @param {http.IncomingMessage} NativeRequest
     * @param {http.ServerResponse} NativeResponse
     */
    _listener(NativeRequest, NativeResponse) {
        const body = [];
        NativeRequest
            .on('data', (data) => {
            body.push(...data);
        })
            .on('end', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const method = (((_a = NativeRequest.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || 'GET');
            const [url, query, fragment] = (0, parser_1.parseURL)(NativeRequest.url || '');
            const match = this._internals.table.getMatch(url, method);
            if (match) {
                const { handler, parameter, features } = match;
                const request = new context_1.Request(NativeRequest.headers, Buffer.from(body), parameter, query, {}, url, fragment);
                const response = new context_1.Response(NativeResponse, method);
                const state = new _1.State();
                const context = new context_1.Context(request, response, NativeRequest, NativeResponse, state, this);
                try {
                    for (let i = 0; i < features.length; i++) {
                        yield features[i](context);
                        if (response.wasSend()) {
                            return;
                        }
                    }
                    yield handler(context);
                    NativeResponse.end();
                }
                catch (exception) {
                    if (exception instanceof _1.HttpException) {
                        response.status(exception.getStatus());
                        response.body(exception.getMessage());
                        response.send();
                        NativeResponse.end();
                    }
                    else {
                        throw exception;
                    }
                }
            }
            else {
                NativeResponse.writeHead(404);
                NativeResponse.write('Requested route was not found.');
                NativeResponse.end();
            }
        }));
    }
    /**
     * Method for creating a http/s server based on the given configuration.
     * @param {Partial<ApplicationConfiguration>} config
     * @return {String}
     */
    _makeServer(config) {
        if (config.cert && config.key) {
            this._internals.server = https_1.default.createServer({
                key: config.key,
                cert: config.cert,
            }, (NativeRequest, NativeResponse) => {
                this._listener(NativeRequest, NativeResponse);
            });
            return 'https';
        }
        else {
            this._internals.server = http_1.default.createServer((NativeRequest, NativeResponse) => {
                this._listener(NativeRequest, NativeResponse);
            });
            return 'http';
        }
    }
    /**
     * Method that generates a routing table based on the routes registered.
     * @return {void}
     */
    _makeRoutingtable() {
        this._internals.subscriber.dispatch('setup');
        this._internals.router.forEach((router) => {
            router.routes().forEach(({ route, method, handler, features, }) => {
                this._internals.table.addRoute({
                    route,
                    method,
                    handler,
                    features,
                });
            });
        });
    }
    /**
     * Method that registers a handler for the SIGINT event.
     */
    _setEvents() {
        process.on('SIGINT', () => {
            this._internals.subscriber.dispatch('shutdown');
            process.exit(0);
        });
    }
}
exports.Application = Application;
