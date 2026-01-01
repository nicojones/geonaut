"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "./map-viewer.css";

import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { DEFAULT_MAP_ZOOM, MAX_MAP_ZOOM, ZURICH_COORDS } from "@/config";
import { IMapPin } from "@/types";

import { createMapLayer } from "./create-map-layer.function";

type IMapStyle = "satellite" | "streets";

interface MapProps {
  readonly style: IMapStyle;
  className?: string;
  /**
   * @default "streets"
   */
  changeStyleOnDragTo?: IMapStyle;
  /**
   * MUST be memoized, as the reference can't change between renders
   */
  markers: IMapPin[];
  /**
   * Connected selfies show a line from one to the next
   * @default false
   */
  connected?: boolean;
  /**
   * Line colors
   * @default ["#ccc","#ccc"]
   */
  lineColors?: [string, string];
  /**
   * @optional
   */
  extraConfig?: (map: mapboxgl.Map, markers: mapboxgl.Marker[], layer: mapboxgl.AnyLayer | null) => void;
  onExtraConfigLoaded?: (map: mapboxgl.Map, markers: mapboxgl.Marker[], layer: mapboxgl.AnyLayer | null) => void;

  /**
   * @default DEFAULT_MAP_ZOOM
   */
  zoom?: number;
}

const getMapStyle = (_style: IMapStyle): string =>
  _style === "satellite"
    ? "mapbox://styles/mapbox/satellite-v9"
    : "mapbox://styles/mapbox/streets-v12";

export const MapViewer = ({
  connected = false,
  changeStyleOnDragTo = "streets",
  className = "",
  markers,
  style,
  lineColors = ["#ccc", "#ccc"],
  extraConfig,
  onExtraConfigLoaded,
  zoom = DEFAULT_MAP_ZOOM,
}: MapProps): JSX.Element => {
  const mapContainer = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const mapLayerRef = useRef<mapboxgl.AnyLayer | null>(null);
  const mapIsLoadedRef = useRef<boolean>(false);
  const mapFirstLoadRef = useRef<boolean>(true);
  const resetStyle = useRef<any>();

  const handleSetMarkers = useCallback((): void => {
    if (!mapIsLoadedRef.current || !mapRef.current) {
      console.info("`handleSetMarkers` called before map was initialized");
      return;
    }

    for (let i = 0, len = markersRef.current.length; i < len; ++i) {
      markersRef.current[i].remove();
    }
    if (mapLayerRef.current && mapRef.current.getLayer(mapLayerRef.current.id)) {
      mapRef.current.removeLayer(mapLayerRef.current.id);
    }

    const markerCoords: Array<[number, number]> = [];
    for (let i = 0, len = markers.length; i < len; ++i) {
      const coords: mapboxgl.LngLatLike = { lat: markers[i].lat, lng: markers[i].lng };

      const markerWrapper = document.createElement("div");
      markerWrapper.innerHTML = markers[i].icon;
      const mapMarker = new mapboxgl.Marker(markerWrapper).setLngLat(coords).addTo(mapRef.current);

      markersRef.current.push(mapMarker);
      markerCoords.push([coords.lng, coords.lat]);
    }

    if (markers.length > 1 && connected) {
      // Draw lines between the selfies
      mapLayerRef.current = createMapLayer(markerCoords, lineColors);
      mapRef.current.addLayer(mapLayerRef.current);
    }
    if (mapFirstLoadRef.current) {
      extraConfig?.(mapRef.current, markersRef.current, mapLayerRef.current);
    }

    setTimeout(() => {
      if (!mapRef.current) {
        throw new Error("Map seems to not have been loaded!");
      }

      // gather all the markers to create a bounds object
      const bounds = markerCoords.reduce(function (_bounds, _coord) {
        return _bounds.extend(_coord);
      }, new mapboxgl.LngLatBounds(markerCoords[0], markerCoords[0]));

      mapRef.current.fitBounds(bounds, {
        padding: 20,
      });
      if (mapFirstLoadRef.current) {
        mapRef.current.resize();
        mapRef.current.triggerRepaint();
      }
    }, 500);
  }, [connected, extraConfig, lineColors, markers]);

  useEffect(() => {
    if (!mapFirstLoadRef.current) {
      mapRef.current?.zoomTo(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (!mapFirstLoadRef.current) {
      handleSetMarkers();
    }
  }, [handleSetMarkers, markers]);

  useLayoutEffect(() => {
    if (mapRef.current) {
      // initialize map only once
      return;
    }
    const coords: mapboxgl.MapboxOptions["center"] = markers[0] ?? ZURICH_COORDS;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(style),
      center: coords,
      zoom,
      maxZoom: MAX_MAP_ZOOM,
      accessToken: process.env.NEXT_PUBLIC_MAP_TOKEN,
      boxZoom: true,
      projection: { name: "globe", center: [coords.lng, coords.lat] },
      cooperativeGestures: true,
      doubleClickZoom: true,
      attributionControl: false,
      renderWorldCopies: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const currentMap = mapRef.current as mapboxgl.Map;
    mapRef.current.on("load", _event => {
      // Set map as loaded
      mapIsLoadedRef.current = true;

      const nav = new mapboxgl.NavigationControl({
        showCompass: false,
      });
      currentMap.addControl(nav, "top-left");

      handleSetMarkers();

      if (mapFirstLoadRef.current) {
        onExtraConfigLoaded?.(mapRef.current as mapboxgl.Map, markersRef.current, mapLayerRef.current);
      }

      mapFirstLoadRef.current = false;
    });

    if (changeStyleOnDragTo !== style) {
      mapRef.current.on("drag", _event => {
        mapRef.current?.setStyle(getMapStyle(changeStyleOnDragTo));
      });
      mapRef.current.on("dragend", _event => {
        clearTimeout(resetStyle.current);
        resetStyle.current = setTimeout(() => {
          mapRef.current?.setStyle(getMapStyle(style));
          mapRef.current?.panTo(coords);
        }, 5000);
      });
    }

    // return () => currentMap.remove();
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div
      className={classNames(
        "flex items-center justify-center relative w-full",
        className,
      )}
      data-loading="Refreshing..."
    >
      <div
        // @ts-expect-error LegacyRef
        ref={mapContainer}
        className={className}
      />
    </div>
  );
};
