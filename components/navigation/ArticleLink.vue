<template>
  <div>
    <span class="mr-2 text-coda-purple">{{ article?.date }}</span>
    <div v-if="active" class="inline">
      <NuxtLink :to="article?.link" :external="article?.external" noprefetch>
        <strong>{{ article?.title }}</strong>
      </NuxtLink>
      - {{ article?.dscr }}
    </div>
    <div v-else class="inline text-coda-purple font-bold">
      &#9654; {{ article.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: ArticleLink
  active: boolean
}>()
</script>
