import { RecursiveMapping } from "./recursive-mapping.type";

export type ZodErrorMapping<
  T extends Record<string, unknown> = Record<string, unknown>,
> = Partial<RecursiveMapping<string, T>> & { $hasErrors?: boolean; };
