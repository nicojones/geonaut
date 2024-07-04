import { Metadata } from "next";

import { selfieMyImage } from "@/functions";
import { IUserData } from "@/types";

export const userMetadata = (user: IUserData): Metadata => ({
  title: user.name + " - Geonaut",
  description: user.profile,
  creator: user.username,
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_API_URL as string}/u/${user.username}`,
    title: user.name + " - Geonaut",
    description: user.profile,
    siteName: "Geonaut",
    images: [{
      // TODO -- will not work for users with a default picture
      url: selfieMyImage({ hash: user.avatar }),
    }],
  },
  twitter: {
    title: user.name + " - Geonaut",
    description: user.profile,
    images: [{
      url: `${process.env.NEXT_PUBLIC_API_URL as string}${user.avatar}`,
    }],
  },
});
