"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { SCROLL_PADDING } from "@/config";
import { ComponentChildren, ISelfie, ISelfiesAsyncLoad, ISelfiesData } from "@/types";

import { SelfieCard } from "./SelfieCard";
import { ThatsAllFolks } from "./ThatsAllFolks";

interface SelfiesAsyncLoaderProps {
  fetcher?: (start: number) => Promise<ISelfiesData>;
  children?: ComponentChildren;
  start: number;
}

export const SelfiesAsyncLoader = ({ children, start, fetcher }: SelfiesAsyncLoaderProps): JSX.Element => {
  const [data, setData] = useState<ISelfiesAsyncLoad>({
    selfies: [],
    start,
    loading: false,
    more: !!fetcher,
  });

  const handleScroll = useCallback((): void => {
    if (data.loading || !data.more || !fetcher) {
      return;
    }
    const doc = window.document.documentElement;
    const documentHeightToLoad = doc.scrollHeight - doc.clientHeight - SCROLL_PADDING;
    if (window.scrollY > documentHeightToLoad) {
      const startFrom = data.start + data.selfies.length;
      setData(d => ({ ...d, start: startFrom, loading: true }));
      fetcher(startFrom)
      // fetchMoreSelfies({ selfId: user?.id, start: startFrom, limit: fetcher.limit })
        .then(r => setData(d => ({
          ...d,
          more: !!r.more,
          selfies: [...d.selfies, ...r.selfies],
          loading: false,
        })))
        .catch(e => toast.error(String(e)))
        .finally(() => setData(d => ({ ...d, loading: false })));
    }
  }, [data, fetcher]);

  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <main className="flex flex-col space-y-48" onScroll={handleScroll}>
      {children}

      {
        data.selfies.map((s: ISelfie) =>
          <SelfieCard key={s.id} selfie={s} />,
        )
      }
      <ThatsAllFolks hidden={data.more} />
    </main>
  );
};
