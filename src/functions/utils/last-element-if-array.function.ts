export const lastElementIfArray = <T = any>(el: T | T[] | undefined): T | undefined =>
  Array.isArray(el) ? el[el.length - 1] : el;
