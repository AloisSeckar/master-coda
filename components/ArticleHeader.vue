<template>
    <div>
        <h2>{{ article?.title }}</h2>
        <div>{{ article?.dscr }}</div>
    </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
const article = computed(() => useArticleStore().getById(id))
</script>