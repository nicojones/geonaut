import { Sheet } from "@mui/joy";

import { EditSelfieForm } from "@/components";
import { EditSelfieContextWrapper } from "@/context";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IEditSelfieData, IResponseData, IUrlParams } from "@/types";

const getSelfieDraft = (hash: string): Promise<any> => {
  return serverFetch<IResponseData<IEditSelfieData>, any>({
    url: "/api/admin/data",
    body: { s: "edit", selfie: hash },
    cacheTags: [hash],
  });
};

export default async function UploadSelfiePage ({ params }: IUrlParams<"hash">): Promise<JSX.Element> {
  const data = await getSelfieDraft(params.hash);

  return (
    <Sheet className="w-screen fill-screen flex flex-col py-24 bg-transparent">
      <EditSelfieContextWrapper initialData={data}>
        <EditSelfieForm />
      </EditSelfieContextWrapper>
    </Sheet>
  );
}
