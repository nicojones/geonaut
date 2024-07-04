export const numResults = (results: number | undefined): string =>
  results === undefined
    ? ""
    : (

      results === 1
        ? "(1 result)"
        : `(${results} results)`
    );
