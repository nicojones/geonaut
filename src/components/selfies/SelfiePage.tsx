
import { StickyHeader } from "@/components/header";
import { ISelfie, ISelfieFetcher } from "@/types";

import { SelfiesAsyncLoader } from "./SelfieAsyncLoader";
import { SelfieCard } from "./SelfieCard";

interface SelfiePageProps {
  initialSelfies: ISelfie[];
  header: JSX.Element | string | undefined;
  fetcher?: ISelfieFetcher;
  /**
   * @default true
   */
  sticky?: boolean;
}

export const SelfiePage = ({ header, initialSelfies, fetcher, sticky = true }: SelfiePageProps): JSX.Element => {
  return (
    <div className="selfie-list">
      <SelfiesAsyncLoader fetcher={fetcher} skip={initialSelfies.length}>
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
