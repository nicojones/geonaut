import { Skeleton, Typography } from "@mui/joy";
import Image from "next/image";

import { logoImage } from "@/assets";
import { StickyHeader } from "@/components/header";
import { SelfieCardSkeleton } from "@/components/selfies";

interface LoadingPageProps {
  /**
   * @default 3
   */
  selfies?: number;
  /**
   * @default "title"
   */
  headerType?: "title" | "user";
}

export const LoadingPage = ({ headerType = "title", selfies = 3 }: LoadingPageProps): JSX.Element => (
  <div className="selfie-list">
    {
      headerType === "title"
        ? (
          <StickyHeader
            sticky={true}
            header={<Image src={logoImage.default} width={60} height={60} alt="Logo" className="animate-pulse" />}
          />
        )
        : (
          <div className="flex flex-col space-y-4 justify-center my-48">
            <div className="fric justify-center">
              <Skeleton animation="wave" variant="text" level="h1" sx={{ width: 200 }} />
            </div>
            <div className="fric space-x-8 w-full">
              <Skeleton animation="wave" variant="circular" width={128} height={128} sx={{ flexShrink: 0 }} />
              <div className="flex flex-col space-y-4 w-full">
                <div className="fric justify-between">
                  <Skeleton animation="wave" variant="text" sx={{ width: 150 }} />
                  <Skeleton animation="wave" variant="text" sx={{ width: 150 }} />
                  <Skeleton animation="wave" variant="text" sx={{ width: 150 }} />
                </div>
                <Typography>
                  <Skeleton animation="wave" variant="text" level="body-lg" sx={{ width: "100%" }} />
                  {" "}
                  <Skeleton animation="wave" variant="text" sx={{ width: "100%" }} />
                </Typography>
              </div>
            </div>
          </div>
        )
    }

    {
      Array.from(Array(selfies).keys()).map((_, index: number) =>
        <SelfieCardSkeleton key={index} />,
      )
    }
  </div>
);
