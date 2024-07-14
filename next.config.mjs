/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travel.kupfer.es",
      },
      {
        protocol: "https",
        hostname: "travel-api.kupfer.es",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async rewrites () {
    return [
      {
        source: "/:userId(@[a-zA-Z0-9]+)/:id*",
        destination: "/user/:userId/:id*",
      },
    ];
  },
};

export default nextConfig;
