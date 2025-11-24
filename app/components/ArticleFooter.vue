<template>
  <div class="pt-1 text-xs">
    <div class="my-1 text-coda-yellow">
      ----------------------------------------
    </div>
    <div v-if="article">
      <div v-if="article.english" class="flex flex-row items-center gap-2 mb-2">
        <NuxtImg
          src="/img/en-flag.webp" alt="English version available"
          title="English version available"
          :width="25" :height="15" class="rounded inline-block"
        />
        <a class="block text-sm" :href="article.english">
          You can read this article in English at <span class="font-mono">dev.to</span>
        </a>
      </div>
      <div class="font-bold">
        {{ article.title }} @ Master Coda
      </div>
      <a class="block" :href="link.replace('##', 'blob').concat('?plain=1')">Zobrazit zdrojový kód článku</a>
      <a class="block" :href="link.replace('##', 'edit')">Navrhnout úpravu</a>
    </div>
    <div v-else>
      <div class="font-bold">
        Články @ <NuxtLink to="/">Master Coda</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticlesCollectionItem } from '@nuxt/content'

const props = defineProps<{
  article: ArticlesCollectionItem | undefined
}>()
const github = useRuntimeConfig().public.github
const link = `${github}/master-coda/##/master/content/article/${props.article?.file}.md`
</script>
