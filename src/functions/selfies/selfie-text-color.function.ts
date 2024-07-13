
import { COLORS } from "@/config";
import { ISelfie } from "@/types";

export const selfieTextColor = (selfie: ISelfie, type: "me" | "lc" = "me"): string =>
  ((type === "me" ? selfie.me_brightness : selfie.lc_brightness) < 120) ? COLORS.whiteText : COLORS.darkText;
