import http from 'http';
import {HttpVerb} from '../routing';

/**
 * Class representing the Response object.
 */
class Response {
  private _internals: {
    wasSend: boolean,
    header: Record<string, string>,
    status: number,
    body: any,
    NativeResponse: http.ServerResponse;
  };

  /**
   * Creates a Response instance.
   * @param {http.ServerResponse} NativeResponse
   * @param {HttpVerb} method
   */
  public constructor(NativeResponse: http.ServerResponse, method: HttpVerb) {
    this._internals = {
      NativeResponse,
      wasSend: false,
      header: {},
      status: method === 'POST' ? 201 : 200,
      body: null,
    };
  }

  public header(name: string, value: string): Response;
  public header(headers: Record<string, string>): Response;
  /**
   * Method for adding headers to the response.
   * @param {String | object} f
   * @param {String} s
   * @return {Response}
   */
  public header(f: string | {[key: string]: any}, s?: string): Response {
    if (f && s) {
      if (typeof f === 'string') {
        this._internals.header[f] = s;
      }
    } else {
      if (typeof f === 'object') {
        this._internals.header = {
          ...this._internals.header,
          ...f,
        };
      }
    }
    return this;
  }

  /**
   * Method for setting the status code.
   * @param {number} status
   */
  public status(status: number) {
    this._internals.status = status;
  }

  public body(payload: any): Response;
  public body(): any;
  /**
   * Adds response or returns the current response body.
   * @param {any} payload
   * @return {Response|any}
   */
  public body(payload?: any): Response | any {
    if (payload) {
      this._internals.body = payload;
      return this;
    }
    return this._internals.body;
  }

  /**
   * Method for sending the response. After calling the send method the
   * feature stack will be collapsed.
   */
  public send() {
    this._internals.wasSend = true;
    this._internals.NativeResponse.writeHead(
        this._internals.status,
        this._internals.header,
    );
    this._internals.NativeResponse.write(
        this._internals.body,
    );
  }

  /**
   * Method that returns a check value for wether the request was send or not.
   * @return {boolean}
   */
  public wasSend(): boolean {
    return this._internals.wasSend;
  }
}

export {Response};
