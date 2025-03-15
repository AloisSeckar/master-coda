<template>
  <div class="pt-1 text-xs">
    <div class="my-1 text-coda-yellow">
      ----------------------------------------
    </div>
    <div v-if="article">
      <div class="font-bold">
        {{ article.title }} @ Master Coda
      </div>
      <a class="block" :href="link.replace('##', 'blob')">Zobrazit zdrojový kód článku</a>
      <a class="block" :href="link.replace('##', 'edit')">Navrhnout úpravu</a>
    </div>
    <div v-else>
      <div class="font-bold">
        Články @ Master Coda
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  article: { type: Object as PropType<ArticlesCollectionItem>, required: true },
})
const github = useRuntimeConfig().public.github
const link = `${github}/master-coda/##/master/content/article/${props.article?.file}.md`
</script>
