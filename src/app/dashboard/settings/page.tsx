import { Metadata } from "next";

import { StickyHeader } from "@/components";
import { DashboardSheet } from "@/components/generic";
import { serverFetch } from "@/functions/server";
import { IResponseData, ISettings } from "@/types";

import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: "settings - geonaut",
};

const getSettings = (): Promise<ISettings> => {
  return serverFetch<IResponseData<{ settings: ISettings; }>, any>({
    url: "/api/admin/data",
    body: { s: "settings" },
  })
    .then(r => r.settings);
};

export default async function SettingsPage (): Promise<JSX.Element> {
  const settings = await getSettings();

  return (
    <DashboardSheet>
      <StickyHeader sticky header="settings" small />
      <SettingsForm settings={settings} />
    </DashboardSheet>
  );
}
