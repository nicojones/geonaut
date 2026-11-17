import { ISelfieEdit } from "@/types";

/**
 * The POST body for publish / save-changes. `coauthors` goes as a comma-separated string (PHP explodes it);
 * it's left out when unknown, which PHP reads as "no change".
 */
export const selfieEditBody = ({ coauthors, ...selfie }: ISelfieEdit): Record<string, any> => ({
  ...selfie,
  ...(coauthors ? { coauthors: coauthors.join(",") } : {}),
});
