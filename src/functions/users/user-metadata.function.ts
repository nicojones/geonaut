import { Metadata } from "next";

import { IUserData } from "@/types";

export const userMetadata = (user: IUserData): Metadata => ({
  title: user.name + " - geonaut",
  description: user.profile,
  creator: user.username,
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/u/${user.username}`,
    title: user.name + " - geonaut",
    description: user.profile,
    siteName: "geonaut",
    images: [{
      // TODO -- will not work for users with a default picture
      url: `${process.env.NEXT_PUBLIC_RESOURCE_URL as string}/${user.avatar}`,
    }],
  },
  twitter: {
    title: user.name + " - geonaut",
    description: user.profile,
    images: [{
      url: `${process.env.NEXT_PUBLIC_API_URL as string}${user.avatar}`,
    }],
  },
});
