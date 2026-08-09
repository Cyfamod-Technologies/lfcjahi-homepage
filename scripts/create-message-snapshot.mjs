import { promises as fs } from 'node:fs'
import path from 'node:path'

const cacheDirectory = path.join(process.cwd(), '.next', 'cache', 'fetch-cache')
const outputDirectory = path.join(process.cwd(), 'data')
const outputFile = path.join(outputDirectory, 'media-snapshot.json')

const cacheFiles = await fs.readdir(cacheDirectory)
let mediaPayload = null

for (const cacheFile of cacheFiles) {
  const cacheEntry = JSON.parse(await fs.readFile(path.join(cacheDirectory, cacheFile), 'utf8'))

  if (cacheEntry?.kind !== 'FETCH' || typeof cacheEntry?.data?.body !== 'string') continue

  try {
    const payload = JSON.parse(Buffer.from(cacheEntry.data.body, 'base64').toString('utf8'))
    const items = Array.isArray(payload?.data) ? payload.data : []

    if (items.some((item) => item && ('mediaUrl' in item || 'mediaDate' in item))) {
      mediaPayload = items
      break
    }
  } catch {
    // Ignore cache entries that are not JSON API responses.
  }
}

if (!mediaPayload?.length) {
  throw new Error('No cached media API response was found. Build the site while the API is available first.')
}

await fs.mkdir(outputDirectory, { recursive: true })
await fs.writeFile(
  outputFile,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), data: mediaPayload }, null, 2)}\n`,
)

console.log(`Saved ${mediaPayload.length} messages to ${path.relative(process.cwd(), outputFile)}`)
