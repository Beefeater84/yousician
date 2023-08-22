/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3mzlbmn9ukddk.cloudfront.net",
        port: "",
        pathname: "/web-assignment/**",
      },
    ],
  },
};

module.exports = nextConfig;
