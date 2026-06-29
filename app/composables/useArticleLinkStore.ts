// app/stores/useArticlesStore.ts
import { defineStore } from 'pinia'

export const useArticleLinkStore = defineStore('article-links', () => {
  // State
  const articles = useState<Article[]>('articles', () => [])
  const loading = useState<boolean>('articles-loading', () => false)

  const articlesNuxt = useState<ArticleLink[]>('articles-nuxt', () => [])
  const articlesJava = useState<ArticleLink[]>('articles-java', () => [])
  const articlesCoda = useState<ArticleLink[]>('articles-coda', () => [])

  // Actions
  async function fetchArticles() {
    if (articles.value.length > 0) {
      return
    }

    loading.value = true

    // internal

    try {
      const data = await queryCollection('articles')
        .order('date', 'DESC')
        .all()

      articles.value = data
    }
    catch (e) {
      console.error('Failed to fetch internal articles:', e)
      throw e
    }

    // external

    try {
      const data = await $fetch<Record<string, ArticleLink[]>>('/api/external-articles')
      if (data) {
        articlesNuxt.value = data.nuxt || []
        articlesJava.value = data.java || []
        articlesCoda.value = data.coda || []
      }
    }
    catch (e) {
      console.error('Failed to fetch external articles:', e)
    }

    loading.value = false
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
    if (series.includes('copilot')) {
      // extra case - filtering is based on a tag value
      return toArticleLinks(allVisibleArticles.value.filter(article =>
        article.tags?.includes('Copilot')),
      )
    }
    // filtering is based on file prefix
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
