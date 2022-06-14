import { Context } from '../context';
declare type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * A class representing a routingtable.
 */
declare class Table {
    private _table;
    /**
     * Creates a Table instance.
     * @param {object} param0
     */
    addRoute({ route, method, handler, features }: {
        route: string;
        method: HttpVerb;
        handler: (context: Context) => Promise<void>;
        features: ((context: Context) => Promise<void>)[];
    }): void;
    /**
     * Method that searches the routingtable and makes routing decisions based on
     * given route parameter.
     * @param {String} route
     * @param {HttpVerb} method
     * @return {Route | null}
     */
    getMatch(route: string, method: HttpVerb): {
        parameter: {
            [key: string]: string;
        };
        handler: (context: Context) => Promise<void>;
        features: ((context: Context) => Promise<void>)[] | undefined;
    } | null;
    /**
     * Method that splits an url into its parts.
     * @param {String} route
     * @return {Array<String>}
     */
    private _getParts;
}
export { Table, HttpVerb };
