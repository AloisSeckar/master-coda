export default defineNuxtConfig({

  extends: [
    'nuxt-ignis',
  ],

  content: {
    contentHead: false,
    highlight: {
      theme: 'dracula',
      preload: ['java', 'sql'],
    },
  },

  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar',
    },
  },

})
