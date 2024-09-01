export default defineNuxtConfig({

  compatibilityDate: '2024-09-01',

  devtools: {
    enabled: false,
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-security',
  ],

  content: {
    contentHead: false,
    highlight: {
      theme: 'dracula',
      preload: ['java', 'sql'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  security: {
    corsHandler: {
      origin: '*',
    },
  },

  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar',
    },
  },
})
