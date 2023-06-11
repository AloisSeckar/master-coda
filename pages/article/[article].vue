<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <ContentDoc>
        <template #not-found>
          These are not the articles you are looking for. Keep browsing. Keep browsing.
        </template>
      </ContentDoc>
    </div>
    <NuxtTutorialNavigation v-if="isNuxtTutorial" />
    <ArticleFooter />
  </div>
</template>

<script setup lang="ts">
const isNuxtTutorial = useRoute().params.article?.includes('nuxt')

const article = useArticleStore().getById(useRoute().params.article as string)
useHead({
  meta: [
    { hid: 'og-type', property: 'og:type', content: 'website' },
    { hid: 'og-title', property: 'og:title', content: article?.title },
    { hid: 'og-desc', property: 'og:description', content: article?.dscr },
    { hid: 'og-image', property: 'og:image', content: 'https://master-coda.netlify.app/master-coda.webp' },
    { hid: 'og-url', property: 'og:url', content: 'https://master-coda.cz/articles/' + article?.id },
    { hid: 't-type', name: 'twitter:card', content: 'summary_large_image' }
  ]
})
/*
useSeoMeta({
  title: article?.title,
  ogTitle: article?.title,
  description: article?.dscr,
  ogDescription: article?.dscr,
  ogImage: 'https://master-coda.netlify.app/master-coda.webp',
  twitterCard: 'summary_large_image'
})
*/
</script>
