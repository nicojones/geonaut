import { Sheet, Typography } from "@mui/joy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "profile - geonaut",
};

export default async function ProfilePage (): Promise<JSX.Element> {
  return (
    <Sheet className="w-screen h-screen grid place-items-center place-content-center">
      <Typography level="h1">profile coming soon!</Typography>
    </Sheet>
  );
}
