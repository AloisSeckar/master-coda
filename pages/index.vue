<template>
  <div>
    <h1>Master Coda</h1>
    <p class="my-2">
      Jmenuji se Alois Sečkár, živí (a&nbsp;baví) mě programování a&nbsp; věci, které jsem se přitom naučil,
      si nechávat jen pro sebe.
    </p>
    <p class="my-2">
      Na tomto blogu naleznete články o&nbsp;nejrůznějších IT tématech. Snad mé texty někomu pomohou. Budu rád
      i&nbsp;za zpětnou vazbu, pokud v nich uvidíte chybu nebo znáte způsob, jak danou věc řešit lépe. Vždycky
      je kam se zlepšovat.
    </p>
    <p class="mt-4 text-xs">
      <strong>Pozn.:</strong> S účtem
      <NuxtLink to="https://twitter.com/MasterCoda" :external="true">
        MasterCoda
      </NuxtLink>
      na Twitteru nemám nic společného.
    </p>
  </div>
</template>

<script setup lang="ts">
usePageMeta(CODA_TITLE, CODA_DSCR)
</script>
