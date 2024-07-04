import mapboxgl from "mapbox-gl";

import { randomId } from "@/functions";

export const createMapLayer = (
  markerCoords: Array<[number, number]>,
  lineColors: [string, string],
): mapboxgl.AnyLayer => ({
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
});
