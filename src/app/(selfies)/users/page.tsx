// "use client";

import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "users - geonaut",
  description: "the latest and greatest from our users",
};

const HOME_USER_SELFIES_BODY: IFetchSelfieBody = { s: "users", limit: 10, start: 0 };

function getUserSelfies (): Promise<ISelfiesData> {
  return serverFetch<ISelfiesData, IFetchSelfieBody>({ body: HOME_USER_SELFIES_BODY });
}

export default async function HomepageUsers (): Promise<JSX.Element> {
  const selfiesData = await getUserSelfies();
  return (
    <SelfiePage
      more={Boolean(Number(selfiesData.more))}
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={HOME_USER_SELFIES_BODY}
    />
  );
}
