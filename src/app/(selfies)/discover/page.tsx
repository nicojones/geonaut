import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { isAuthenticated, serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "Discover - Geonaut",
  description: "Latest posts by those you're interested in",
};

const DISCOVER_USER_SELFIES_BODY: IFetchSelfieBody = { s: "discover", limit: 10, start: 0 };

function getUserSelfies (): Promise<ISelfiesData> {
  return serverFetch<ISelfiesData, IFetchSelfieBody>(
    { body: DISCOVER_USER_SELFIES_BODY },
  );
}

export default async function DiscoverPage (): Promise<JSX.Element> {
  await isAuthenticated();
  const selfiesData = await getUserSelfies();

  console.log(selfiesData);
  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={DISCOVER_USER_SELFIES_BODY}
    />
  );
}
