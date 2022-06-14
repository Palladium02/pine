import {Context} from '../context';

interface Layering {
  [key: string]: Layer,
}

interface Layer {
  handler?: (context: Context) => Promise<void>,
  features?: ((context: Context) => Promise<void>)[],
  children: Layering
}

type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * A class representing a routingtable.
 */
class Table {
  private _table: {[key: string]: Layering} = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
  };

  /**
   * Creates a Table instance.
   * @param {object} param0
   */
  public addRoute({route, method, handler, features}: {
    route: string,
    method: HttpVerb,
    handler: (context: Context) => Promise<void>,
    features: ((context: Context) => Promise<void>)[],
  }): void {
    const parts = [...this._getParts(route)];
    let current = this._table[method]!;
    let last: string = '';
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          children: {},
        };
      }
      last = part;
      if (index !== parts.length - 1) {
        current = current[part].children!;
      } else {
        current[last].handler = handler;
        current[last].features = features;
      }
    });
  }

  /**
   * Method that searches the routingtable and makes routing decisions based on
   * given route parameter.
   * @param {String} route
   * @param {HttpVerb} method
   * @return {Route | null}
   */
  public getMatch(route: string, method: HttpVerb) {
    const parts = this._getParts(route);
    let current = this._table[method]!;
    let last = '';
    const parameter: { [key: string]: string } = {};
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      last = part;
      if (current[part]) {
        if (i < parts.length - 1) {
          current = current[part].children!;
        }
      } else {
        const suspects = Object.keys(current);
        const parameterized = new RegExp(/\/\:[a-zA-Z]+/gm);
        let match = false;
        for (let j = 0; j < suspects.length; j++) {
          const suspect = suspects[j];
          last = suspect;
          if (parameterized.test(suspect)) {
            const key = suspect.split(':')[1];
            parameter[key] = part.split('/')[1];
            if (i < parts.length - 1) {
              current = current[suspect].children!;
            }
            match = true;
            break;
          }
        }
        if (!match) {
          return null;
        }
      }
    }
    return {
      parameter,
      handler: current[last].handler!,
      features: current[last].features,
    };
  }

  /**
   * Method that splits an url into its parts.
   * @param {String} route
   * @return {Array<String>}
   */
  private _getParts(route: string): string[] {
    const parts: string[] = [];
    let current = '';
    const characters = route.split('');
    for (let i = 0; i < characters.length; i++) {
      current += characters[i];
      if (characters[i + 1] && characters[i + 1] === '/') {
        parts.push(current);
        current = '';
      }
    }
    if (current !== '') parts.push(current);
    return parts;
  }
}

export {Table, HttpVerb};
