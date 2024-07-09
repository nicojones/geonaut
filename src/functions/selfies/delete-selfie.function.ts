import { toast } from "sonner";

import { raiseOnError } from "@/functions/utils";
import { IJwtContext, IResponseRedirect, ISelfie } from "@/types";

export const deleteSelfie = (api: IJwtContext["api"], selfie: Pick<ISelfie, "hash" | "name">, onSuccess: (r: IResponseRedirect) => any): void => {
  if (prompt("Type delete to continue")?.toLowerCase() === "delete") {
    const promise = api<IResponseRedirect, any>({
      method: "DELETE",
      url: `/ajax/selfie/delete/${selfie.hash}`,
    })
      .then(raiseOnError);
    toast.promise(promise, {
      success: r => {
        onSuccess(r);
        return `${selfie.name} Deleted!`;
      },
      error: (e) => {
        console.error(e);
        return String(e);
      },
    });
  }
};
