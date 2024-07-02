export type RecursiveMapping<
  MappedType,
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  [P in keyof T]: T[P] extends any[]
    ? Array<RecursiveMapping<MappedType, T[P][0]>>
    : T[P] extends Record<string, unknown>
      ? RecursiveMapping<MappedType, T[P]>
      : MappedType;
};
