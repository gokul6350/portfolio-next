import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cpdd",
        destination:
          "https://drive.google.com/file/d/1F14Dt0rRkaBtiShyNsU7KdkNCAdz2fwS/view?usp=drivesdk",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
