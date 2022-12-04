import { defineStore } from 'pinia'
import { articles } from '@/data/articles'

export const useArticleStore = defineStore({
    id: 'articles-store',
    state: () => {
        return {
            loaded: false,
            items: [] as Article[],
        }
    },
    actions: {
        async fill() {
            this.items = articles
            this.loaded = true
        }
    },
    getters: {
        getByCategory: (state) => {
            return (category: string) => state.items.filter(i => i.cat === category)
        },
        getById: (state) => {
            return (id: string) => state.items.find(i => i.id === id)
        }
    }
})

export type Article = {
    id: string,
    cat: string,
    title: string,
    dscr: string,
}
