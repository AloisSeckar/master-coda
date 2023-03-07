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
    <ArticleFooter />
  </div>
</template>

<script setup>
const id = useRoute().params.article.toString()
</script>
