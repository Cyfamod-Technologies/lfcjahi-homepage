const defaultApiHost = 'api.lfcjahi.com'

const apiHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || `https://${defaultApiHost}`).hostname
  } catch {
    return defaultApiHost
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    devtoolSegmentExplorer: false,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false
    }
    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [45, 50, 60, 65, 75],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: apiHost },
      { protocol: 'https', hostname: 'lfcjahi.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*(css|fonts|images)/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
