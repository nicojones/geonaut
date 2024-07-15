"use server";
import { purgeCache } from "@/functions/server/purge-cache.function";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IResponseData, IResponseRedirect, ISelfieEdit } from "@/types";

export const saveEditSelfie = async (selfie: ISelfieEdit): Promise<IResponseData<IResponseRedirect>> => {
  return await serverFetch<IResponseRedirect, any>({
    url: "/api/selfie/save-edit",
    body: selfie,
  })
    .then(r => {
      purgeCache([selfie.hash]);
      return r;
    });
};
