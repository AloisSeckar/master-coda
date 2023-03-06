<template>
  <div class="p-2">
    <h1>{{ article?.title }}</h1>
    <div class="text-xs text-amber-300 mb-1">
      {{ article?.created }}
      <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
    </div>
    <div class="mb-2">
      {{ article?.dscr }}
    </div>
    <div class="flex flex-wrap items-center text-fuchsia-600">
      <strong v-if="tags?.length > 0">Tagy:&nbsp;</strong>
      <span v-for="tag in tags" :key="tag" class="actionButton px-1 pb-1">
        <NuxtLink :to="{ path: '/tag/' + tag }">
          <span class="actionButtonText">{{ tag }}</span>
        </NuxtLink>
      </span>
    </div>
    <div class="my-1 text-xs text-amber-300">
      ----------------------------------------
    </div>
  </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
let article = useArticleStore().getById(id)
if (!article) {
  article = useArticleStore().getEmpty
  article.title = id
}
const edited = article.created !== article.edited
const tags = article.tags
</script>
