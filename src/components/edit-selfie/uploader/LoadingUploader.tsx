import { Sheet, Skeleton } from "@mui/joy";

export const LoadingUploader = (): JSX.Element => {
  return (
    <Sheet className="w-screen flex flex-col justify-center py-24 bg-transparent space-y-24">
      <div className="md:w-[90vw] mx-auto lg:w-[60vw] fric space-x-4">
        <div className="relative basis-1/2">
          <Skeleton animation="wave" variant="rectangular" sx={{ width: "100%", aspectRatio: "4/3" }} />
        </div>
        <div className="relative basis-1/2">
          <Skeleton animation="wave" variant="rectangular" sx={{ width: "100%", aspectRatio: "4/3" }} />
        </div>
      </div>
      <br />
      <Skeleton animation="wave" variant="text" level="h3" sx={{ width: "400px", mx: "auto" }} />
    </Sheet>
  );
};
