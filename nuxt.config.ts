export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore'],
            },
        ],
    ]
})
