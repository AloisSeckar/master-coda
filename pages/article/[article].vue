<template>
  <div>
    <ArticleHeader />
    <div class="article">
      <ContentDoc>
        <template #not-found>
          These are not the articles you are looking for. Keep browsing. Keep browsing.
        </template>
      </ContentDoc>
    </div>
    <NuxtTutorialNavigation v-if="isNuxtTutorial" />
    <ArticleFooter />
  </div>
</template>

<script setup lang="ts">
const isNuxtTutorial = useRoute().params.article?.includes('nuxt-')
</script>
