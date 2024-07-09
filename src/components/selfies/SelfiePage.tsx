
import { StickyHeader } from "@/components/header";
import { ComponentChildren, IFetchSelfieBody, ISelfie } from "@/types";

import { SelfiesAsyncLoader } from "./SelfieAsyncLoader";
import { SelfieCard } from "./SelfieCard";

interface SelfiePageProps {
  initialSelfies: ISelfie[];
  header: ComponentChildren;
  fetcher: IFetchSelfieBody;
  /**
   * True if there are still more
   */
  more: boolean;
  /**
   * @default true
   */
  sticky?: boolean;
}

export const SelfiePage = ({ header, initialSelfies, more, fetcher, sticky = true }: SelfiePageProps): JSX.Element => {
  return (
    <div className="selfie-list">
      <SelfiesAsyncLoader fetcher={fetcher} more={more}>
        <StickyHeader sticky={sticky} header={header} />
        {
          initialSelfies.map((s: ISelfie, index: number) =>
            <SelfieCard key={s.id} selfie={s} priority={index < 3} />,
          )
        }
      </SelfiesAsyncLoader>
    </div>
  );
};
