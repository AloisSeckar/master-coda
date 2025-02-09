<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <ArticleStub v-if="article?.wip" />
      <ContentRenderer v-if="articleText" :value="articleText" />
      <div v-else class="mb-6">
        These are not the articles you are looking for. Keep browsing. Keep browsing.
      </div>
    </div>
    <ArticleNavigation :article-id="articleId" />
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
    dscr: article.dscr,
  })
}
else {
  usePageMeta(CODA_PAGE_META)
}

// nuxt-content v3 content loading
const { data: articleText } = await useAsyncData(() => queryCollection('articles').path(useRoute().path).first())
</script>

<style scoped>
pre {
  /* Retain whitespaces in article code blocks */
  white-space: pre;
}
</style>
