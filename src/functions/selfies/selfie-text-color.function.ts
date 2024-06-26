
import { COLORS } from "@/config";
import { ISelfie } from "@/types";

export const selfieTextColor = (selfie: ISelfie): string =>
  (selfie.me_brightness < 120) ? COLORS.whiteText : COLORS.darkText;
