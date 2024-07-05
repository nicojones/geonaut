import { Sheet } from "@mui/joy";

import { ComponentChildren } from "@/types";

interface DashboardSheetProps {
  children: ComponentChildren;
}

export const DashboardSheet = ({ children }: DashboardSheetProps): JSX.Element =>
  <Sheet
    sx={{
      marginX: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      paddingY: "var(--header-height)",
      position: "relative",
      width: {
        lg: 1000,
        md: "88vw",
        xs: "92vw",
      },
      my: 8,
      "& > :not([hidden]) ~ :not([hidden])": {
        marginTop: 24,
      },
    }}
  >
    {children}
  </Sheet>;
