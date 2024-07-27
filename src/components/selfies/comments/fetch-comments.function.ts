"use server";

import { serverFetch } from "@/functions/server/server-fetch.function";
import { ISelfieComment } from "@/types";

export const fetchComments = (hash: string): Promise<ISelfieComment[]> => {
  "use server";
  return serverFetch<{ comments: ISelfieComment[]; }, any>({
    url: "/api/comments/get",
    body: { selfie: hash },
    cacheTags: ["comments", hash],
  })
    .then(r => {
      const reversedComments = r.comments;
      reversedComments.reverse();
      return reversedComments;
    });
};
