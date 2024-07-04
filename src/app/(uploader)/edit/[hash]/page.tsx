import { Sheet } from "@mui/joy";

import { EditSelfieForm } from "@/components";
import { EditSelfieContextWrapper } from "@/context";
import { serverFetch } from "@/functions/server";
import { IEditSelfieData, IResponseData, IUrlParams } from "@/types";

const getSelfieDraft = (hash: string): Promise<any> => {
  return serverFetch<IResponseData<IEditSelfieData>, any>({
    url: "/ajax/admin/data",
    body: { s: "edit", selfie: hash },
  });
};

export default async function UploadSelfiePage ({ params }: IUrlParams<"hash">): Promise<JSX.Element> {
  const data = await getSelfieDraft(params.hash);

  console.log(data.images, data.selfie);

  return (
    <Sheet className="w-screen min-h-screen flex flex-col py-24 bg-transparent">
      <EditSelfieContextWrapper initialData={data}>
        <EditSelfieForm />
      </EditSelfieContextWrapper>
    </Sheet>
  );
}
