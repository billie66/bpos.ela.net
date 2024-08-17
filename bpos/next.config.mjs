/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.elastos.io",
        port: "",
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
