/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.dog.ceo",
      "thispersondoesnotexist.com",
      "seeklogo.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "links.papareact.com",
      "www.pngitem.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "seeklogo.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "links.papareact.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "thispersondoesnotexist.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
