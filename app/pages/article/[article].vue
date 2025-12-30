<template>
  <div v-if="status === 'pending'">
    Načítání článku...
  </div>
  <div v-else>
    <ArticleHeader :article />
    <div class="article">
      <ArticleStub v-if="article?.wip" />
      <ArticleUnchecked v-if="article?.unchecked" />
      <ContentRenderer v-if="article" :value="article" />
      <div v-else class="mt-2 mb-6">
        <NuxtImg
          src="/img/no-article.webp" alt="Article doesn't exist"
          title="Please, check the article URL or report a bug"
          :width="350" :height="200" class="rounded"
        />
      </div>
    </div>
    <ArticleNavigation :article-id="article?.file || ''" />
    <ArticleFooter :article />
  </div>
</template>

<script setup lang="ts">
// nuxt-content v3 content loading
const { data: article, status } = useAsyncData(
  async () => {
    const path = useRoute().path
    const item = await queryCollection('articles').path(path).first()
    if (!item) {
      throw createError({ statusCode: 404, statusMessage: `MasterCoda article ${path} not found` })
    }
    return item
  },
)
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
