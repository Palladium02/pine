import http from 'http';
import https from 'https';
import {Context, Request, Response} from '../context';
import {Router, Table, HttpVerb} from '../routing';
import {querystring} from '../parser';
import {State, HttpException, Events} from './';

interface ApplicationConfiguration {
  port?: number,
  cert?: string,
  key?: string,
}

/**
 * A class representing the Application.
 * ```ts
 * const app = new Application({
 *   port: 80,
 * });
 * ```
 */
class Application {
  private _internals: {
    server: http.Server | https.Server | null,
    router: Router[],
    table: Table,
    subscriber: Events,
    port?: number,
    type: string,
  } = {
      server: null,
      router: [],
      table: new Table(),
      subscriber: new Events(),
      port: undefined,
      type: '',
    };

  /**
   * Creates an Application instance.
   * @param {ApplicationConfiguration} config
   */
  public constructor(config: ApplicationConfiguration) {
    this._internals.port = config.port;
    this._makeServer(config);
    this._setEvents();
  }

  /**
   * Method for registering router to the application.
   * @param {Router} feature
   * @return {Application}
   */
  public use(feature: Router): Application {
    if (feature instanceof Router) {
      this._internals.router.push(feature);
    }
    return this;
  }

  /**
   * Method for closing the running server.
   * @return {Application}
   */
  public dispose(): Application {
    this._internals.subscriber.dispatch('shutdown');
    this._internals.server?.close();
    return this;
  }

  /**
   * Method for exposing the server property. Might be used
   * in combination with socket.io.
   * @return {http.Server | https.Server | null}
   */
  public server(): http.Server | https.Server | null {
    return this._internals.server;
  }

  /**
   * Method for starting the server.
   * @return {void}
   */
  public listen(): void {
    this._makeRoutingtable();
    this._internals.subscriber.dispatch('booted');
    if (this._internals.type === 'http') {
      this._internals.server?.listen(
        this._internals.port ? this._internals.port : 80,
      );
    } else {
      this._internals.server?.listen(
        this._internals.port ? this._internals.port : 443,
      );
    }
    this._internals.subscriber.dispatch('ready');
  }

  /**
   * Method for adding events to the built-in events system.
   * @param {String} event
   * @param {Function<void>} handler
   */
  public on(event: string, handler: () => void) {
    this._internals.subscriber.on(event, handler);
  }

  /**
   * Method for dispatching an registered event.
   * @param {String} event
   */
  public dispatch(event: string) {
    this._internals.subscriber.dispatch(event);
  }

  /**
   * Method that is run on every request.
   * @param {http.IncomingMessage} NativeRequest
   * @param {http.ServerResponse} NativeResponse
   */
  private _listener(
      NativeRequest: http.IncomingMessage,
      NativeResponse: http.ServerResponse,
  ) {
    const body: number[] = [];

    NativeRequest
        .on('data', (data) => {
          body.push(...data);
        })
        .on('end', async () => {
          const method = (
            NativeRequest.method?.toUpperCase() || 'GET'
          ) as HttpVerb;
          const [url, query] = querystring(NativeRequest.url || '');
          const match = this._internals.table.getMatch(url, method);

          if (match) {
            const {handler, parameter, features} = match;
            const request = new Request(
                NativeRequest.headers, Buffer.from(body),
                parameter, query,
                {}, url,
            );
            const response = new Response(NativeResponse, method);
            const state = new State();
            const context = new Context(
                request, response,
                NativeRequest, NativeResponse,
                state, this,
            );

            try {
              for (let i = 0; i < features!.length; i++) {
                await features![i](context);
                if (response.wasSend()) {
                  return;
                }
              }
              await handler(context);
              NativeResponse.end();
            } catch (exception) {
              if (exception instanceof HttpException) {
                response.status(exception.getStatus());
                response.body(exception.getMessage());
                response.send();
                NativeResponse.end();
              } else {
                throw exception;
              }
            }
          } else {
            NativeResponse.writeHead(404);
            NativeResponse.write('Requested route was not found.');
            NativeResponse.end();
          }
        });
  }

  /**
   * Method for creating a http/s server based on the given configuration.
   * @param {Partial<ApplicationConfiguration>} config
   * @return {String}
   */
  private _makeServer(
      config: Partial<ApplicationConfiguration>,
  ): 'http' | 'https' {
    if (config.cert && config.key) {
      this._internals.server = https.createServer({
        key: config.key,
        cert: config.cert,
      }, (NativeRequest, NativeResponse) => {
        this._listener(NativeRequest, NativeResponse);
      });
      return 'https';
    } else {
      this._internals.server = http.createServer(
          (
              NativeRequest: http.IncomingMessage,
              NativeResponse: http.ServerResponse,
          ) => {
            this._listener(NativeRequest, NativeResponse);
          },
      );
      return 'http';
    }
  }

  /**
   * Method that generates a routing table based on the routes registered.
   * @return {void}
   */
  private _makeRoutingtable(): void {
    this._internals.subscriber.dispatch('setup');
    this._internals.router.forEach((router) => {
      router.routes().forEach(({
        route,
        method,
        handler,
        features,
      }) => {
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
  private _setEvents() {
    process.on('SIGINT', () => {
      this._internals.subscriber.dispatch('shutdown');
      process.exit(0);
    });
  }
}

export {Application};
