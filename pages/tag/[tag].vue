<template>
  <div>
    <div>Všechny články podle tagu</div>
    <h1>{{ tag }}</h1>
    <ul class="list-disc articleList">
      <li v-for="article in articles" :key="article.id">
        <NuxtLink :to="{ path: '/article/' + article.id }">
          <strong>{{ article.title }}</strong>
        </NuxtLink>
        - {{ article.dscr }}
      </li>
    </ul>
    <div v-if="(articles.length === 0)">
      Žádné články
    </div>
  </div>
</template>

<script setup lang="ts">
const tag = useRoute().params.tag.toString()
const articles = computed(() => useArticleStore().getByTag(tag))
</script>
