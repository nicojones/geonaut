import { Metadata } from "next";

import { API_URL } from "@/config";
import { selfieMyImage } from "@/functions";
import { IUserData } from "@/types";

export const userMetadata = (user: IUserData): Metadata => ({
  title: user.name + " - Geonaut",
  description: user.profile,
  creator: user.username,
  openGraph: {
    type: "website",
    url: `${API_URL}/u/${user.username}`,
    title: user.name + " - Geonaut",
    description: user.profile,
    siteName: "Geonaut",
    images: [{
      url: selfieMyImage(user.avatar),
    }],
  },
  twitter: {
    title: user.name + " - Geonaut",
    description: user.profile,
    images: [{
      url: `${API_URL}${user.avatar}`,
    }],
  },
});
