<template>
    <div>
        <h1>{{ article?.title }}</h1>
        <div class="text-xs text-amber-300 mb-1">
            {{ article?.created }} 
            <span v-if="edited">(aktualizováno {{ article?.edited }})</span>
        </div>
        <div>{{ article?.dscr }}</div>
        <div class="my-2 text-fuchsia-600">
            <strong>Tagy:&nbsp;</strong>
            <span class="actionButton px-1 pb-1" v-for="tag in tags">
                <NuxtLink :to="{ path: '/tag/' + tag }">
                    <span class="actionButtonText">{{ tag }}</span>
                </NuxtLink>
            </span>
        </div>
        <div class="my-1 text-xs text-amber-300">----------------------------------------</div>
    </div>
</template>

<script setup lang="ts">
const path = useRoute().path
const id = path.substring(path.lastIndexOf('/') + 1)
const article = computed(() => useArticleStore().getById(id))
const edited = computed(() => article.value?.created != article.value?.edited)
const tags = computed(() => article.value?.tags)
</script>