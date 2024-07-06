"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { createZodErrorObject, selfiePin } from "@/functions";
import { ComponentChildren, IEditSelfieContext, IEditSelfieData, IEditSelfieImages, IEditSelfieImagesAdded, IMapPin, ISelfieEdit, ZodErrorMapping } from "@/types";
import { EditSelfieValidator } from "@/validators";

import { EditSelfieContext } from "./edit-selfie.context";

interface EditSelfieContextWrapperProps {
  initialData: IEditSelfieData;
  children: ComponentChildren;
}

const getHasImages = (images: IEditSelfieImages): IEditSelfieImagesAdded => (
  !images.me.img && !images.lc.img
    ? undefined
    : ({
      me: !!images.me.img,
      lc: !!images.lc.img,
    })
);

const getMarkers = (hasImages: IEditSelfieImagesAdded, selfie: ISelfieEdit): IMapPin[] => (
  !hasImages
    ? []
    : [selfiePin(
      {
        ...selfie,
        active_hash: selfie.hash,
      },
      { ...hasImages, force: true },
    )]
);

export const EditSelfieContextWrapper = ({ children, initialData }: EditSelfieContextWrapperProps): JSX.Element => {
  const [data, setData] = useState<IEditSelfieData>(initialData);
  const hasImages: IEditSelfieImagesAdded = useMemo(() => getHasImages(data.images), [data.images.me, data.images.lc]);
  const handleGetMarkers = (): IMapPin[] => getMarkers(hasImages, data.selfie);
  const [markers, setMarkers] = useState<IMapPin[]>(handleGetMarkers());
  const [errors, setErrors] = useState<ZodErrorMapping<ISelfieEdit>>({});

  const handleSetSelfieData = useCallback((newData: Partial<ISelfieEdit>): void => {
    const valid = EditSelfieValidator.safeParse({ ...data.selfie, ...newData });
    console.log("is valid?", valid);
    if (valid.success) {
      setErrors({});
    } else {
      setErrors(createZodErrorObject<ISelfieEdit>(valid.error.issues));
    }
    setData(_d => ({ ..._d, selfie: { ..._d.selfie, ...newData } }));
  }, [data]);

  const hasLocation: boolean = useMemo(
    () => Math.abs(data.selfie.lat) + Math.abs(data.selfie.lng) !== 0,
    [data.selfie.lat, data.selfie.lng],
  );

  useEffect(() => {
    setMarkers(handleGetMarkers());
  }, [data.selfie.lat, data.selfie.lng, data.images.me, data.images.lc]);

  useEffect(() => {
    // const interval = setInterval(() => {
    if ((data.selfie.lat || data.selfie.lng) && !markers.length) {
      handleGetMarkers();
      // clearInterval(interval);
    }
    // }, 100);
    // return () => clearInterval(interval);
  }, []);

  console.log(data.selfie);

  const context: IEditSelfieContext = useMemo(
    () => ({
      data,
      setData,
      setSelfieData: handleSetSelfieData,
      errors,
      setErrors,
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
