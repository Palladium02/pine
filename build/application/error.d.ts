/**
 * The parent class for all HttpExceptions.
 */
declare class HttpException {
    private _internals;
    /**
     * Creates a HttpException instance.
     * @param {any} message
     * @param {number} status
     */
    constructor(message: any, status: number);
    /**
     * Getter for the status property.
     * @return {number}
     */
    getStatus(): number;
    /**
     * Getter for the message property.
     * @return {any}
     */
    getMessage(): any;
}
/**
 * Class for the HttpForbidden error.
 */
declare class HttpForbidden extends HttpException {
    /**
     * Creates HttpForbidden instance.
     * @param {any} message
     */
    constructor(message: any);
}
/**
 * Class for the HttpBadRequest error.
 */
declare class HttpBadRequest extends HttpException {
    /**
     * Creates HttpBadRequest instance.
     * @param {any} message
     */
    constructor(message: any);
}
/**
 * Class for the HttpUnauthorized error.
 */
declare class HttpUnauthorized extends HttpException {
    /**
     * Creates HttpUnauthorized instance.
     * @param {any} message
     */
    constructor(message: any);
}
export { HttpException, HttpForbidden, HttpBadRequest, HttpUnauthorized };
