// "use client";

import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "Latest - Geonaut",
  description: "The latest and greatest posts on the platform",
};

const HOME_SELFIES_BODY: IFetchSelfieBody = { s: "home", limit: 10, start: 0 };

async function getHomeSelfies (): Promise<ISelfiesData> {
  return await serverFetch<ISelfiesData, IFetchSelfieBody>(
    { body: HOME_SELFIES_BODY },
  );
}

export default async function HomePage (): Promise<JSX.Element> {
  const selfiesData = await getHomeSelfies();
  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header="geonaut"
      fetcher={HOME_SELFIES_BODY}
    />
  );
}
