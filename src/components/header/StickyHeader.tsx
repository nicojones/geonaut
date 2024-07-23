import { Typography } from "@mui/joy";
import classNames from "classnames";

import { ComponentChildren } from "@/types";

interface StickyHeaderProps {
  sticky: boolean;

  header: ComponentChildren;

  /**
   * @default false
   * set to `true` when the page isn't a "scrolling page" so to speak
   */
  small?: boolean;

}

export const StickyHeader = ({ header, small = false, sticky }: StickyHeaderProps): JSX.Element =>
  <div
    className={classNames("top-2 w-full fric dark:text-white justify-center z-[10]", { sticky }, small ? "my-10" : "my-[25vh]")}
  >
    {
      typeof header === "string"
        ? (
          <Typography
            level="h1"
          >
            {header}
          </Typography>
        )
        : header
    }
  </div>;
