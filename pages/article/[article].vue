<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <ContentDoc>
        <template #not-found>
          <div class="mb-6">
            These are not the articles you are looking for. Keep browsing. Keep browsing.
          </div>
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
  usePageMeta({
    type: 'article',
    url: `${CODA_URL}/article/${articleId}`,
    title: article.title,
    dscr: article.dscr
  })
} else {
  usePageMeta(CODA_PAGE_META)
}

const isNuxtTutorial = articleId?.includes('nuxt')
</script>
