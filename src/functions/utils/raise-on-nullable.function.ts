export const raiseOnNullable = <
  T = unknown,
>(r: T, message: string = `truthy value expected! received ${String(r)}`): NonNullable<T> => {
  if (!r) {
    throw new Error(message);
  }
  return r;
};
