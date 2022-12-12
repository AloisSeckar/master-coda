<template>
  <div>
    <div>
      <h2>{{ id }}</h2>
      These are not the articles you are looking for. Keep browsing. Keep browsing.
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params.article.toString()
</script>
