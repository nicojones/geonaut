import { z } from "zod";

export const THEME_TYPE = {
  1: "light",
  2: "dark",
} as const;

export const ThemeTypeValidator = z.union([z.literal(1), z.literal(2)]);
