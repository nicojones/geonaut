import { toast } from "sonner";

import { purgeCache } from "@/functions/server/purge-cache.function";
import { raiseOnError } from "@/functions/utils";
import { IJwtContext, ISelfie } from "@/types";

/**
 * A co-author removes themselves from a selfie. The post stays on the creator's profile.
 */
export const leaveSelfie = (api: IJwtContext["api"], selfie: Pick<ISelfie, "hash" | "title">, onSuccess: () => any): void => {
  if (!confirm(`Remove yourself from "${selfie.title}"? It will disappear from your profile and you can't be tagged on it again.`)) {
    return;
  }
  const promise = api<Record<string, never>, any>({
    url: "/api/selfie/authors/leave",
    body: { hash: selfie.hash },
  })
    .then(raiseOnError)
    .then(r => {
      void purgeCache([selfie.hash]);
      return r;
    });
  toast.promise(promise, {
    success: r => {
      onSuccess();
      return r.message;
    },
    error: e => String(e),
  });
};
