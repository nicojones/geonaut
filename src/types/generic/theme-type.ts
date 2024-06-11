export const THEME_TYPE = {
  1: "light",
  2: "dark"
} as const;

export type IThemeType = keyof typeof THEME_TYPE
export type IThemeName = (typeof THEME_TYPE)[IThemeType];
