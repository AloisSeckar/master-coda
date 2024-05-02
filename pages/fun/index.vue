<template>
  <div>
    <h1 class="text-center">
      {{ imageData.title }}
      <span v-if="imageData.explain" :title="imageData.explain">
        <Icon name="material-symbols:help" color="gold" class="w-8 pb-1" />
      </span>
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
      <NuxtImg
        class="mx-auto my-4 h-[350px] w-auto"
        :src="imagePath"
        :alt="imageData.title"
        title="Kliknutím zobrazíte plnou velikost"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
const buttonClass = 'actionButton w-full hover:cursor-pointer inline-block'

const initial = ref(true)

const funStore = useFunStore()
if (!funStore.loaded) {
  funStore.fill()
}

const current = computed(() => funStore.index + 1)
const total = computed(() => funStore.items.length)

const imageData: Ref<Fun> = ref({
  id: '_zoidberg',
  title: 'Haha?',
  added: '',
})
const imagePath = computed(() => `/img/fun/${imageData.value.id}.jpg`)

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
  imageData.value.id = newImage?.id || '_zoidberg'
  imageData.value.title = newImage?.title || 'Haha?'
  imageData.value.explain = newImage?.explain
}

onBeforeRouteLeave(() => {
  initial.value = true
})

usePageMeta(CODA_PAGE_META)
</script>
