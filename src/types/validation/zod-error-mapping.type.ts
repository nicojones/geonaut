import { RecursiveMapping } from "./recursive-mapping.type";

export type ZodErrorMapping<
  T extends Record<string, any> = Record<string, any>,
> = Partial<RecursiveMapping<string, T>> & { $hasErrors?: boolean; };
