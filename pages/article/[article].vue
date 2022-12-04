<template>
  <div>
    <div v-if="article">
      <h2>{{ article.title }}</h2>
      <div v-html="article.content"></div>
    </div>
    <div v-else>
      These are not the articles you are looking for. Keep browsing
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params.article.toString()
const article = computed(() => useArticleStore().getById(id))
</script>
