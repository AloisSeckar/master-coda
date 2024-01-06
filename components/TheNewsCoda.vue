<template>
  <h2>Co nového na master-coda.cz?</h2>
  <ul class="list-disc articleList">
    <li v-for="news in codaNews" :key="news.link">
      <span class="mr-2 text-coda-purple">{{ news.created }}</span>
      <NuxtLink :to="news.link" :external="true" noprefetch>
        <strong>{{ news.title }}</strong>
      </NuxtLink>
      - {{ news.dscr }}
    </li>
  </ul>
</template>

<script setup>
useArticleStore().fillIfNeeded()
const codaNews = useArticleStore().getLast5()
</script>
