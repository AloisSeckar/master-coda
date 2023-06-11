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
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: () => article?.title },
    { name: 'og:description', content: () => article?.dscr },
    { name: 'og:image', content: 'https://master-coda.netlify.app/master-coda.webp' },
    { name: 'og:url', content: () => 'https://master-coda.cz/articles/' + article?.id },
    { name: 'twitter:card', content: 'summary_large_image' }
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
