
import { redirect } from "next/navigation";

import { serverFetch } from "@/functions/server";
import { IResponseData, IResponseRedirect } from "@/types";

const getSelfieDraft = (): Promise<IResponseData<IResponseRedirect>> => {
  return serverFetch<IResponseData<IResponseRedirect>, any>({
    url: "/ajax/admin/data",
    body: { s: "new", ajax: 1 },
  });
};

export default async function NewUploadPage (): Promise<JSX.Element> {
  const result = await getSelfieDraft();
  redirect(result.redirect);
}
