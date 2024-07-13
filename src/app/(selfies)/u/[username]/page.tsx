import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SelfiePage, UserPageHeader } from "@/components";
import { dbGetSelfies, dbGetUserIdFromUsername, dbGetUserInfo } from "@/db";
import { selfieResults, toQuery, userMetadata } from "@/functions";
import { getUserFromCookie } from "@/functions/server/get-user-from-cookie.function";
import { ISelfiesData, IUrlParams, IUserData } from "@/types";

async function getUserInfo (userId: number): Promise<IUserData> {
  const self = await getUserFromCookie();
  return await dbGetUserInfo(self?.id ?? 0, userId);
}

export async function generateMetadata (
  { params }: IUrlParams<"username">,
): Promise<Metadata> {
  const userId = await dbGetUserIdFromUsername(params.username);
  const userInfo = await getUserInfo(userId);
  return userMetadata(userInfo);
}

async function getUserSelfies (selfId: number, userId: number, start: number): Promise<ISelfiesData> {
  "use server";
  return await dbGetSelfies({ selfId, userId, start, limit: 10 })
    .then(r => selfieResults(r, 10));
}

export default async function UserPage ({ params }: IUrlParams<"username">): Promise<JSX.Element> {
  const userId = await dbGetUserIdFromUsername(params.username)
    .catch(() => redirect("/user-not-found" + toQuery({ username: params.username })));
  const self = await getUserFromCookie();
  const getUserSelfiesWithUserId = getUserSelfies.bind(null, self?.id ?? 0, userId);
  const userSelfies = await getUserSelfiesWithUserId(0);
  const userData = await getUserInfo(userId);

  return (
    <>
      <SelfiePage
        fetcher={userSelfies.more ? getUserSelfiesWithUserId : undefined}
        initialSelfies={userSelfies.selfies}
        header={<UserPageHeader user={userData} />}
        sticky={false}
      />
    </>
  );
}
