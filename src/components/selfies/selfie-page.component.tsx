import { Typography } from "@mui/joy";
import classNames from "classnames";

import { ComponentChildren, IFetchSelfieBody, ISelfie } from "@/types";

import { SelfiesAsyncLoader } from "./selfie-async-loader.component";
import { SelfieCard } from "./selfie-card.component";

interface SelfiePageProps {
  initialSelfies: ISelfie[];
  header: ComponentChildren;
  fetcher: IFetchSelfieBody;
  /**
   * @default true
   */
  sticky?: boolean;
}

export const SelfiePage = ({ header, initialSelfies, fetcher, sticky = true }: SelfiePageProps): JSX.Element => {
  return (
    <div className="mx-auto w-11/12 sm:w-10/12 md:w-8/12 flex flex-col space-y-16 mb-16">
      <SelfiesAsyncLoader fetcher={fetcher}>
        <div
          className={classNames("top-2 my-[35vh] w-full fric justify-center z-[10]", { sticky })}
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
        </div>
        {
          initialSelfies.map((s: ISelfie) =>
            <SelfieCard key={s.id} selfie={s} />,
          )
        }
      </SelfiesAsyncLoader>
    </div>
  );
};
