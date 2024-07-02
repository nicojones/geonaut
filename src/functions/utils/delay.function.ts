/**
 * A predefined setTimeout with a syntactic sugar name.
 * @param timeout 200ms
 */
export const delay = (
  callback: (...any: any[]) => any,
  timeout: number = 200,
): NodeJS.Timeout | number =>
  setTimeout(callback, timeout);
