<template>
  <h2>
    {{ title }}
  </h2>
  <p class="flex items-center gap-2">
    <NuxtImg
      src="/img/en-flag.webp" alt="English flag"
      title="Články v AJ" class="inline-block"
      :width="25" :height="15"
    />
    {{ dscr }}
  </p>
  <NavigationArticleList :articles="externalArticles" />
  <p v-if="moreArticles" class="mb-4">
    <NuxtLink :to="moreArticles" noprefetch>
      Zobrazit vše
    </NuxtLink>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  dscr: string
  externalArticles: ArticleLink[]
  moreArticles: string
}>()
</script>
