import { Sheet, Typography } from "@mui/joy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "settings - geonaut",
};

export default async function SettingsPage (): Promise<JSX.Element> {
  return (
    <Sheet className="w-screen h-screen grid place-items-center place-content-center">
      <Typography level="h1">settings coming soon!</Typography>
    </Sheet>
  );
}
