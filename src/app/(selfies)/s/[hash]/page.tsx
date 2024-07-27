import { Metadata } from "next";

import { SingleSelfie } from "@/components/selfies/one";
import { SingleSelfieContextWrapper } from "@/context/SingleSelfieContextWrapper";
import { dbGetSelfieByHash } from "@/db/db-get-selfie-by-hash.query";
import { selfieMetadata, selfieNotFound } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { ISelfie, ISelfieData, IUrlParams } from "@/types";

export async function generateMetadata (
  { params }: IUrlParams<"hash">,
): Promise<Metadata> {
  const selfie = (await getSelfie(params.hash)).selfie;
  if (selfie) {
    return selfieMetadata(selfie);
  } else {
    return {};
  }
}

const getSelfie = async (hash: string): Promise<ISelfieData<ISelfie | null>> => {
  const user = await getUserFromCookie();
  return await dbGetSelfieByHash(hash, user?.id, true)
    .then(s => ({ title: s?.title ?? "not found", selfie: s }));
};

export default async function SingleSelfiePage ({ params }: IUrlParams<"hash">): Promise<JSX.Element> {
  let selfie = (await getSelfie(params.hash)).selfie;
  const selfieExists = !!selfie;

  if (!selfie || !selfieExists) {
    selfie = selfieNotFound({ hash: params.hash });
  }

  return (
    <SingleSelfieContextWrapper initialData={selfie}>
      <SingleSelfie exists={selfieExists} />
    </SingleSelfieContextWrapper>
  );
}
