import { ISelfiesData } from "@/types";

export const selfieNumResults = (data: ISelfiesData | undefined): string =>
  data === undefined
    ? ""
    : numResults(data.selfies.length, Boolean(data.more));

export const numResults = (results: number | undefined, hasMore: boolean = false): string =>
  results === undefined
    ? ""
    : (
      results === 1
        ? "(1 result)"
        : `(${results}${hasMore ? "+" : ""} results)`
    );
