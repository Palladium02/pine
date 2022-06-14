import {Context} from '../context';
import {HttpVerb} from './table';

interface Route {
  route: string,
  handler: (context: Context) => Promise<void>,
  features: ((context: Context) => Promise<void>)[],
  method: HttpVerb,
}

/**
 * Class representing a router.
 */
class Router {
  private _prefix: string;
  private _routes: Route[];
  private _features: ((context: Context) => Promise<void>)[];

  /**
   * Creates a router instance.
   * @param {String} prefix
   */
  public constructor(prefix?: string) {
    this._prefix = (prefix !== undefined) ? prefix : '';
    this._routes = [];
    this._features = [];
  }

  /**
   * Method for adding a router handler for GET requests.
   * @param {String} route
   * @param {Function<void>} handler
   * @return {Router}
   */
  public get(
      route: string,
      handler: (context: Context) => Promise<void>,
  ): Router {
    this._routes.push({
      handler,
      route: this._prefix + route,
      features: [...this._features],
      method: 'GET',
    });
    return this;
  }

  /**
   * Method for adding a router handler for POST requests.
   * @param {String} route
   * @param {Function<void>} handler
   * @return {Router}
   */
  public post(
      route: string,
      handler: (context: Context) => Promise<void>,
  ): Router {
    this._routes.push({
      handler,
      route: this._prefix + route,
      features: [...this._features],
      method: 'POST',
    });
    return this;
  }

  /**
   * Method for adding a router handler for PUT requests.
   * @param {String} route
   * @param {Function<void>} handler
   * @return {Router}
   */
  public put(
      route: string,
      handler: (context: Context) => Promise<void>,
  ): Router {
    this._routes.push({
      handler,
      route: this._prefix + route,
      features: [...this._features],
      method: 'PUT',
    });
    return this;
  }

  /**
   * Method for adding a router handler for DELETE requests.
   * @param {String} route
   * @param {Function<void>} handler
   * @return {Router}
   */
  public delete(
      route: string,
      handler: (context: Context) => Promise<void>,
  ): Router {
    this._routes.push({
      handler,
      route: this._prefix + route,
      features: [...this._features],
      method: 'DELETE',
    });
    return this;
  }

  /**
   * Method for adding a router handler for PATCH requests.
   * @param {String} route
   * @param {Function<void>} handler
   * @return {Router}
   */
  public patch(
      route: string,
      handler: (context: Context) => Promise<void>,
  ): Router {
    this._routes.push({
      handler,
      route: this._prefix + route,
      features: [...this._features],
      method: 'PATCH',
    });
    return this;
  }

  public use(feature: (context: Context) => void): Router;
  public use(features: ((context: Context) => void)[]): Router;
  /**
   * Method for adding features to a route or the whole router.
   * @param {Function<void>|Array<Function<void>>} feature
   * @return {Router}
   */
  public use(feature: any) {
    if (this._routes.length === 0) {
      this._features.push(feature);
      return this;
    } else {
      if (Array.isArray(feature)) {
        this._routes[this._routes.length - 1]
            .features
            .push(...feature);
      } else {
        this._routes[this._routes.length - 1]
            .features
            .push(feature);
      }
    }
    return this;
  }

  /**
   * Method that returns the currently added routes.
   * @return {Array<Route>}
   */
  public routes(): Route[] {
    return this._routes;
  }
}

export {Router, Route};

