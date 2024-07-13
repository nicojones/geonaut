// "use client";

import { Metadata } from "next";

import { SelfiePage } from "@/components";
import { dbGetUsersWithLastSelfie } from "@/db/db-get-users-with-last-selfie.query";
import { selfieResults } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { mustBeAuthenticated } from "@/functions/server/must-be-authenticated.function";
import { ISelfiesData } from "@/types";

export const metadata: Metadata = {
  title: "users - geonaut",
  description: "the latest and greatest from our users",
};

async function getLastSelfieOfUsers (start: number): Promise<ISelfiesData> {
  "use server";
  const self = await getUserFromCookie();
  const result = await dbGetUsersWithLastSelfie({ selfId: self?.id ?? 0, start, limit: 10 });
  return selfieResults(result, 10, "users");
}

export default async function UsersPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const selfiesData = await getLastSelfieOfUsers(0);

  return (
    <SelfiePage
      initialSelfies={selfiesData.selfies}
      header={selfiesData.title}
      fetcher={selfiesData.more ? getLastSelfieOfUsers : undefined}
    />
  );
}
