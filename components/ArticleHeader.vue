<template>
    <div>
        <h1>{{ article?.title }}</h1>
        <div>{{ article?.dscr }}</div>
    </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
const article = computed(() => useArticleStore().getById(id))
</script>