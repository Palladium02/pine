/**
 * Class representing the request body.
 */
class Body {
  private _internals: {
    body: any,
    raw: Buffer,
    type: string,
  };

  /**
   * Creates a Body instance.
   * @param {Buffer} body
   * @param {String} type
   */
  public constructor(body: Buffer, type: string) {
    this._internals = {
      body: {},
      raw: body,
      type: '',
    };
    this._determineContenttype(type);
  }

  /**
   * Method that will initially parse the raw body and return the result.
   * @return {any}
   */
  public read(): any {
    switch (this._internals.type) {
      case 'json':
        try {
          this._internals.body = JSON.parse(this._internals.raw.toString());
        } catch {
          this._internals.body = {};
        }
        return this._internals.body;
      case 'text':
        this._internals.body = this._internals.raw.toString();
        return this._internals.body;
      case 'form':
        this._internals.body = Object.entries(
            this._internals.raw.toString()
                .split('&')
                .map((pair) => pair.split('=')),
        );
        return this._internals.body;
    }
  }

  /**
   * Method that returns the parsed request body or an empty object.
   * @return {any}
   */
  public value(): any {
    return this._internals.body;
  }

  /**
   * Method that will return the raw request body.
   * @return {Buffer}
   */
  public raw(): Buffer {
    return this._internals.raw;
  }

  /**
   * Method that will returned the contenttype in a simplified form.
   * @return {String}
   */
  public type(): string {
    return this._internals.type;
  }

  /**
   * Method that determines the contenttype and returns a simplified form of it.
   * @param {String} type
   */
  private _determineContenttype(type: string) {
    switch (type) {
      case 'application/json':
        this._internals['type'] = 'json';
        break;
      case 'type/text':
        this._internals['type'] = 'text';
      case 'application/x-www-form-urlencoded':
        this._internals['type'] = 'form';
      default:
        this._internals['type'] = 'text';
    }
  }
}

export {Body};
