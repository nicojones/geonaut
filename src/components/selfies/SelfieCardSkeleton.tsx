import { AspectRatio, Skeleton } from "@mui/joy";
import classNames from "classnames";

import { IClassName } from "@/types";

interface SelfieCardSkeletonProps extends IClassName {

}

export const SelfieCardSkeleton = ({ className = "" }: SelfieCardSkeletonProps): JSX.Element => {
  return (
    <div
      className={classNames("flex flex-col max-w-full border border-solid", className)}
    >
      <div
        role="header"
        className="flex flex-col md:flex-row md:space-y-0 sm:space-x-0 md:space-x-4 md:fric space-y-2 justify-between p-4"
      >
        <div className="flex flex-col md:grow">
          <Skeleton
            animation="wave"
            variant="text"
            level="h1"
            sx={{ width: "100%" }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            level="h2"
            sx={{ width: "100%" }}
          />
        </div>
        <div className="flex flex-col w-72">
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
          <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
        </div>
      </div>

      <div role="content" className="flex flex-col md:flex-row relative md:justify-between">
        <AspectRatio ratio="4/3" sx={{ width: "49%" }}>
          <Skeleton animation="wave" sx={{ width: "100%" }} />
        </AspectRatio>
        <AspectRatio ratio="4/3" sx={{ width: "49%" }}>
          <Skeleton animation="wave" sx={{ width: "100%" }} />
        </AspectRatio>
      </div>

    </div>
  );
};
