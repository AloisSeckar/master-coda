<template>
  <div class="flex justify-center">
    <div class="w-4/5">
      <CodaHeader />
      <main>
        <NuxtPage />
      </main>
      <CodaFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
useArticleStore().fill()
</script>
