import { ZodIssue } from "zod";

import { RecursiveMapping, ZodErrorMapping } from "@/types";

export const createZodErrorObject = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  issues: ZodIssue[],
  errorLog: boolean = false,
): ZodErrorMapping<T> => {
  const errors: Record<string, any> = {};

  issues.forEach((i: ZodIssue) => {
    let subObject: Record<string, any> | any[];
    let subError = errors;
    i.path.forEach((key: string | number, index: number) => {
      if (typeof key === "string") {
        subObject = [];
        subError[key] = subError[key] ?? subObject;
      } else if (typeof key === "number") {
        subObject = {};
        subError[key] = subError[key] ?? subObject;
      }

      const message = index === i.path.length - 1 ? i.message : undefined;

      if (message) {
        subError[key] = message;
      } else {
        subError = subError[key];
      }
    });
  });

  if (errorLog) {
    console.error(errors);
  }

  return errors as Partial<RecursiveMapping<string, T>>;
};
