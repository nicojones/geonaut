/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travel.kupfer.es",
      },
    ],
  },
};

export default nextConfig;
