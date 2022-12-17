<template>
    <div>
        <h1>{{ article?.title }}</h1>
        <div class="text-xs text-amber-300 mb-1">
            {{ article?.created }} 
            <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
        </div>
        <div>{{ article?.dscr }}</div>
        <div class="text-xs text-amber-300">----------------------------------</div>
    </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
const article = computed(() => useArticleStore().getById(id))
const edited = article.value?.created != article.value?.edited
</script>