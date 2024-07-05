
import { Skeleton } from "@mui/joy";

import { SelfieCardSkeleton } from "@/components";
import { DashboardSheet } from "@/components/generic";

export default async function Loading (): Promise<JSX.Element> {
  return (
    <DashboardSheet>
      <Skeleton animation="wave" variant="text" level="h1" sx={{ width: "100%" }} />
      <SelfieCardSkeleton />
    </DashboardSheet>
  );
}
