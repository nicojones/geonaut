import { z } from "zod";

import { SettingsValidator } from "@/validators";

export type ISettings = z.infer<typeof SettingsValidator>;
