/**
 * Class representing the event system.
 */
class Events {
  private _subscribers: Map<string, (data?: any) => void> = new Map();

  /**
   * Method for adding an event handler.
   * @param {String} event
   * @param {Function<void>} handler
   */
  public on(event: string, handler: (data?: any) => void) {
    this._subscribers.set(event, handler);
  }

  /**
   * Method for dispatching the given event.
   * @param {String} event
   * @return {void}
   */
  public dispatch(event: string): void {
    const handler = this._subscribers.get(event);
    if (handler) {
      handler();
    }
    return;
  }
}

export {Events};
