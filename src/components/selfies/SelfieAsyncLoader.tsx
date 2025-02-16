"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { SCROLL_PADDING } from "@/config";
import { ComponentChildren, ISelfie, ISelfieFetcher, ISelfiesAsyncLoad } from "@/types";

import { SelfieCard } from "./SelfieCard";
import { ThatsAllFolks } from "./ThatsAllFolks";

interface SelfiesAsyncLoaderProps {
  fetcher?: ISelfieFetcher;
  children?: ComponentChildren;
  skip: number;
}

export const SelfiesAsyncLoader = ({ children, skip: initialSkip, fetcher }: SelfiesAsyncLoaderProps): JSX.Element => {
  const [data, setData] = useState<ISelfiesAsyncLoad>({
    selfies: [],
    skip: initialSkip,
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
      console.log("GETTING MORE ELEMENTS", data.skip);
      setData(d => ({ ...d, loading: true }));
      fetcher(data.skip)
        .then(r => setData(d => ({
          ...d,
          more: !!r.more,
          skip: data.skip + r.selfies.length,
          selfies: [...d.selfies, ...r.selfies],
          loading: false,
        })))
        .catch(e => {
          setData(d => ({ ...d, loading: false }));
          toast.error(String(e));
        });
    }
  }, [data.loading, data.skip, data.more, fetcher]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const delayHandleScroll = (): void => {
      clearTimeout(timeout)
      timeout = setTimeout(handleScroll, 300);
    };

    // Add event listener on component mount
    window.addEventListener("scroll", delayHandleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", delayHandleScroll);
      clearTimeout(timeout);
    };
  }, [handleScroll]);

  return (
    <main className="flex flex-col space-y-48" onScroll={handleScroll}>
      <div className="fixed top-36 left-1/3 bg-pink-500 z-50">async length: {data.selfies.length}, start from: {data.skip}, loaded: {data.selfies.length + initialSkip}</div>
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
