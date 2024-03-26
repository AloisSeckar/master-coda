import { articles } from '@/data/articles'

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
        this.items = articles.filter(i => !i.hidden)
        this.loaded = true
      }
    }
  },
  getters: {
    getByCategory: (state) => {
      return (category: string) => state.items.filter(i => i.cat === category)?.sort((a, b) => compareDates(a.created, b.created))
    },
    getLast5: (state) => {
      return () => state.items.sort((a, b) => compareDates(a.created, b.created)).slice(0, 5)
    },
    getById: (state) => {
      return (id: string) => state.items.find(i => i.id === id)
    },
    getByTitle: (state) => {
      return (title: string) => state.items.filter(i => i.title?.includes(title))?.sort((a, b) => compareDates(b.created, a.created))
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
