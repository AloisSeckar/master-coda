export default defineNuxtConfig({
  app: {
    baseURL: '/'
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-security'
  ],
  content: {
    contentHead: false,
    highlight: {
      theme: 'dracula',
      preload: ['java', 'sql']
    }
  },
  image: {
    dir: 'assets/img'
  },
  security: {
    corsHandler: {
      origin: '*'
    }
  },
  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar'
    }
  }
})
