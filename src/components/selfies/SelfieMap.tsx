"use client";

import { MapPinIcon } from "@heroicons/react/16/solid";
import { useMemo, useState } from "react";

import { MapViewer } from "@/components/generic";
import { selfiePin } from "@/functions";
import { ComponentChildren, ISelfie } from "@/types";

interface SelfieMapProps {
  selfie: ISelfie;
  children: (opener: JSX.Element, map: ComponentChildren) => JSX.Element;
}

export const SelfieMap = ({ children, selfie }: SelfieMapProps): JSX.Element => {
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const marker = useMemo(() => selfiePin(selfie), [selfie]);

  const handleToggleMap = (): void => {
    setMapOpen(m => !m);
  };
  return children(
    <span
      className="fric space-x-2 cursor-pointer"
      onClick={handleToggleMap}
      title={mapOpen ? "close map" : "open map"}
    >
      <MapPinIcon className="size-4" />
      <span>
        {
          mapOpen
            ? `(${selfie.lat.toFixed(2)}, ${selfie.lng.toFixed(2)})`
            : selfie.selfie_place
        }
      </span>
    </span>,
    (
      mapOpen &&
      <MapViewer markers={[marker]} style="satellite" className="w-full h-96" />
    ),
  );
};
