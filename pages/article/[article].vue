<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <ArticleStub v-if="article?.wip" />
      <ContentDoc>
        <template #not-found>
          <div class="mb-6">
            These are not the articles you are looking for. Keep browsing. Keep browsing.
          </div>
        </template>
      </ContentDoc>
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
  console.log(article)
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
console.log(article)
</script>

<style scoped>
pre {
  /* Retain whitespaces in article code blocks */
  white-space: pre;
}
</style>
