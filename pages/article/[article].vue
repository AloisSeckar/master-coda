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
useArticleStore().fillIfNeeded()

const articleId = useRoute().params.article as string
const article = useArticleStore().getById(articleId)
if (article) {
  usePageMeta(article.title, article.dscr)
} else {
  usePageMeta(CODA_TITLE, CODA_DSCR)
}

const isNuxtTutorial = articleId?.includes('nuxt')
</script>
