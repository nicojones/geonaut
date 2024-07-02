"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { randomId } from "@/functions";
import { IMapPin } from "@/types";

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
}

const DEFAULT_MAP_ZOOM = 4 as const;
const MAX_MAP_ZOOM = 14 as const;

const getMapStyle = (_style: IMapStyle): string =>
  _style === "satellite"
    ? "mapbox://styles/mapbox/satellite-v9"
    : "mapbox://styles/mapbox/streets-v12";

export const Map = ({
  connected = false,
  changeStyleOnDragTo = "streets",
  className = "",
  markers,
  style,
  lineColors = ["#ccc", "#ccc"],
}: MapProps): JSX.Element => {
  const mapContainer = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const mapLayerRef = useRef<mapboxgl.AnyLayer | null>(null);
  const mapIsLoadedRef = useRef<boolean>(false);
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

    if (markers.length === 0) {
      return;
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
      mapLayerRef.current = {
        id: randomId(),
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: markerCoords,
            },
          },
          lineMetrics: true,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ccc",
          "line-width": 2,
          "line-gradient": [
            "interpolate",
            ["linear"],
            ["line-progress"],
            0,
            lineColors[0],
            1,
            lineColors[1],
          ],
        },
      };
      mapRef.current.addLayer(mapLayerRef.current);
    }

    setTimeout(() => {
      if (!mapRef.current) {
        throw new Error("Map seems to not have been loaded!");
      }

      mapRef.current.setCenter(markerCoords[markerCoords.length - 1]);
      mapRef.current.panTo(markerCoords[markerCoords.length - 1]);
      mapRef.current.resize();
      mapRef.current.triggerRepaint();
    }, 1000);
  }, [markers]);

  useEffect(() => {
    handleSetMarkers();
  }, [markers]);

  useLayoutEffect(() => {
    if (mapRef.current ?? !markers.length) {
      // initialize map only once
      return;
    }
    const coords: mapboxgl.MapboxOptions["center"] = markers[0];
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(style),
      center: coords,
      zoom: DEFAULT_MAP_ZOOM,
      maxZoom: MAX_MAP_ZOOM,
      accessToken: process.env.NEXT_PUBLIC_MAP_TOKEN,
      boxZoom: true,
      cooperativeGestures: true,
      doubleClickZoom: true,
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
  }, []);

  return (
    <div
      className={classNames(
        "flex items-center justify-center relative",
        className,
      )}
      data-loading="Refreshing..."
    >
      <div
        // @ts-expect-error LegacyRef
        ref={mapContainer}
        className={className}
      >
        <span>loading map...</span>
      </div>
    </div>
  );
};
