<script setup>
  const { data: article } = await useFetch(`/api/article/java/null-safe-if`);
</script>

<template>
  <div>
    <div v-if="article !== null && article !== undefined">
      <h2>{{ article.title }}</h2>
      <div v-html="article.content"></div>
    </div>
    <div v-else>
      These are not the articles you are looking for.
    </div>
  </div>
</template>