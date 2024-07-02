import { Typography } from "@mui/joy";
import { Metadata } from "next";

import { DashboardSheet } from "@/components/generic";

export const metadata: Metadata = {
  title: "profile - geonaut",
};

export default async function ProfilePage (): Promise<JSX.Element> {
  return (
    <DashboardSheet>
      <Typography level="h1">profile coming soon!</Typography>
    </DashboardSheet>
  );
}
