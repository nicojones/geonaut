
/**
 * The HOST of the API, NO trailing slash
 */
export const API_URL = "http://geonaut.vercel.app" as const;

/**
 * The HOST of the images, NO trailing slash
*/
export const RESOURCE_URL = "https://travel.kupfer.es" as const;

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
