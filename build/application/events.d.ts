/**
 * Class representing the event system.
 */
declare class Events {
    private _subscribers;
    /**
     * Method for adding an event handler.
     * @param {String} event
     * @param {Function<void>} handler
     */
    on(event: string, handler: (data?: any) => void): void;
    /**
     * Method for dispatching the given event.
     * @param {String} event
     * @return {void}
     */
    dispatch(event: string): void;
}
export { Events };
