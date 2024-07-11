import { Typography } from "@mui/joy";
import { Metadata } from "next";

import { DashboardSheet } from "@/components/generic";
import { mustBeAuthenticated } from "@/functions/server";

export const metadata: Metadata = {
  title: "profile - geonaut",
};

export default async function ProfilePage (): Promise<JSX.Element> {
  await mustBeAuthenticated();

  return (
    <DashboardSheet>
      <Typography level="h1">profile coming soon!</Typography>
    </DashboardSheet>
  );
}
