import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Oude adressen blijven werken. De querystring gaat automatisch mee.
    return [
      { source: "/taakgesprek", destination: "/kennismaking", permanent: true },
      { source: "/werkwijze", destination: "/aanpak", permanent: true },
      { source: "/over-ons", has: [{ type: "query", key: "afdeling" }], destination: "/kennismaking", permanent: true },
      { source: "/over-ons", has: [{ type: "query", key: "taak" }], destination: "/kennismaking", permanent: true },
    ];
  },
};

export default nextConfig;
