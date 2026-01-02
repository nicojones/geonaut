"use client";

import { MapPinIcon } from "@heroicons/react/16/solid";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { selfiePin } from "@/functions";
import { ComponentChildren, ISelfie } from "@/types";

const MapViewer = dynamic(() => import("@/components/generic/map-viewer/MapViewer").then(m => m.MapViewer), {
  ssr: false,
});

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
      className="fric space-x-3 cursor-pointer"
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
