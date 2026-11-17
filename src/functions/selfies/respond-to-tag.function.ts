import { purgeCache } from "@/functions/server/purge-cache.function";
import { raiseOnError } from "@/functions/utils";
import { IJwtContext, IResponseData, ISelfieAuthorStatus } from "@/types";

export type ITagDecision = "approve" | "decline";

/**
 * The tagged user approves or declines being a co-author of a selfie. PHP checks they have a pending tag.
 */
export const respondToTag = async (
  api: IJwtContext["api"],
  hash: string,
  decision: ITagDecision,
): Promise<IResponseData<{ status: ISelfieAuthorStatus; }>> =>
  await api<{ status: ISelfieAuthorStatus; }, any>({
    url: "/api/selfie/authors/respond",
    body: { hash, decision },
  })
    .then(raiseOnError)
    .then(r => {
      void purgeCache([hash]);
      return r;
    });
