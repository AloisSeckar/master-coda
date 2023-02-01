<template>
  <div>
    <h1 class="text-center">
      {{ imageData.title }}
    </h1>
    <div v-if="initial">
      <div class="w-[260px] mx-auto">
        <div :class="buttonClass" @click="init">
          <div class="actionButtonText">
            Prohlédnout si galerii
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-[200px] mx-auto text-center text-lg font-bold">
        {{ current }} / {{ total }}
      </div>
      <div class="w-[546px] mx-auto">
        <div :class="buttonClass" @click="next">
          <div class="actionButtonText">
            Novější
          </div>
        </div>
        <div :class="buttonClass" @click="prev">
          <div class="actionButtonText">
            Starší
          </div>
        </div>
      </div>
    </div>
    <img class="mx-auto my-4" :src="'/fun/' + imageData.id + '.jpg'" :alt="imageData.title">
  </div>
</template>

<script setup lang="ts">
import { Fun } from '@/composables/useFunStore'

const buttonClass = 'actionButton w-64 mx-2 hover:cursor-pointer inline-block'

const initial = ref(true)

const funStore = useFunStore()
if (!funStore.loaded) {
  funStore.fill()
}

const current = computed(() => funStore.index + 1)
const total = computed(() => funStore.items.length)

const imageData: Fun = reactive({
  id: '_zoidberg',
  title: 'Haha?',
  added: ''
})

const init = () => {
  initial.value = false
  reloadImage()
}
const next = () => {
  funStore.nextImage()
  reloadImage()
}
const prev = () => {
  funStore.prevImage()
  reloadImage()
}
const reloadImage = () => {
  const newImage = funStore.items[funStore.index]
  imageData.id = newImage.id
  imageData.title = newImage.title
}
</script>
