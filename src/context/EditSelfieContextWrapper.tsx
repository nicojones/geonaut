"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ComponentChildren, IEditSelfieContext, IEditSelfieCoords, IEditSelfieData, IEditSelfieImagesAdded, IMapPin } from "@/types";

import { EditSelfieContext } from "./edit-selfie.context";
import { selfiePin } from "@/functions";

interface EditSelfieContextWrapperProps {
  initialData: IEditSelfieData;
  children: ComponentChildren;
}

export const EditSelfieContextWrapper = ({ children, initialData }: EditSelfieContextWrapperProps): JSX.Element => {
  const [data, setData] = useState<IEditSelfieData>(initialData);
  const [markers, setMarkers] = useState<IMapPin[]>([]);

  console.log(data.images.me, data.images.lc);

  const hasImages: IEditSelfieImagesAdded = useMemo(() => (
    !data.images.me.img && !data.images.lc.img
      ? undefined
      : ({
        me: !!data.images.me.img,
        lc: !!data.images.lc.img,
      })
  ), [data.images.me, data.images.lc]);

  const hasLocation: boolean = useMemo(
    () => Math.abs(data.selfie.lat) + Math.abs(data.selfie.lng) !== 0,
    [data.selfie.lat, data.selfie.lng],
  );


  useEffect(() => {

    console.log("UPDATE MARKERS", hasImages, data.images.me, data.images.lc)
    setMarkers(
      !hasImages
        ? []
        : [selfiePin(
          {
            ...data.selfie,
            active_hash: data.selfie.hash,
          },
          { ...hasImages, force: true }
        )]
    )
  }, [data.selfie.lat, data.selfie.lng, data.images.me, data.images.lc]);
  console.log("UPDATE MARKERS OUT", data.images.lc);

  const context: IEditSelfieContext = useMemo(
    () => ({
      data,
      setData,
      hash: data.selfie.hash,
      hasImages,
      hasLocation,
      markers,
      _insideContext_: true,
    }),
    [data, markers],
  );

  return (
    <EditSelfieContext.Provider value={context} >
      {children}
    </EditSelfieContext.Provider>
  );
};
