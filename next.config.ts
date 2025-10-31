import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gbkhudgweroysmtdlpak.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/patients-imgs/**",
      },
    ],
  },
}

export default nextConfig
