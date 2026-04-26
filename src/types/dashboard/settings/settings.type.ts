import { z } from "zod";

import { SettingsValidator } from "@/validators";

export type ISettings = z.infer<typeof SettingsValidator>;

/** Form-encoded POST to `/api/settings/save` (PHP expects `"0"` / `"1"` for this field). */
export type ISettingsSaveBody = Omit<ISettings, "weekly_digest_email"> & {
  weekly_digest_email: "0" | "1";
};
