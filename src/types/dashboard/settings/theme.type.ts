import { z } from "zod";

import { ThemeTypeValidator } from "@/validators";

export type IThemeType = z.infer<typeof ThemeTypeValidator>;
