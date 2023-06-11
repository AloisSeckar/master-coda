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
useSeoMeta({
  title: () => article?.title || 'Master Coda - The Light Side of the Code',
  ogTitle: () => article?.title || 'Master Coda - The Light Side of the Code',
  description: () => article?.dscr || 'Nepravidelný blog o programování',
  ogDescription: () => article?.dscr || 'Nepravidelný blog o programování',
  ogImage: 'https://master-coda.netlify.app/master-coda.png',
  twitterCard: 'summary_large_image'
})
</script>
