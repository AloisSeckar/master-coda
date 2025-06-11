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
    static: true,
  },

})
