import type { NextConfig } from 'next'

const defaultApiHost = 'api.lfcjahi.com'
const apiHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || `https://${defaultApiHost}`).hostname
  } catch {
    return defaultApiHost
  }
})()

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: apiHost },
      { protocol: 'https', hostname: 'lfcjahi.com' },
    ],
  },
  async headers() {
    return [
      {
        // Cache static CSS, fonts, and images for 1 year (they're versioned by filename)
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
