import { Sheet, Typography } from "@mui/joy";

import { IUrlParams } from "@/types";

export default async function UploadSelfiePage ({ params }: IUrlParams<"hash">): Promise<JSX.Element> {
  // const result = await getSelfieDraft();

  return (
    <Sheet className="w-screen h-screen grid place-items-center place-content-center">
      <Typography level="h1">edit selfie {params.hash} coming soon!</Typography>
    </Sheet>
  );
}
