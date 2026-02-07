<template>
  <div class="p-2">
    <h1 class="mb-4">
      {{ article?.title || path }}
    </h1>
    <div class="px-4 py-2 border border-coda-yellow bg-slate-800">
      <div class="text-sm text-coda-yellow! mb-1">
        {{ article?.created }}
        <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
      </div>
      <div class="mb-2">
        {{ article?.dscr }}
      </div>
      <div v-if="article?.english" class="flex flex-row items-center gap-2 mb-2">
        <NuxtImg
          src="/img/en-flag.webp" alt="English version available"
          title="English version available"
          :width="25" :height="15" class="rounded inline-block"
        />
        <a class="block text-sm" :href="article.english">
          You can read this article in English at <span class="font-mono">dev.to</span>
        </a>
      </div>
      <div class="flex flex-wrap items-center text-coda-purple!">
        <strong v-if="article && article.tags?.length > 0">Tagy:&nbsp;</strong>
        <span v-for="tag in article?.tags" :key="tag" class="actionButton px-2 pb-1 pt-0.5">
          <NuxtLink :to="`/tag/${tag}`">
            <span class="actionButtonText text-sm font-mono" style="text-decoration-line: none !important;">{{ tag }}</span>
          </NuxtLink>
        </span>
      </div>
      <div v-if="!article" class="mb-2">
        These are not the articles you are looking for.<br>Keep browsing. Keep browsing...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  article?: ArticlesCollectionItem
}>()
const edited = props.article?.edited && props.article.edited !== props.article.created
const path = useRoute().path.replace('/article/', '')
</script>
