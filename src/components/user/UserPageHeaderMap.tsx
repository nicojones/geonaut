import { MapPinIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button } from "@mui/joy";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { HistoryMap } from "@/components/generic";
import { useJwtTokenContext } from "@/context";
import { loadingMask, raiseOnError } from "@/functions";
import { IHistoricalMapPinData } from "@/types";

interface UserPageHeaderMapProps {
  username: string;
}

export const UserPageHeaderMap = ({ username }: UserPageHeaderMapProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapData, setMapData] = useState<IHistoricalMapPinData | undefined>(undefined);

  useEffect(() => {
    if (!showMap || !!mapData) {
      return;
    }
    api<IHistoricalMapPinData, any>({
      url: "/api/history",
      body: { username },
    })
      .then(raiseOnError)
      .then(({ mapSelfies, mapSelfiesRange }) => {
        setMapData({ mapSelfies, mapSelfiesRange });
      })
      .catch(e => {
        toast.error(String(e));
        console.error(e);
      });
  }, [api, mapData, showMap, username]);

  return (
    <>
      {
        showMap
          ? (
            <>
              <Button onClick={() => setShowMap(false)} variant="soft" size="sm" color="neutral">
                <XMarkIcon className="size-4" /> &nbsp; close map
              </Button>
              {
                mapData?.mapSelfiesRange
                  ? (
                    <HistoryMap
                      className="relative h-[60rem] max-h-[80vh] w-full"
                      range={mapData.mapSelfiesRange}
                      selfies={mapData.mapSelfies}
                      pinUrl="view"
                    />
                  )
                  : (
                    <span
                      className={classNames(
                        "relative h-[60rem] max-h-[80vh] w-full fric justify-center",
                        loadingMask({ loading: true, spinner: true }),
                      )}
                      data-loading="loading map..."
                    />
                  )
              }
            </>
          )
          : (
            <Button onClick={() => setShowMap(true)} variant="soft" size="sm" color="neutral">
              <MapPinIcon className="size-4" /> &nbsp; see on a map
            </Button>
          )
      }
    </>
  );
};
