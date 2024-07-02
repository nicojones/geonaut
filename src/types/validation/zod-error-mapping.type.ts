import { RecursiveMapping } from "types";

export type ZodErrorMapping<
  T extends Record<string, unknown> = Record<string, unknown>,
> = Partial<RecursiveMapping<string, T>> & { $hasErrors?: boolean; };
