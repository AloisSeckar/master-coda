export default defineNuxtConfig({

  extends: [
    'nuxt-ignis',
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

  nitro: {
    prerender: {
      routes: ['/', '/fun'],
    },
  },

})
