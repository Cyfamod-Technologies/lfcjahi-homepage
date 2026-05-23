import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.lfcjahi.com' },
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
