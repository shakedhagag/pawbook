/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seeklogo.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
