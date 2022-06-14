import http from 'http';
import {Body} from '../parser';

/**
 * Class representing the current request.
 */
class Request {
  private _internals: {
    headers: http.IncomingHttpHeaders,
    body: Body,
    params: Record<string, string>,
    query: Record<string, string>,
    cookies: Record<string, string>,
    url: string,
  };

  /**
   * Creates an Request instance.
   * @param {http.IncomingHttpHeaders} headers
   * @param {Buffer} body
   * @param {Record<string, string>} params
   * @param {Record<string, string>} query
   * @param {any} cookies
   * @param {String} url
   */
  public constructor(
      headers: http.IncomingHttpHeaders,
      body: Buffer,
      params: Record<string, string>,
      query: Record<string, string>,
      cookies: any,
      url: string,
  ) {
    this._internals = {
      headers,
      params,
      query,
      cookies,
      url,
      body: new Body(body, headers['content-type'] || ''),
    };
  }

  public header(): any;
  public header(key: string): string;
  /**
   * Method to retrieve the request headers or a single one.
   * @param {string} key
   * @return {any}
   */
  public header(key?: string): any {
    if (key) return this._internals.headers[key];
    return this._internals.headers;
  }

  /**
   * Method that returns a Body instance containing the request body.
   * @return {Body}
   */
  public body(): Body {
    return this._internals.body;
  }

  public params(): Record<string, string>;
  public params(key: string): string;
  /**
   * Method to retrieve the url parameter or a single one.
   * @param {String} key
   * @return {any}
   */
  public params(key?: string): any {
    if (key) return this._internals.params[key];
    return this._internals.params;
  }

  public query(): Record<string, string>;
  public query(key: string): string;
  /**
   * Method to retrieve the query parameter or a single one.
   * @param {String} key
   * @return {any}
   */
  public query(key?: string) {
    if (key) return this._internals.query[key];
    return this._internals.query;
  }

  public cookies(): Record<string, string>;
  public cookies(key: string): string;
  /**
   * Method to retrieve the request cookies.
   * @param {String} key
   * @return {any}
   */
  public cookies(key?: string) {
    if (key) return this._internals.cookies[key];
    return this._internals.cookies;
  }

  /**
   * Method that returns the request url.
   * @return {String}
   */
  public url(): string {
    return this._internals.url;
  }
}

export {Request};
