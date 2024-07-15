import { Metadata } from "next";

import { StickyHeader } from "@/components";
import { DashboardSheet } from "@/components/generic";
import { mustBeAuthenticated } from "@/functions/server/must-be-authenticated.function";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IResponseData, ISettings } from "@/types";

import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: "settings - geonaut",
};

const getSettings = (): Promise<ISettings> => {
  return serverFetch<IResponseData<{ settings: ISettings; }>, any>({
    url: "/api/admin/data",
    body: { s: "settings" },
    cacheTags: ["__settings__"],
  })
    .then(r => r.settings);
};

export default async function SettingsPage (): Promise<JSX.Element> {
  await mustBeAuthenticated();
  const settings = await getSettings();

  return (
    <DashboardSheet>
      <StickyHeader sticky header="settings" small />
      <SettingsForm settings={settings} />
    </DashboardSheet>
  );
}
