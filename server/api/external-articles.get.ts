// 60 minutes
const CACHE_MAX_AGE = 60 * 60 * 1000

const EXTERNAL_SOURCES = [
  { key: 'nuxt', url: 'https://alois-seckar.cz/nuxt-news' },
  { key: 'java', url: 'https://alois-seckar.cz/java-news' },
  { key: 'coda', url: 'https://alois-seckar.cz/coda-digest' },
] as const

type CacheEntry = {
  data: ArticleLink[]
  timestamp: number
}

// internal cache map
const cache = new Map<string, CacheEntry>()

async function fetchSource(key: string, url: string): Promise<ArticleLink[]> {
  // try to get cached results
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_MAX_AGE) {
    return cached.data
  }

  // fetch fresh data from external source
  try {
    const data = await $fetch<Last5News>(url, {
      headers: {
        'User-Agent': 'master-coda',
      },
    })
    if (data) {
      const items: ArticleLink[] = [
        data.item1,
        data.item2,
        data.item3,
        data.item4,
        data.item5,
      ].map(item => ({ ...item, external: true }))
      cache.set(key, { data: items, timestamp: Date.now() })
      return items
    }
  }
  catch (e) {
    console.error(`Failed to fetch external articles from ${url}:`, e)
  }

  // fallback
  return cached?.data ?? []
}

export default defineEventHandler(async () => {
  const results = await Promise.all(
    EXTERNAL_SOURCES.map(s => fetchSource(s.key, s.url)),
  )

  return {
    nuxt: results[0],
    java: results[1],
    coda: results[2],
  }
})
