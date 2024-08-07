import { Metadata } from "next";

import { ISelfie } from "@/types";

import { selfieCpImage } from "./selfie-image.function";

export const selfieMetadata = (selfie: ISelfie): Metadata => ({
  title: selfie.title + " - geonaut",
  description: selfie.short_desc,
  creator: selfie.name,
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/s/${selfie.active_hash}`,
    title: selfie.title,
    description: selfie.short_desc,
    siteName: "geonaut",
    images: [{
      url: selfieCpImage(selfie),
    }],
  },
  twitter: {
    title: selfie.title,
    description: selfie.short_desc,
    images: [{
      url: selfieCpImage(selfie),
    }],
  },
  other: {
    "theme-color": `rgb(${selfie.me_color})`,
  },
});
