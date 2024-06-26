"use client";

import extendTheme from "@mui/joy/styles/extendTheme";

export const GEO_THEME = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        text: {
          primary: "red",
          secondary: "blue",
        },
        mode: "dark",
      },
    },
    light: {
      palette: {
        text: {
          primary: "orange",
          secondary: "green",
        },
        mode: "light",
      },
    },
  },
});
