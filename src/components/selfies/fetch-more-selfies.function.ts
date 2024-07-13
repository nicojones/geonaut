"use server";

import { dbGetSelfies } from "@/db/db-get-selfies.query";
import { selfieResults } from "@/functions";
import { IGetSelfiesOptions, ISelfiesData } from "@/types";

export const fetchMoreSelfies = async (options: IGetSelfiesOptions): Promise<ISelfiesData> => {
  "use server";
  const results = await dbGetSelfies(options);
  return selfieResults(results, options.limit ?? 0);
};
