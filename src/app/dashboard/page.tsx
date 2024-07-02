import { Typography } from "@mui/joy";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SelfieCard } from "@/components";
import { DashboardSheet, HistoryMap } from "@/components/generic";
import { selfieLcImage, selfieMyImage } from "@/functions";
import { serverFetch } from "@/functions/server";
import { IDashboardData, IMapDateRange } from "@/types";

export const metadata: Metadata = {
  title: "dashboard - geonaut",
};

export const getDashboardData = (): Promise<IDashboardData> =>
  serverFetch<IDashboardData, any>({
    url: "/ajax/admin/data",
    method: "POST",
    body: { s: "home" },
  });

export default async function DashboardPage (): Promise<JSX.Element> {
  const dashboardData = await getDashboardData();

  const [lastSelfie, ...latestSelfies] = (dashboardData.last ?? []);
  const range: IMapDateRange = [+new Date(dashboardData.mapSelfiesSpan[0]), +new Date(dashboardData.mapSelfiesSpan[1])];

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
      {/* {
        dashboardData.unpublished && (
          <div>
            <Typography level="h2">Unpublished</Typography>
            <SelfieCard selfie={dashboardData.unpublished} />
          </div>
        )
      } */}
      {
        dashboardData.last && (
          <div>
            <SelfieCard key={lastSelfie.hash} selfie={lastSelfie} priority />
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {latestSelfies?.map(s =>
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
          </div>
        )
      }

      <hr />

      <Typography level="h2">your selfies on a map</Typography>
      <HistoryMap
        className="h-[40rem] w-full"
        range={range}
        selfies={dashboardData.mapSelfies}
      />

      <hr />

      <Typography level="h2">by people you follow</Typography>

      <div className="w-8/12">
        <div className="selfie-list">
          {
            dashboardData.following.map(s => <SelfieCard key={s.active_hash} selfie={s} />)
          }
        </div>
      </div>
    </DashboardSheet>
  );
}
