export const randomId = (prefix: string = ""): string => {
  const id = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return `${prefix}${id()}-${id()}`;
};
