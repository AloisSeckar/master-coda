// app/stores/useArticlesStore.ts
import { defineStore } from 'pinia'

export const useArticleLinkStore = defineStore('article-links', () => {
  // State
  const articles = useState<Article[]>('articles', () => [])
  const loading = useState<boolean>('articles-loading', () => false)
  const error = useState<Error | null>('articles-error', () => null)

  const articlesNuxt = useState<ArticleLink[]>('articles-nuxt', () => [])
  const articlesJava = useState<ArticleLink[]>('articles-java', () => [])
  const articlesCoda = useState<ArticleLink[]>('articles-coda', () => [])

  // Actions
  async function fetchArticles() {
    if (articles.value.length > 0) {
      return
    }

    loading.value = true
    error.value = null

    // internal

    try {
      const data = await queryCollection('articles')
        .order('date', 'DESC')
        .all()

      articles.value = data
    }
    catch (e) {
      error.value = e as Error
      console.error('Failed to fetch internal articles:', e)
      throw e
    }

    // external

    try {
      await fetchExternalArticles('https://alois-seckar.cz/nuxt-news', articlesNuxt)
      await fetchExternalArticles('https://alois-seckar.cz/java-news', articlesJava)
      await fetchExternalArticles('https://alois-seckar.cz/coda-digest', articlesCoda)
    }
    catch (e) {
      error.value = e as Error
      console.error('Failed to fetch external articles:', e)
      throw e
    }

    loading.value = false
  }

  async function fetchExternalArticles(source: string, target: Ref<ArticleLink[]>) {
    const data = await $fetch<Last5News>(source, {
      headers: {
        'User-Agent': 'master-coda',
      },
    })
    if (data) {
      target.value.push(data.item1)
      target.value.push(data.item2)
      target.value.push(data.item3)
      target.value.push(data.item4)
      target.value.push(data.item5)
    }
    target.value.forEach((a: ArticleLink) => {
      a.external = true
    })
  }

  // Getters
  const allVisibleArticles = computed((): Article[] =>
    articles.value.filter(article => article.hidden !== true),
  )

  function getByTag(tag: string): ArticleLink[] {
    return toArticleLinks(allVisibleArticles.value.filter(article =>
      article.tags?.some(t => t.toLowerCase() === tag.toLowerCase())),
    )
  }

  function getByCategory(category: string): ArticleLink[] {
    return toArticleLinks(allVisibleArticles.value.filter(article =>
      article.cat?.toLowerCase() === category.toLowerCase()),
    )
  }

  function getBySeries(series: string): ArticleLink[] {
    return toArticleLinks(allVisibleArticles.value.filter(article =>
      article.file?.startsWith(series)),
    )
  }

  function getRecent(limit: number = 5): ArticleLink[] {
    return toArticleLinks(allVisibleArticles.value.slice(0, limit))
  }

  function toArticleLinks(articles: Article[]): ArticleLink[] {
    return articles.map(a => ({
      date: a.created,
      link: '/article/' + a.file,
      title: a.title,
      dscr: a.dscr,
      external: false,
    }))
  }

  return {
    // State
    articles,
    articlesNuxt,
    articlesJava,
    articlesCoda,

    // Actions
    fetchArticles,

    // Getters
    getByTag,
    getByCategory,
    getBySeries,
    getRecent,
  }
})
