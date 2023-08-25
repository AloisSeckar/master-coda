<template>
  <div v-bind="$attrs">
    <img :src="asset" :alt="alt">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true }
})
const asset = useAsset('img/articles/' + props.src)
</script>
