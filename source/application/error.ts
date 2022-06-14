/**
 * The parent class for all HttpExceptions.
 */
class HttpException {
  private _internals: {
    message: any,
    status: number,
  };

  /**
   * Creates a HttpException instance.
   * @param {any} message
   * @param {number} status
   */
  public constructor(message: any, status: number) {
    this._internals = {
      message,
      status,
    };
  }

  /**
   * Getter for the status property.
   * @return {number}
   */
  public getStatus(): number {
    return this._internals.status;
  }

  /**
   * Getter for the message property.
   * @return {any}
   */
  public getMessage(): any {
    return this._internals.message;
  }
}

/**
 * Class for the HttpForbidden error.
 */
class HttpForbidden extends HttpException {
  /**
   * Creates HttpForbidden instance.
   * @param {any} message
   */
  public constructor(message: any) {
    super(message, 403);
  }
}

/**
 * Class for the HttpBadRequest error.
 */
class HttpBadRequest extends HttpException {
  /**
   * Creates HttpBadRequest instance.
   * @param {any} message
   */
  public constructor(message: any) {
    super(message, 400);
  }
}

/**
 * Class for the HttpUnauthorized error.
 */
class HttpUnauthorized extends HttpException {
  /**
   * Creates HttpUnauthorized instance.
   * @param {any} message
   */
  public constructor(message: any) {
    super(message, 401);
  }
}

export {HttpException, HttpForbidden, HttpBadRequest, HttpUnauthorized};
