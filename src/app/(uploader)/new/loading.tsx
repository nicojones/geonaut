import { Sheet, Typography } from "@mui/joy";

export default async function Loading (): Promise<JSX.Element> {
  return (
    <Sheet className="w-screen h-screen grid place-items-center place-content-center">
      <Typography level="h3">creating...</Typography>
    </Sheet>
  );
}
