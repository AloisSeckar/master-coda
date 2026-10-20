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

  app: {
    // per-deploy asset path to avoid cache issues (SRI violations)
    buildAssetsDir: `/_nuxt/${process.env.COMMIT_REF?.slice(0, 8) ?? 'local'}/`,
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
    },
    '/category/**': {
      static: true,
    },
    '/tag/**': {
      static: true,
    },
  },

  nitro: {
    preset: 'netlify',
  },

  ignis: {
    config: {
      html: {
        lang: 'cs',
      },
    },
    default: {
      css: false,
      auth: false,
    },
    preset: {
      ui: 'nuxt-ui',
    },
    content: {
      content: {
        enabled: true,
      },
      pslo: {
        enabled: true,
        content: true,
      },
      social: {
        enabled: true,
        url: 'https://master-coda.cz/',
      },
    },
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
      },
    },
  },

})
