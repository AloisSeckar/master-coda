export default defineNuxtConfig({

  extends: [
    'nuxt-ignis',
  ],

  modules: [
    '@stefanobartoletti/nuxt-social-share',
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
    '/article/**': {
      static: true,
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
          },
        },
      },
    },
    '/category/**': {
      static: true,
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
          },
        },
      },
    },
    '/tag/**': {
      static: true,
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
          },
        },
      },
    },
  },

  nitro: {
    preset: 'netlify',
  },

  socialShare: {
    baseUrl: 'https://master-coda.cz/',
  },

})
