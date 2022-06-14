/**
 * Function that parses the query parameters of an url, returns both value
 * the url and the query parameters.
 * @param {String} url
 * @return {Array<String, object>}
 */
const querystring = (url: string) => {
  const [_, query] = url.split('?');
  if (!query) return [_, ''];
  return [_, Object.fromEntries(
      query.split('&').map((pair) => pair.split('=')),
  )];
};

export {querystring};