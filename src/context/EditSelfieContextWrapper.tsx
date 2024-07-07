"use client";

import { useCallback, useMemo, useState } from "react";

import { createZodErrorObject, selfiePin } from "@/functions";
import { ComponentChildren, IEditSelfieContext, IEditSelfieData, IEditSelfieImages, IEditSelfieImagesAdded, IMapPin, ISelfieEdit, ZodErrorMapping } from "@/types";
import { EditSelfieValidator } from "@/validators";

import { EditSelfieContext } from "./edit-selfie.context";

interface EditSelfieContextWrapperProps {
  initialData: IEditSelfieData;
  children: ComponentChildren;
}

const getAddedImages = (images: IEditSelfieImages): IEditSelfieImagesAdded => (
  !images.me.img && !images.lc.img
    ? undefined
    : ({
      me: !!images.me.img,
      lc: !!images.lc.img,
    })
);

const getHasLocation = (selfie: ISelfieEdit): boolean =>
  Math.abs(selfie.lat) + Math.abs(selfie.lng) > 0;

const getMarkers = (hasImages: IEditSelfieImagesAdded, selfie: ISelfieEdit): IMapPin[] => (
  (!hasImages || !getHasLocation(selfie))
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
  const addedImages: IEditSelfieImagesAdded = useMemo(
    () => getAddedImages(data.images),
    [data.images.me, data.images.lc],
  );
  const hasLocation: boolean = useMemo(
    () => getHasLocation(data.selfie),
    [data.selfie.lat, data.selfie.lng],
  );
  const markers = useMemo<IMapPin[]>(
    (): IMapPin[] => getMarkers(addedImages, data.selfie),
    [data.selfie.lat, data.selfie.lng, addedImages],
  );
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

  const context: IEditSelfieContext = useMemo(
    () => ({
      data,
      setData,
      setSelfieData: handleSetSelfieData,
      errors,
      setErrors,
      hash: data.selfie.hash,
      hasImages: addedImages,
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
