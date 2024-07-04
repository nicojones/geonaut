import { IBool, ISelfiesData } from "@/types";

export const selfieNumResults = (data: ISelfiesData | undefined): string =>
  data === undefined
    ? ""
    : numResults(data.selfies.length, data.more);

export const numResults = (results: number | undefined, hasMore: IBool = 0): string =>
  results === undefined
    ? ""
    : (
      results === 1
        ? "(1 result)"
        : `(${results}${hasMore ? "+" : ""} results)`
    );
