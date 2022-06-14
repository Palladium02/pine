/**
 * Class representing the state for the current request.
 */
class State {
  private _state: Map<any, any>;

  /**
   * Creates a state instance.
   */
  public constructor() {
    this._state = new Map();
  }

  /**
   * Add entry to the current state.
   * @param {any} key
   * @param {any} value
   */
  public add(key: any, value: any) {
    this._state.set(key, value);
  }

  /**
   * Method for retrieving an entry from the state.
   * @param {any} key
   */
  public get(key: any) {
    this._state.get(key);
  }

  /**
   * Method for deleting an entry from the state.
   * @param {any} key
   */
  public delete(key: any) {
    this._state.delete(key);
  }
}

export {State};
