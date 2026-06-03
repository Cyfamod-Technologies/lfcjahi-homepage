const DEFAULT_API_URL = 'https://api.lfcjahi.com'

export const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '')

export function getApiOrigin(): string {
  try {
    return new URL(apiBaseUrl).origin
  } catch {
    return DEFAULT_API_URL
  }
}
