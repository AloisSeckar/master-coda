<template>
    <div>
        <h1 class="text-center">{{ random?.title }}</h1>
        <div class="actionButton w-64 mx-auto hover:cursor-pointer" @click="funStore.getRandom()">
            <div class="actionButtonText">NĚCO JINÉHO (je tu {{ total }} obrázků)</div>
        </div>
        <img class="mx-auto my-4" :src="'/fun/' + random?.id + '.jpg'" :alt="random?.title" />
    </div>
</template>

<script setup lang="ts">
const funStore = useFunStore()
if (!funStore.loaded) {
    funStore.fill()
}
const random = computed(() => funStore.random)
const total = computed(() => funStore.items.length)
</script>