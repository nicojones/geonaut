// "use client";

import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { dbGetSelfies } from "@/db/db-get-selfies.query";
import { selfieResults } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "latest - geonaut",
  description: "the latest and greatest posts on the platform",
};

async function getHomeSelfies (start: number): Promise<ISelfiesData> {
  "use server";
  const user = await getUserFromCookie();
  const result = await dbGetSelfies({ selfId: user?.id, start, limit: 10 });
  return selfieResults(result, 10);
}

export default async function HomePage (): Promise<JSX.Element> {
  const selfiesData = await getHomeSelfies(0);
  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header="geonaut"
      fetcher={selfiesData.more ? getHomeSelfies : undefined}
    />
  );
}
