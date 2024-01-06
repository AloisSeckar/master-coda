<template>
  <div>
    <span class="mr-2 text-coda-purple">{{ article?.date }}</span>
    <NuxtLink :to="article?.link" :external="article?.external" noprefetch>
      <strong>{{ article?.title }}</strong>
    </NuxtLink>
    - {{ article?.dscr }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: ArticleLink
}>()
</script>
