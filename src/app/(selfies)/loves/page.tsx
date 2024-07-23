import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { dbGetLovedSelfies } from "@/db/db-get-loved-selfies.query";
import { selfieResults } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { mustBeAuthenticated } from "@/functions/server/must-be-authenticated.function";
import { ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "loves - geonaut",
  description: "posts you love",
};

async function getLovedSelfies (start: number): Promise<ISelfiesData> {
  "use server";
  const user = await getUserFromCookie();
  const result = await dbGetLovedSelfies({ selfId: user?.id, start, limit: 10 });
  return selfieResults(result, 10, "loved");
}

export default async function LovesPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const selfiesData = await getLovedSelfies(0);

  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={selfiesData.more ? getLovedSelfies : undefined}
    />
  );
}
