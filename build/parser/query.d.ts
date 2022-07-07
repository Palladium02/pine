declare type ParseResult = [string, Record<string, any>, string];
/**
 * Function that parses the query parameters of an url, returns both value
 * the url and the query parameters.
 * @param {String} url
 * @param {Boolean} typeguess
 * @return {Array<String, object>}
 */
declare const parseURL: (url: string, typeguess?: boolean) => ParseResult;
export { parseURL };
