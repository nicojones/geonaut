/**
 *  Generate random noise for lat and lng such that the coordinate is randomized
 * up to maxDistance meters from the original coordinate
 */
export const generateCoordinateNoise = (maxDistance: number, lat: number): [number, number] => {
  // 1 degree latitude ≈ 111,320 meters
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLng = 40075000 * Math.cos(lat * Math.PI / 180) / 360;

  // Choose random bearing
  const theta = Math.random() * 2 * Math.PI;
  // Choose random distance within the circle of radius maxDistance
  const r = Math.random() * maxDistance;

  // Calculate offsets in meters
  const deltaX = r * Math.cos(theta); // meters east-west
  const deltaY = r * Math.sin(theta); // meters north-south

  // Convert meter offsets to degrees
  const deltaLat = deltaY / metersPerDegreeLat;
  const deltaLng = deltaX / metersPerDegreeLng;

  return [deltaLat, deltaLng];
};
