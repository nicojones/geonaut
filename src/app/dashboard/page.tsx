import { Sheet, Typography } from "@mui/joy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard - geonaut",
};

export default async function DashboardPage (): Promise<JSX.Element> {
  return (
    <Sheet className="w-screen h-screen grid place-items-center place-content-center">
      <Typography level="h1">dashboard coming soon!</Typography>
    </Sheet>
  );
}
