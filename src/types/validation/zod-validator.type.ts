import { ZodObject, ZodRawShape } from "zod";

export type ZodValidator<T extends ZodRawShape> = ZodObject<T>;
