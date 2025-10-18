<template>
  <div v-bind="$attrs">
    <a v-if="link" :href="link" :title="alt">
      <NuxtImg
        :src="`/img/articles/${src}`"
        :alt="alt" :title="alt"
        :class="width + ' h-auto'"
      />
    </a>
    <NuxtImg
      v-else :src="`/img/articles/${src}`"
      :alt="alt" :title="alt"
      :class="width + ' h-auto'"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  link: { type: String },
  width: { type: String, default: 'w-96' },
})
</script>
