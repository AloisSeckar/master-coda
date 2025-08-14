<template>
  <div>
    <ArticleHeader :article />
    <div class="article">
      <ArticleStub v-if="article?.wip" />
      <ArticleUnchecked v-if="article?.unchecked" />
      <ContentRenderer v-if="article" :value="article" />
      <div v-else class="mb-6">
        These are not the articles you are looking for. Keep browsing. Keep browsing.
      </div>
    </div>
    <ArticleNavigation :article-id="article?.file || ''" />
    <ArticleFooter :article />
  </div>
</template>

<script setup lang="ts">
// nuxt-content v3 content loading
const { data: article } = await useAsyncData(() => queryCollection('articles').path(useRoute().path).first())
if (article.value) {
  usePageMeta({
    type: 'article',
    url: `${CODA_URL}/article/${article.value.file}`,
    title: article.value.title,
    dscr: article.value.dscr,
  })
}
else {
  usePageMeta(CODA_PAGE_META)
}
</script>

<style scoped>
pre {
  /* Retain whitespaces in article code blocks */
  white-space: pre;
}
</style>
