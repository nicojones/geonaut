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
      paddingY: "var(--header-height)",
      width: {
        lg: 1000,
        md: "88vw",
        xs: "92vw",
      },
    }}
    className="space-y-16 my-8"
  >
    {children}
  </Sheet>;
