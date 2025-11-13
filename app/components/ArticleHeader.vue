<template>
  <div class="p-2">
    <h1>
      <span v-if="article?.english" class="inline-block text-xs text-coda-yellow!">
        <NuxtLink :to="article.english" class="inline" target="_blank">
          <NuxtImg
            src="/img/en-flag.webp" alt="Link to English version"
            title="You can read this article in English @ dev.to"
            :width="50" :height="30" class="rounded"
          />
        </NuxtLink>
      </span>
      {{ article?.title || path }}
    </h1>
    <div class="text-xs text-coda-yellow! mb-1">
      {{ article?.created }}
      <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
    </div>
    <div class="mb-2">
      {{ article?.dscr }}
    </div>
    <div class="flex flex-wrap items-center text-coda-yellow!">
      <strong v-if="article && article.tags?.length > 0">Tagy:&nbsp;</strong>
      <span v-for="tag in article?.tags" :key="tag" class="actionButton px-2 pb-1 pt-0.5">
        <NuxtLink :to="{ path: '/tag/' + tag }">
          <span class="actionButtonText text-sm font-mono" style="text-decoration-line: none !important;">{{ tag }}</span>
        </NuxtLink>
      </span>
    </div>
    <div class="my-1 text-xs text-coda-yellow">
      ----------------------------------------
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  article: ArticlesCollectionItem | undefined
}>()
const edited = props.article?.edited && props.article.edited !== props.article.created
const path = useRoute().path.replace('/article/', '')
</script>
