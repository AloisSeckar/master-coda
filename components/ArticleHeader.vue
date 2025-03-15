<template>
  <div class="p-2">
    <h1>{{ article?.title }}</h1>
    <div class="text-xs text-coda-yellow mb-1">
      {{ article?.created }}
      <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
    </div>
    <div class="mb-2">
      {{ article?.dscr }}
    </div>
    <div class="flex flex-wrap items-center text-coda-yellow">
      <strong v-if="article?.tags?.length > 0">Tagy:&nbsp;</strong>
      <span v-for="tag in article?.tags" :key="tag" class="actionButton px-1 pb-1">
        <NuxtLink :to="{ path: '/tag/' + tag }">
          <span class="actionButtonText" style="text-decoration-line: none !important;">{{ tag }}</span>
        </NuxtLink>
      </span>
    </div>
    <div class="my-1 text-xs text-coda-yellow">
      ----------------------------------------
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  article: { type: Object as PropType<ArticlesCollectionItem>, required: true },
})
const edited = props.article?.created !== props.article?.edited
</script>
