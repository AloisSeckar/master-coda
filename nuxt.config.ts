export default defineNuxtConfig({

  extends: [
    'nuxt-ignis',
  ],

  $development: {
    // there is some issue with "ipx" provider in my dev setup
    image: {
      provider: 'none',
    },
  },

  // TODO this will be part of the nuxt-ignis config in the future
  css: [
    '@/assets/css/coda-tailwind.css',
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'dracula',
          langs: ['sql'],
          preload: ['java', 'js', 'ts', 'vue'],
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar',
    },
  },

  routeRules: {
    '/': { static: false },
    '/article/**': { static: true },
    '/category/**': { static: true },
    '/tag/**': { static: true },
  },

  nitro: {
    preset: 'netlify',
  },

})
