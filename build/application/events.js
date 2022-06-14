"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
/**
 * Class representing the event system.
 */
class Events {
    constructor() {
        this._subscribers = new Map();
    }
    /**
     * Method for adding an event handler.
     * @param {String} event
     * @param {Function<void>} handler
     */
    on(event, handler) {
        this._subscribers.set(event, handler);
    }
    /**
     * Method for dispatching the given event.
     * @param {String} event
     * @return {void}
     */
    dispatch(event) {
        const handler = this._subscribers.get(event);
        if (handler) {
            handler();
        }
        return;
    }
}
exports.Events = Events;
