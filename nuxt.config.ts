export default defineNuxtConfig({
  ssr: false,
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
  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar'
    }
  }
})
