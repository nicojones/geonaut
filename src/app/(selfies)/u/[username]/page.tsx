import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SelfiePage, UserPageHeader } from "@/components";
import { toQuery, userMetadata } from "@/functions";
import { serverFetch } from "@/functions/server";
import { IFetchSelfieBody, ISelfiesWithUserData, IUrlParams } from "@/types";

const USER_SELFIES_PAGE_BODY_DEFAULT: IFetchSelfieBody = { s: "user", limit: 10, start: 0 };

export async function generateMetadata (
  { params }: IUrlParams<"username">,
): Promise<Metadata> {
  const user = (await getUserSelfies({
    ...USER_SELFIES_PAGE_BODY_DEFAULT,
    info: 1,
    username: params.username,
  })).user;
  return userMetadata(user);
}

async function getUserSelfies (body: IFetchSelfieBody): Promise<ISelfiesWithUserData> {
  return await serverFetch<ISelfiesWithUserData, IFetchSelfieBody>({ body })
    .catch(() => redirect("/user-not-found" + toQuery({ username: body.username })));
}

export default async function UserPage ({ params }: IUrlParams<"username">): Promise<JSX.Element> {
  const USER_SELFIES_PAGE_BODY: IFetchSelfieBody = { ...USER_SELFIES_PAGE_BODY_DEFAULT, username: params.username };
  const userSelfies = await getUserSelfies({ ...USER_SELFIES_PAGE_BODY, info: 1 });

  return (
    <>
      <SelfiePage
        fetcher={USER_SELFIES_PAGE_BODY}
        more={Boolean(Number(userSelfies.more))}
        initialSelfies={userSelfies.selfies}
        header={<UserPageHeader user={userSelfies.user} />}
        sticky={false}
      />
    </>
  );
}
