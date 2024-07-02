import { ISelfie } from "@/types";

export const selfieUrl = (selfie: Pick<ISelfie, "active_hash">, edit: boolean = false): string =>
  edit
    ? `/edit/${selfie.active_hash}`
    : `/s/${selfie.active_hash}`;
