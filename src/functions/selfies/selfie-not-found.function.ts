import { ISelfie } from "@/types";

// @ts-expect-error no errors because SelfieCard is disabled.
export const selfieNotFound = (selfie: Pick<ISelfie, "hash"> & Partial<ISelfie>): ISelfie => ({
  hash: selfie.hash,
  active_hash: selfie.hash,
  title: selfie.title ?? "(Not found!)",
  short_desc: `(There is no selfie with hash ${selfie.hash})`,
  id: selfie.id ?? -1,
  username: "(none)",
  selfie_place: "(nowhere)",
  lat: 0,
  lng: 0,
  long_desc: "",
  added_on: (new Date(0)).toISOString(),
  aago: 0,
  ago: 0,
  edited_on: "",
  lc_brightness: 255,
  love: 0,
  loves: 0,
  me_brightness: 255,
  possessive: "",
  selfie_date: "(never)",
});
