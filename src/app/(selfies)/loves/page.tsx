import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { mustBeAuthenticated, serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "loves - geonaut",
  description: "posts you love",
};

const LOVES_USER_SELFIES_BODY: IFetchSelfieBody = { s: "loves", limit: 10, start: 0 };

function getUserSelfies (): Promise<ISelfiesData> {
  return serverFetch<ISelfiesData, IFetchSelfieBody>(
    { body: LOVES_USER_SELFIES_BODY },
  );
}

export default async function LovesPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const selfiesData = await getUserSelfies();

  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      more={Boolean(Number(selfiesData.more))}
      header={selfiesData.title}
      fetcher={LOVES_USER_SELFIES_BODY}
    />
  );
}
