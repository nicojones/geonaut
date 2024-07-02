import classNames from "classnames";

import { IMapPin, ISelfie } from "@/types";

import { selfieLcImage, selfieMyImage } from "./selfie-image.function";
import { selfieUrl } from "./selfie-url.function";

interface ISelfiePinOptions {
  /**
   * @default false
   */
  withUrl?: boolean;
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

}

export const selfiePin = (
  selfie: Pick<ISelfie, "active_hash" | "hash" | "lat" | "lng">,
  options: ISelfiePinOptions = {},
): IMapPin => {
  options.lc = options.lc ?? true;
  options.me = options.me ?? true;
  options.withUrl = options.withUrl ?? true;


  let element = "<div class='empty-div'>";
  element += `<a href="${options.withUrl ? selfieUrl(selfie, true) : "#"}"`;

  if (options.me && options.lc) {
    element += ` class="${classNames("rounded-pin-double", { openable: options.withUrl })}" >`;
    // We have both images
    element += (`
      <span class="rounded-pin-double-one"><img src="${selfieMyImage(selfie, true)}"/></span>
      <span class="rounded-pin-double-two"><img src="${selfieLcImage(selfie, true)}"/></span>
    `);
    element += "</a>";
  } else {
    element += ` class="${classNames("rounded-pin", { openable: options.withUrl })}"`;

    if (options.me) {
      // We only have the ME image
      element += ` style="background-image: url('${selfieMyImage(selfie, true)}')" ></a>`;
    } else if (options.lc) {
      // We only have the LC image
      element += ` style="background-image: url('${selfieLcImage(selfie, true)}')" ></a>`;
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
