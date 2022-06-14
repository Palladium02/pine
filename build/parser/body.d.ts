/// <reference types="node" />
/**
 * Class representing the request body.
 */
declare class Body {
    private _internals;
    /**
     * Creates a Body instance.
     * @param {Buffer} body
     * @param {String} type
     */
    constructor(body: Buffer, type: string);
    /**
     * Method that will initially parse the raw body and return the result.
     * @return {any}
     */
    read(): any;
    /**
     * Method that returns the parsed request body or an empty object.
     * @return {any}
     */
    value(): any;
    /**
     * Method that will return the raw request body.
     * @return {Buffer}
     */
    raw(): Buffer;
    /**
     * Method that will returned the contenttype in a simplified form.
     * @return {String}
     */
    type(): string;
    /**
     * Method that determines the contenttype and returns a simplified form of it.
     * @param {String} type
     */
    private _determineContenttype;
}
export { Body };
