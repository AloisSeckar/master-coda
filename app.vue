<template>
  <div class="flex justify-center">
    <div class="w-4/5">
      <CodaHeader />
      <main>
        <NuxtPage />
      </main>
      <CodaFooter />
    </div>
  </div>
</template>

<style>
.code {
  font-family: 'Courier New', monospace;
  text-align: left;
  background-color: #c8c8af;
  color: black;
}

div.code {
  padding: 0.5rem 1rem;
}

span.code {
  padding: 0 0.2rem;
}

.j-key {
  color: blue;
}

.j-var {
  color: green;
}

.j-lit {
  color: purple;
}

.j-com {
  color: darkgray;
}
</style>