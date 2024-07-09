import { PlusIcon } from "@heroicons/react/16/solid";
import { Card, IconButton, Typography } from "@mui/joy";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SelfieCard } from "@/components";
import { DashboardSheet, HistoryMap } from "@/components/generic";
import { selfieLcImage, selfieMyImage } from "@/functions";
import { serverFetch } from "@/functions/server";
import { IDashboardData } from "@/types";

export const metadata: Metadata = {
  title: "dashboard - geonaut",
};

const getDashboardData = (): Promise<IDashboardData> =>
  serverFetch<IDashboardData, any>({
    url: "/ajax/admin/data",
    method: "POST",
    body: { s: "home" },
  });

export default async function DashboardPage (): Promise<JSX.Element> {
  const dashboardData = await getDashboardData();
  console.log(dashboardData);

  const [lastSelfie, ...latestSelfies] = (dashboardData.last ?? []);

  return (
    <DashboardSheet>
      <Typography
        level="h1"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        dashboard
      </Typography>
      <Link
        href={dashboardData.unpublished ? `/edit/${dashboardData.unpublished.hash}` : "/new"}
        title="new post..."
        className="absolute right-0 top-[--header-height] !mt-0 opacity-50 hover:opacity-100 transition-opacity"
      >
        <IconButton
          // color="success"
          size="lg"
          sx={{ borderRadius: "100%", width: 70, height: 70 }}
          variant="solid"
        >
          <PlusIcon className="size-10" />
        </IconButton>
      </Link>

      <Card sx={{ minHeight: 150 }}>
        {
          lastSelfie
            ? (
              <>
                <div>
                  <Typography level="h2" sx={{ textAlign: "center", mb: 5 }}>last posts</Typography>

                  <SelfieCard key={lastSelfie.hash} selfie={lastSelfie} priority />
                  {
                    latestSelfies.length && (
                      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {latestSelfies.map(s =>
                          <Link
                            className="fric opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                            key={s.hash}
                            href={`/edit/${s.hash}`}
                          >
                            <Image height={75} width={100} src={selfieMyImage(s, true)} className="basis-1/2 grow" alt="My image" />
                            <Image height={75} width={100} src={selfieLcImage(s, true)} className="basis-1/2 grow" alt="What i see" />
                          </Link>,
                        )}
                      </div>
                    )
                  }
                </div>
              </>
            )
            : <p className="text-inset-shadow m-auto">your posts will appear here</p>
        }
      </Card>

      <Card sx={{ minHeight: 150 }}>
        {
          lastSelfie
            ? (
              <>
                <Typography level="h2" sx={{ textAlign: "center", mb: 5 }}>previous posts on a map</Typography>
                <HistoryMap
                  className="h-[60rem] max-h-[80vh] w-full"
                  range={dashboardData.mapSelfiesRange}
                  selfies={dashboardData.mapSelfies}
                  pinUrl="edit"
                />
                <hr />
              </>
            )
            : <p className="text-inset-shadow m-auto">add pictures to see them on a map</p>
        }
      </Card>

      <Card sx={{ minHeight: 150 }}>
        {
          dashboardData.following.length
            ? (
              <>
                <Typography level="h2" sx={{ textAlign: "center", mb: 5 }}>by people you follow</Typography>
                <div className="w-full mx-auto">
                  <div className="selfie-list">
                    {
                      dashboardData.following.map(s => <SelfieCard key={s.active_hash} selfie={s} />)
                    }
                  </div>
                </div>
              </>
            )
            : <p className="text-inset-shadow m-auto">follow users to see their latest posts here</p>
        }
      </Card>

    </DashboardSheet >
  );
}
