
import { redirect } from "next/navigation";

import { serverFetch } from "@/functions/server";
import { INewSelfieResponse, IResponseData } from "@/types";

const getSelfieDraft = (): Promise<IResponseData<INewSelfieResponse>> => {
  return serverFetch<IResponseData<INewSelfieResponse>, any>({
    url: "/ajax/admin/data",
    body: { s: "new", ajax: 1 },
  });
};

export default async function NewUploadPage (): Promise<JSX.Element> {
  const result = await getSelfieDraft();
  redirect(result.redirect);
}
