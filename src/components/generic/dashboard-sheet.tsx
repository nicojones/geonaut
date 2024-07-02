import { Sheet } from "@mui/joy";

import { ComponentChildren } from "@/types";

interface DashboardSheetProps {
  children: ComponentChildren;
}

export const DashboardSheet = ({ children }: DashboardSheetProps): JSX.Element =>
  <Sheet className="w-screen min-h-screen grid place-items-center place-content-center py-[var(--header-height)] gap-16">
    {children}
  </Sheet>;
