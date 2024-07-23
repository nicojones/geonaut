import { IMuiThemeType, IThemeType } from "@/types";

export const schemeFromTheme = (theme: IThemeType): IMuiThemeType =>
  theme === 1 ? "light" : "dark";
