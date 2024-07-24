import { Skeleton } from "@mui/joy";

export default async function Loading (): Promise<JSX.Element> {
  return (
    <>
      <div
        className="flex flex-col max-w-full py-[var(--header-height)] relative fill-screen"
      >
        <div className="flex flex-col mx-auto w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-300px)] space-y-2">
          <div
            role="header"
            className="flex md:flex-row md:items-center md:justify-between md:space-y-0 flex-col space-y-2 py-3"
          >
            <div className="flex flex-col space-y-4 basis-full md:basis-8/12">
              <Skeleton animation="wave" variant="text" level="h1" />
              <Skeleton animation="wave" variant="text" level="h3" />
            </div>

            <div className="flex flex-col min-w-max text-base basis-full md:basis-3/12">
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
              <Skeleton animation="wave" variant="text" />
            </div>
          </div>

          <div role="content" className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ aspectRatio: "4/3", flexBasis: "50%", borderRadius: 0 }}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ aspectRatio: "4/3", flexBasis: "50%", borderRadius: 0 }}
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ aspectRatio: "4/3", flexBasis: "50%" }}
            />
            <div className="flex flex-col space-y-4 p-2 basis-1/2">
              <Skeleton animation="wave" variant="rectangular" sx={{ height: 80 }} />
              <Skeleton animation="wave" variant="rectangular" sx={{ height: 80 }} />
              <Skeleton animation="wave" variant="rectangular" sx={{ height: 80 }} />
              <Skeleton animation="wave" variant="rectangular" sx={{ height: 80 }} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
