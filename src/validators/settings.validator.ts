import { z } from "zod";

import { BellPositionValidator } from "./bell-position.validator";
import { ThemeTypeValidator } from "./theme-type.validator";

export const SettingsValidator = z.object({
  bell_position: BellPositionValidator,
  theme: ThemeTypeValidator,
  email: z.string().email(),
  name: z.string().min(5),
  username: z.string().min(4),
  password: z.string().optional(),
  confirm: z.string().optional(),
})
  .superRefine(({ confirm, password }, ctx) => {
    if (confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "the passwords do not match",
        path: ["confirm"],
      });
    }
  });
