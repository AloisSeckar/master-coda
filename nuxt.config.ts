export default defineNuxtConfig({
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
