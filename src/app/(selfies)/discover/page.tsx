import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { dbGetFollowedSelfies } from "@/db/db-get-followed-selfies.query";
import { selfieResults } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { mustBeAuthenticated } from "@/functions/server/must-be-authenticated.function";
import { ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "discover - geonaut",
  description: "latest posts by those you're interested in",
};

async function getDiscoverSelfies (start: number): Promise<ISelfiesData> {
  "use server";
  const user = await getUserFromCookie();
  const result = await dbGetFollowedSelfies({ selfId: user?.id, start, limit: 10 });
  return selfieResults(result, 10, "discover");
}

export default async function DiscoverPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const selfiesData = await getDiscoverSelfies(0);

  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={selfiesData.more ? getDiscoverSelfies : undefined}
    />
  );
}
