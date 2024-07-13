
import { redirect } from "next/navigation";

import { mustBeAuthenticated } from "@/functions/server/must-be-authenticated.function";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IResponseData, IResponseRedirect } from "@/types";

const getSelfieDraft = (): Promise<IResponseData<IResponseRedirect>> => {
  return serverFetch<IResponseData<IResponseRedirect>, any>({
    url: "/api/admin/data",
    body: { s: "new", ajax: 1 },
  });
};

export default async function NewUploadPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const result = await getSelfieDraft();
  redirect(result.redirect);
}
