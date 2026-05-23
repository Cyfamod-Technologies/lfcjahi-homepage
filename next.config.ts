import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.lfcjahi.com' },
      { protocol: 'https', hostname: 'lfcjahi.com' },
    ],
  },
}

export default nextConfig
