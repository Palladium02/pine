"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/**
 * Class representing the state for the current request.
 */
class State {
    /**
     * Creates a state instance.
     */
    constructor() {
        this._state = new Map();
    }
    /**
     * Add entry to the current state.
     * @param {any} key
     * @param {any} value
     */
    add(key, value) {
        this._state.set(key, value);
    }
    /**
     * Method for retrieving an entry from the state.
     * @param {any} key
     */
    get(key) {
        this._state.get(key);
    }
    /**
     * Method for deleting an entry from the state.
     * @param {any} key
     */
    delete(key) {
        this._state.delete(key);
    }
}
exports.State = State;
