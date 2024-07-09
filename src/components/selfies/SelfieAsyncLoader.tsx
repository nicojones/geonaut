"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { SCROLL_PADDING } from "@/config";
import { useJwtTokenContext } from "@/context";
import { raiseOnError } from "@/functions";
import { ComponentChildren, IFetchSelfieBodyGeneric, ISelfie, ISelfiesAsyncLoad, ISelfiesData } from "@/types";

import { SelfieCard } from "./SelfieCard";
import { ThatsAllFolks } from "./ThatsAllFolks";

interface SelfiesAsyncLoaderProps {
  fetcher: IFetchSelfieBodyGeneric;
  children?: ComponentChildren;
  more: boolean;
}

export const SelfiesAsyncLoader = ({ children, more, fetcher }: SelfiesAsyncLoaderProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [data, setData] = useState<ISelfiesAsyncLoad>({
    selfies: [],
    more,
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
      api<ISelfiesData, IFetchSelfieBodyGeneric>({ body: { ...fetcher, start: startFrom } })
        .then(raiseOnError)
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
