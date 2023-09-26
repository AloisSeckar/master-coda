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
        <div class="m-1 w-64 inline-block">
          <div v-if="nextEnabled" :class="buttonClass" @click="next">
            <div class="actionButtonText">
              Novější
            </div>
          </div>
        </div>
        <div class="m-1 w-64 inline-block">
          <div v-if="prevEnabled" :class="buttonClass" @click="prev">
            <div class="actionButtonText">
              Starší
            </div>
          </div>
        </div>
      </div>
    </div>
    <a :href="imagePath" target="_blank">
      <img class="mx-auto my-4 h-96 w-auto" :src="imagePath" :alt="imageData.title">
    </a>
  </div>
</template>

<script setup lang="ts">
import { Fun } from '@/composables/useFunStore'

const buttonClass = 'actionButton w-full hover:cursor-pointer inline-block'

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
const imagePath = ref(useAsset('img/fun/' + imageData.id + '.jpg'))

const init = () => {
  initial.value = false
  reloadImage()
}

const next = () => {
  funStore.nextImage()
  reloadImage()
}
const nextEnabled = computed(() => funStore.index < funStore.items.length - 1)

const prev = () => {
  funStore.prevImage()
  reloadImage()
}
const prevEnabled = computed(() => funStore.index > 0)

const reloadImage = () => {
  const newImage = funStore.items[funStore.index]
  imageData.id = newImage?.id || '_zoidberg'
  imageData.title = newImage?.title || 'Haha?'
  imagePath.value = useAsset('img/fun/' + imageData.id + '.jpg')
}

onBeforeRouteLeave(() => {
  initial.value = true
})

usePageMeta(CODA_PAGE_META)
</script>
