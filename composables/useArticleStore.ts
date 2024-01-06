import { articles } from '@/data/articles'

export type Article = {
    id: string,
    cat: string,
    title: string,
    dscr: string,
    tags: string[],
    created: string,
    edited?: string,
    wip?: boolean
}

export type ArticleLink = {
  date: string,
  link: string,
  title: string,
  dscr: string,
  external: boolean
}

export const useArticleStore = defineStore({
  id: 'articles-store',
  state: () => {
    return {
      loaded: false,
      items: [] as Article[]
    }
  },
  actions: {
    fillIfNeeded () {
      if (!this.loaded) {
        this.items = articles
        this.loaded = true
      }
    }
  },
  getters: {
    getByCategory: (state) => {
      return (category: string) => state.items.filter(i => i.cat === category)?.sort((a, b) => compareDates(a.created, b.created))
    },
    getLast5: (state) => {
      return () => {
        const last5 = state.items.sort((a, b) => compareDates(a.created, b.created)).slice(0, 5)
        const result: ArticleLink[] = []
        last5.forEach((a: Article) => {
          result.push({
            date: a.created,
            link: '/article/' + a.id,
            title: a.title,
            dscr: a.dscr,
            external: false
          })
        })
        return result
      }
    },
    getById: (state) => {
      return (id: string) => state.items.find(i => i.id === id)
    },
    getByTitle: (state) => {
      return (title: string) => state.items.filter(i => i.title?.includes(title))
    },
    getByTag: (state) => {
      return (tag: string) => state.items.filter(i => i.tags?.includes(tag))
    },
    getEmpty: (): Article => {
      return {
        id: '',
        cat: '',
        title: '',
        dscr: '',
        tags: [],
        created: '',
        edited: ''
      }
    }
  }
})

function compareDates (date1: string, date2: string) {
  const date1Parts = date1.split('.')
  const enDate1 = `${date1Parts[2]}-${date1Parts[1]}-${date1Parts[0]}`
  const date2Parts = date2.split('.')
  const enDate2 = `${date2Parts[2]}-${date2Parts[1]}-${date2Parts[0]}`
  return enDate2.localeCompare(enDate1)
}
