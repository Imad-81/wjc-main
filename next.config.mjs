/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [74, 75, 80, 82, 85],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      // The Join page moved to /join-us to match the approved design.
      { source: "/join", destination: "/join-us", permanent: true },
      { source: "/ja/join", destination: "/ja/join-us", permanent: true },
    ]
  },
}

export default nextConfig
