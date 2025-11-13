// app/stores/useArticlesStore.ts
import { defineStore } from 'pinia'

export const useArticleLinkStore = defineStore('article-links', () => {
  // State
  const articles = useState<Article[]>('articles', () => [])
  const loading = useState<boolean>('articles-loading', () => false)
  const error = useState<Error | null>('articles-error', () => null)

  // Actions
  async function fetchArticles() {
    if (articles.value.length > 0) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await queryCollection('articles')
        .order('date', 'DESC')
        .all()

      articles.value = data
    }
    catch (e) {
      error.value = e as Error
      console.error('Failed to fetch articles:', e)
      throw e
    }
    finally {
      loading.value = false
    }
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

    // Actions
    fetchArticles,

    // Getters
    getByTag,
    getByCategory,
    getBySeries,
    getRecent,
  }
})
