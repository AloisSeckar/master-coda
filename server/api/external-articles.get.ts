export default defineCachedEventHandler(async () => {
  const sources = [
    { key: 'nuxt', url: 'https://alois-seckar.cz/nuxt-news' },
    { key: 'java', url: 'https://alois-seckar.cz/java-news' },
    { key: 'coda', url: 'https://alois-seckar.cz/coda-digest' },
  ] as const

  const result: Record<string, ArticleLink[]> = {
    nuxt: [],
    java: [],
    coda: [],
  }

  for (const source of sources) {
    try {
      const data = await $fetch<Last5News>(source.url, {
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
        result[source.key] = items
      }
    }
    catch (e) {
      console.error(`Failed to fetch external articles from ${source.url}:`, e)
    }
  }

  return result
}, {
  maxAge: 60 * 60,
  name: 'external-articles',
})
