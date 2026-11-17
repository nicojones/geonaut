"use server";
import { selfieEditBody } from "@/functions/selfies/selfie-edit-body.function";
import { purgeCache } from "@/functions/server/purge-cache.function";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IResponseData, IResponseRedirect, ISelfieEdit } from "@/types";

export const publishSelfie = async (selfie: ISelfieEdit): Promise<IResponseData<IResponseRedirect>> => {
  return await serverFetch<IResponseRedirect, any>({
    url: "/api/selfie/publish",
    body: selfieEditBody(selfie),
  })
    .then(r => {
      purgeCache([selfie.hash]);
      return r;
    });
};
