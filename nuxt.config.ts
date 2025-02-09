export default defineNuxtConfig({

  extends: [
    'nuxt-ignis',
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'dracula',
          preload: ['java', 'sql', 'js', 'ts'],
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      github: 'https://github.com/AloisSeckar',
    },
  },

})
