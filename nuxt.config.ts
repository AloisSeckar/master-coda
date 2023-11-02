// @ts-ignore: noImplicitAny - JS module with no types...
import vsharp from 'vite-plugin-vsharp'

export default defineNuxtConfig({
  app: {
    baseURL: '/'
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }]
  ],
  content: {
    highlight: {
      theme: 'dracula',
      preload: ['java']
    }
  },
  vite: {
    plugins: [vsharp()]
  },
  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar'
    }
  }
})
