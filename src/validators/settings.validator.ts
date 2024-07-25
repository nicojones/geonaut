import { z } from "zod";

import { BellPositionValidator } from "./bell-position.validator";
import { GenderTypeValidator } from "./gender-type.validator";

export const SettingsValidator = z.object({
  bell_position: BellPositionValidator,
  email: z.string().email(),
  name: z.string().min(5),
  short_desc: z.string().min(5),
  profile_pic: z.string().min(1),
  gender: GenderTypeValidator,
  username: z.string().min(4),
  password: z.string().min(8).optional(),
  confirm: z.string().min(8).optional(),
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
