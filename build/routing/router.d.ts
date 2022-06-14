import { Context } from '../context';
import { HttpVerb } from './table';
interface Route {
    route: string;
    handler: (context: Context) => Promise<void>;
    features: ((context: Context) => Promise<void>)[];
    method: HttpVerb;
}
/**
 * Class representing a router.
 */
declare class Router {
    private _prefix;
    private _routes;
    private _features;
    /**
     * Creates a router instance.
     * @param {String} prefix
     */
    constructor(prefix?: string);
    /**
     * Method for adding a router handler for GET requests.
     * @param {String} route
     * @param {Function<void>} handler
     * @return {Router}
     */
    get(route: string, handler: (context: Context) => Promise<void>): Router;
    /**
     * Method for adding a router handler for POST requests.
     * @param {String} route
     * @param {Function<void>} handler
     * @return {Router}
     */
    post(route: string, handler: (context: Context) => Promise<void>): Router;
    /**
     * Method for adding a router handler for PUT requests.
     * @param {String} route
     * @param {Function<void>} handler
     * @return {Router}
     */
    put(route: string, handler: (context: Context) => Promise<void>): Router;
    /**
     * Method for adding a router handler for DELETE requests.
     * @param {String} route
     * @param {Function<void>} handler
     * @return {Router}
     */
    delete(route: string, handler: (context: Context) => Promise<void>): Router;
    /**
     * Method for adding a router handler for PATCH requests.
     * @param {String} route
     * @param {Function<void>} handler
     * @return {Router}
     */
    patch(route: string, handler: (context: Context) => Promise<void>): Router;
    use(feature: (context: Context) => void): Router;
    use(features: ((context: Context) => void)[]): Router;
    /**
     * Method that returns the currently added routes.
     * @return {Array<Route>}
     */
    routes(): Route[];
}
export { Router, Route };
