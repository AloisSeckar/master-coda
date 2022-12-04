<template>
    <div>
        <h2>{{ cat }}</h2>
        <ul v-if="(articles.length > 0)">
            <li v-for="article in articles">{{ article.title }}</li>
        </ul>
        <div v-else>No articles here</div>
    </div>
</template>

<script setup lang="ts">
const cat = useRoute().params.cat
const articles = computed(() => useArticleStore().getByCategory(cat))
</script>