import http from 'http';
import {Application, State} from '../application';
import {Request, Response} from './';

/**
 * Class representing the current context.
 */
class Context {
  public request: Request;
  public response: Response;
  public NativeRequest: http.IncomingMessage;
  public NativeResponse: http.ServerResponse;
  public state: State;
  public app: Application;

  /**
   * Creates a Context instance.
   * @param {Request} request
   * @param {Response} response
   * @param {http.IncomingMessage} NativeRequest
   * @param {http.ServerResponse} NativeResponse
   * @param {State} state
   * @param {Application} app
   */
  public constructor(
      request: Request,
      response: Response,
      NativeRequest: http.IncomingMessage,
      NativeResponse: http.ServerResponse,
      state: State,
      app: Application,
  ) {
    this.request = request;
    this.response = response;
    this.NativeRequest = NativeRequest;
    this.NativeResponse = NativeResponse;
    this.state = state;
    this.app = app;
  }
}

export {Context};
