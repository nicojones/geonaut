"use client";

import { useColorScheme } from "@mui/joy";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { IStorageKey } from "@/types";

export const SystemModeColorCookie = (): JSX.Element => {
  const { systemMode } = useColorScheme();

  useEffect(() => {
    Cookies.set("theme" satisfies IStorageKey, systemMode ?? "system");
    document.documentElement.className = systemMode ?? "_system_";
  }, [systemMode]);

  return <></>;
};
