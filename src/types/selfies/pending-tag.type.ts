import { ISelfie } from "@/types";

/**
 * A selfie someone tagged the current user in, waiting for an answer (PHP `api/selfie/authors/pending`)
 */
export type IPendingTag = Pick<ISelfie,
"id" | "hash" | "active_hash" | "title" | "short_desc" | "selfie_date" | "selfie_place" | "added_on" |
"me_color" | "lc_color" | "me_brightness" | "lc_brightness" | "user_id" | "username" | "name"
> & {
  tagged_on: string;
  invited_by_username: string;
  invited_by_name: string;
};
