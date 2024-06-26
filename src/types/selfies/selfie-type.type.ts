export const SELFIE_TYPE = {
  1: "Daily",
  2: "Weekly",
  3: "Monthly",
  4: "Random",
} as const;

export type ISelfieTypeKey = keyof typeof SELFIE_TYPE;
export type ISelfieType = (typeof SELFIE_TYPE)[ISelfieTypeKey];
