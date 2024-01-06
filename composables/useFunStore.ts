import { fun } from '@/data/fun'

export const useFunStore = defineStore({
  id: 'fun-store',
  state: () => {
    return {
      loaded: false,
      items: [] as Fun[],
      index: -1
    }
  },
  actions: {
    fill () {
      this.items = fun
      this.index = this.items.length - 1
      this.loaded = true
    },
    prevImage () {
      if (this.index > 0) {
        this.index--
      }
    },
    nextImage () {
      if (this.index < this.items.length - 1) {
        this.index++
      }
    }
  },
  getters: {
    getById: (state) => {
      return (id: string) => state.items.find(i => i.id === id)
    }
  }
})
