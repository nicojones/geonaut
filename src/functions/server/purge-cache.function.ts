"use server";

import { revalidateTag } from "next/cache";

export const purgeCache = async (tags: string[]): Promise<void> => {
  "use server";
  tags.forEach(t => revalidateTag(t));
};
