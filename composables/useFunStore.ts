import { fun } from '@/data/fun'

export const useFunStore = defineStore({
    id: 'fun-store',
    state: () => {
        return {
            loaded: false,
            items: [] as Fun[],
            random: {} as Fun,
            previous: '',
        }
    },
    actions: {
        fill() {
            this.items = fun
            this.loaded = true
            this.getRandom()
        },
        getRandom() {
            let randomItem;
            do {
                randomItem = this.items[Math.floor(Math.random() * this.items.length)]
            } while (randomItem.id === this.previous)
                
            this.previous = randomItem.id
            this.random = randomItem
        }
    },
    getters: {
        getById: (state) => {
            return (id: string) => state.items.find(i => i.id === id)
        },
    }
})

export type Fun = {
    id: string,
    title: string,
    explain?: string,
    added: string,
}
