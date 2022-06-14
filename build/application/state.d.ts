/**
 * Class representing the state for the current request.
 */
declare class State {
    private _state;
    /**
     * Creates a state instance.
     */
    constructor();
    /**
     * Add entry to the current state.
     * @param {any} key
     * @param {any} value
     */
    add(key: any, value: any): void;
    /**
     * Method for retrieving an entry from the state.
     * @param {any} key
     */
    get(key: any): void;
    /**
     * Method for deleting an entry from the state.
     * @param {any} key
     */
    delete(key: any): void;
}
export { State };
