"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getUserFromJwt, gFetch } from "@/functions";
import { ComponentChildren, IFetch, IJwtContext, IJwtContextAuthedOrAnonymous, IStorageKey, IUserSettings } from "@/types";

import { JwtTokenContext } from "./jwt-token.context";

interface JwtTokenContextWrapperProps {
  children: ComponentChildren;
  contextData: IJwtContextAuthedOrAnonymous;
}

export const JwtTokenContextWrapper = ({ children, contextData }: JwtTokenContextWrapperProps): JSX.Element => {
  const jwtCookie = Cookies.get("token" satisfies IStorageKey) ?? null;
  const [jwt, setJwt] = useState<string | null>(contextData.jwt);
  const [user, setUser] = useState<IUserSettings | null>(contextData.user);
  const router = useRouter();

  const handleUpdateUser = useCallback((_jwt: string | null, force: boolean = false): void => {
    if (force || (!user && _jwt)) {
      setUser(getUserFromJwt(_jwt));
    } else if (user && !_jwt) {
      setUser(null);
    }
  }, [user]);

  const handleSetJwt = useCallback((_jwt: string | null): void => {
    if (_jwt) {
      Cookies.set("token" satisfies IStorageKey, _jwt);
    } else {
      Cookies.remove("token" satisfies IStorageKey);
    }
    setJwt(_jwt);
    handleUpdateUser(_jwt, true);
  }, [handleUpdateUser]);

  const getApiFactory = useCallback(<
    T extends Record<string, any> = Record<string, any>,
    Body extends Record<string, any> | never = never,
  >(body: IFetch<Body>) =>
    gFetch<T, Body>(body, jwt)
      .catch(e => {
        if (e === "Unauthorized") {
          router.push("/auth/logout");
        }
      }),
  [jwt],
  );

  const contextValue = useMemo<IJwtContext>(
    () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- types are correct
      return ({
        jwt,
        setJwt: handleSetJwt,
        setUser,
        user,
        api: getApiFactory,
        isAuthed: !!user,
        isAdmin: user?.id === 1,
        _insideContext_: true,
      } as IJwtContext);
    },
    [jwt, user, getApiFactory, handleSetJwt],
  );

  useEffect(() => {
    handleUpdateUser(jwtCookie);
    // We don't want to act when the user changes, only when the cookie value changes
  }, [jwtCookie]);

  return (
    <JwtTokenContext.Provider value={contextValue}>
      {children}
    </JwtTokenContext.Provider>
  );
};
