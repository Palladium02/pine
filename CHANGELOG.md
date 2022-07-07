# Changelog

## v1.0.2

- added Logger
  - supports info messages

## v1.0.1

- enhanced parsing logic for the request url
  - detect fragments like: `/path#somefragment`
  - allows for type guessing on queryparameters

### Example for type guessing
```ts
// GET /path?string=hello&int=12&bool=true

// without type guessing
parseURL("/path?string=hello&int=12&bool=true");
/*
  returns ["/path", {
    string: "hello",
    int: "12",
    bool: "true",
  }, ""]
*/

// with type guessing
parseURL("/path?string=hello&int=12&bool=true");
/*
  returns ["/path", {
    string: "hello",
    int: 12,
    bool: true,
  }, ""]
*/
``` 

## v1.0.0

- initial commits
- first complete build