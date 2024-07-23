import { z } from "zod";

export const GENDER_TYPE = {
  0: "neutral",
  1: "male",
  2: "female",
} as const;

export const GenderTypeValidator = z.union([z.literal(0), z.literal(1), z.literal(2)]);
