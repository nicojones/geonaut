"use client";

import { useCallback, useEffect, useState } from "react";

import { SCROLL_PADDING } from "@/config";
import { useJwtTokenContext } from "@/context";
import { gFetch } from "@/functions";
import { ComponentChildren, IFetchSelfieBody, ISelfie, ISelfiesAsyncLoad, ISelfiesData } from "@/types";

import { SelfieCard } from "./selfie-card.component";

interface SelfiesAsyncLoaderProps {
  fetcher: IFetchSelfieBody;
  children: ComponentChildren;
}

export const SelfiesAsyncLoader = ({ children, fetcher }: SelfiesAsyncLoaderProps): JSX.Element => {
  const { jwt } = useJwtTokenContext();
  const [data, setData] = useState<ISelfiesAsyncLoad>({
    selfies: [],
    more: true,
    start: (fetcher.start ?? 0),
    loading: false,
  });

  const handleScroll = useCallback((): void => {
    if (data.loading || !data.more) {
      return;
    }
    const doc = window.document.documentElement;
    const documentHeightToLoad = doc.scrollHeight - doc.clientHeight - SCROLL_PADDING;
    if (window.scrollY > documentHeightToLoad) {
      const startFrom = data.start + (fetcher.limit ?? 0);
      setData(d => ({ ...d, start: startFrom, loading: true }));
      gFetch<ISelfiesData, IFetchSelfieBody>({ body: { ...fetcher, start: startFrom } }, jwt)
        .then(r => setData(d => ({ ...d, more: !!r.more, selfies: [...d.selfies, ...r.selfies], loading: false })))
        .catch(e => alert(String(e)))
        .finally(() => setData(d => ({ ...d, loading: false })));
    }
    console.log(window.scrollY);
  }, [data, fetcher, jwt]);

  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <main className="flex flex-col space-y-10" onScroll={handleScroll}>
      {children}

      {
        data.selfies.map((s: ISelfie) =>
          <SelfieCard key={s.id} selfie={s} />,
        )
      }
    </main>
  );
};
