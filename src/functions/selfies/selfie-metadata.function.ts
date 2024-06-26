import { Metadata } from "next";

import { ISelfie } from "@/types";

import { selfieCpImage } from "./selfie-image.function";

export const selfieMetadata = (selfie: ISelfie): Metadata => ({
  title: selfie.title + " - Geonaut",
  description: selfie.short_desc,
  creator: selfie.name,
  openGraph: {
    type: "website",
    url: `https://travel.kupfer.es/s/${selfie.hash}`,
    title: selfie.title,
    description: selfie.short_desc,
    siteName: "Geonaut",
    images: [{
      url: selfieCpImage(selfie.hash),
    }],
  },
  twitter: {
    title: selfie.title,
    description: selfie.short_desc,
    images: [{
      url: selfieCpImage(selfie.hash),
    }],
  },
});
