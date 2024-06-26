import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { isAuthenticated, serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "Loves - Geonaut",
  description: "Posts you love",
};

const LOVES_USER_SELFIES_BODY: IFetchSelfieBody = { s: "loves", limit: 10, start: 0 };

function getUserSelfies (): Promise<ISelfiesData> {
  return serverFetch<ISelfiesData, IFetchSelfieBody>(
    { body: LOVES_USER_SELFIES_BODY },
  );
}

export default async function LovesPage (): Promise<JSX.Element> {
  await isAuthenticated();
  const selfiesData = await getUserSelfies();

  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={LOVES_USER_SELFIES_BODY}
    />
  );
}
