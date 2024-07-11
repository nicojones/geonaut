/**
 * When we are this far from the bottom of the screen, new Selfies are loaded
 */
export const SCROLL_PADDING = 150;

/**
 * Allowed image types
 */
export const ALLOWED_CUSTOM_DATA_FILE_FORMATS = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/heic": ".heic",
} as const;

/**
 * Coordinates for Zürich. Used to center the map in the abscence of markers
 * Export as [LNG, LAT].
 */
export const ZURICH_COORDS: [number, number] = [8.55, 47.38];

export const DEFAULT_MAP_ZOOM = 4 as const;
export const MAX_MAP_ZOOM = 14 as const;
export const SET_PIN_MAP_ZOOM = 10 as const;

export const MS_PER_WEEK = 86_400_000 * 7;
export const MS_PER_YEAR = 52 * MS_PER_WEEK;
export const PIN_GRADIENT_COLOR_FROM = "#8e44ad" as const;
export const PIN_GRADIENT_COLOR_TO = "#27ae60" as const;
