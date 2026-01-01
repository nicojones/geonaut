"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { dbGetSelfieByHash } from "@/db/db-get-selfie-by-hash.query";
import { raiseOnError } from "@/functions";
import { ComponentChildren, ISelfie, ISelfiePrevNext, ISingleSelfieContex } from "@/types";

import { useJwtTokenContext } from "./jwt-token.context";
import { SingleSelfieContext } from "./single-selfie.context";

interface SingleSelfieContextWrapperProps {
  initialData: ISelfie;
  children: ComponentChildren;
}

export const SingleSelfieContextWrapper = ({ children, initialData }: SingleSelfieContextWrapperProps): JSX.Element => {
  const [selfie, setSelfie] = useState<ISelfie>(initialData);
  const { api, user } = useJwtTokenContext();
  const [prevNext, setPrevNext] = useState<ISelfiePrevNext>({ prev: null, next: null });
  const { prev, next } = prevNext;

  const selfieStore = useRef<Record<string, ISelfie>>({
    [initialData.hash]: initialData,
  });

  const handleNavigate = useCallback((hash: string): void => {
    if (selfieStore.current[hash]) {
      setSelfie(selfieStore.current[hash]);
      window.history.pushState(null, "", `/s/${hash}`);
      return;
    }
    dbGetSelfieByHash(hash, user?.id, true)
      .then(s => {
        if (s) {
          selfieStore.current[s.hash] = s;
          setSelfie(s);
          window.history.pushState(null, "", `/s/${hash}`);
        } else {
          throw new Error(`No selfie with hash ${hash}`);
        }
      });
  }, [user?.id]);

  useEffect(() => {
    const abortController = new AbortController();
    api<ISelfiePrevNext, Record<string, never>>({
      body: {},
      url: `/api/next/${selfie.hash}`,
      cacheTags: [selfie.hash],
      signal: abortController.signal,
    })
      .then(raiseOnError)
      .then(v => {
        const { prev: _prev, next: _next } = v;
        if (_prev) {
          selfieStore.current[_prev.hash] = _prev;
        }
        if (_next) {
          selfieStore.current[_next.hash] = _next;
        }
        setPrevNext({ prev: _prev, next: _next });
      });

    return () => abortController.abort();
  }, [api, selfie.hash]);

  const context: ISingleSelfieContex = useMemo(
    () => ({
      prev,
      next,
      selfie,
      loadSelfie: handleNavigate,
      _insideContext_: true,
    }),
    [prev, next, selfie, handleNavigate],
  );

  return (
    <SingleSelfieContext.Provider value={context} >
      {children}
    </SingleSelfieContext.Provider>
  );
};
