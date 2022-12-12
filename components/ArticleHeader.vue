<template>
    <div>
        <h2>{{ article?.title }}</h2>
        <div>{{ article?.dscr }}</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: { type: String, required: true }
})
const article = computed(() => useArticleStore().getById(props.id))
</script>