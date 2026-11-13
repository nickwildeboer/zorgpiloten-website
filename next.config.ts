import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Oude links naar de gesprekskaart op /over-ons met een vooringevulde afdeling of taak.
    // De querystring gaat automatisch mee.
    return [
      { source: "/over-ons", has: [{ type: "query", key: "afdeling" }], destination: "/taakgesprek", permanent: true },
      { source: "/over-ons", has: [{ type: "query", key: "taak" }], destination: "/taakgesprek", permanent: true },
    ];
  },
};

export default nextConfig;
