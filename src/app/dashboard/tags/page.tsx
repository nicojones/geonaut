import { Typography } from "@mui/joy";
import { Metadata } from "next";

import { DashboardSheet } from "@/components/generic";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { IPendingTag } from "@/types";

import { PendingTagCard } from "./PendingTagCard";

export const metadata: Metadata = {
  title: "were you there? - geonaut",
};

const getPendingTags = (): Promise<{ tags: IPendingTag[]; }> =>
  serverFetch<{ tags: IPendingTag[]; }, any>({
    url: "/api/selfie/authors/pending",
    method: "POST",
    cache: "no-store",
  });

export default async function PendingTagsPage (): Promise<JSX.Element> {
  const { tags } = await getPendingTags();

  return (
    <DashboardSheet>
      <div className="flex flex-col space-y-2">
        <Typography level="h1" sx={{ width: "100%", textAlign: "center" }}>
          were you there?
        </Typography>
        <Typography level="body-md" sx={{ textAlign: "center", opacity: 0.7 }}>
          if you say yes, the post shows on your profile too and you can edit it.
        </Typography>
      </div>
      <div className="flex flex-col space-y-10">
        {
          tags.length
            ? tags.map(t => <PendingTagCard key={t.id} tag={t} />)
            : <p className="text-inset-shadow m-auto py-10">nothing waiting for you</p>
        }
      </div>
    </DashboardSheet>
  );
}
