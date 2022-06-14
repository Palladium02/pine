"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
/**
 * Class representing a router.
 */
class Router {
    /**
     * Creates a router instance.
     * @param {String} prefix
     */
    constructor(prefix) {
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
    get(route, handler) {
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
    post(route, handler) {
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
    put(route, handler) {
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
    delete(route, handler) {
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
    patch(route, handler) {
        this._routes.push({
            handler,
            route: this._prefix + route,
            features: [...this._features],
            method: 'PATCH',
        });
        return this;
    }
    /**
     * Method for adding features to a route or the whole router.
     * @param {Function<void>|Array<Function<void>>} feature
     * @return {Router}
     */
    use(feature) {
        if (this._routes.length === 0) {
            this._features.push(feature);
            return this;
        }
        else {
            if (Array.isArray(feature)) {
                this._routes[this._routes.length - 1]
                    .features
                    .push(...feature);
            }
            else {
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
    routes() {
        return this._routes;
    }
}
exports.Router = Router;
