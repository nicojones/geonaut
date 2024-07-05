import classNames from "classnames";

import { IMapPin, ISelfie } from "@/types";

import { selfieLcImage, selfieMyImage } from "./selfie-image.function";
import { selfieUrl } from "./selfie-url.function";

interface ISelfiePinOptions {
  /**
   * @default undefined
   */
  url?: "edit" | "view";
  /**
   * Show the `me` image
   * @default true
   */
  me?: boolean;
  /**
   * Show the `lc` image
   * @default true
   */
  lc?: boolean;
  /**
   * @default false
   * Force refreshin the images
   */
  force?: boolean;

}

export const selfiePin = (
  selfie: Pick<ISelfie, "active_hash" | "hash" | "lat" | "lng">,
  options: ISelfiePinOptions = {},
): IMapPin => {
  options.lc = options.lc ?? true;
  options.me = options.me ?? true;
  options.url = options.url ?? undefined;

  const ts = options.force ? `?t=${+(new Date())}` : "";
  let element = "<div class='empty-div'>";
  element += `<a href="${selfieUrl(selfie.active_hash, options.url)}"`;

  if (options.me && options.lc) {
    element += ` class="${classNames("rounded-pin-double", { openable: !!options.url })}" >`;
    // We have both images
    element += (`
      <span class="rounded-pin-double-one"><img src="${selfieMyImage(selfie, true) + ts}"/></span>
      <span class="rounded-pin-double-two"><img src="${selfieLcImage(selfie, true) + ts}"/></span>
    `);
    element += "</a>";
  } else {
    element += ` class="${classNames("rounded-pin", { openable: !!options.url })}"`;

    if (options.me) {
      // We only have the ME image
      element += ` style="background-image: url('${selfieMyImage(selfie, true) + ts}')" ></a>`;
    } else if (options.lc) {
      // We only have the LC image
      element += ` style="background-image: url('${selfieLcImage(selfie, true) + ts}')" ></a>`;
    } else {
      element += ">(none)</a>";
    }
  }

  element += "</div>";

  return {
    lat: selfie.lat,
    lng: selfie.lng,
    icon: element,
  };
};
