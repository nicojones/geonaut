import { ZodErrorMapping } from "@/types";

export interface ZodValidationResult<
  T extends Record<string, any> = Record<string, any>,
> {
  success: boolean;
  errors: ZodErrorMapping<T>;
  message?: string;
}
