<template>
  <div id="page">
    <CodaHeader/>
    <main>
      <router-view></router-view>
    </main>
    <CodaFooter/>
  </div>
</template>

<style>
  :root {
    --color-bg: black;
    --color-text: white;
    --color-mark: #FFCC00;
    --color-mark-v2: #FFAA00;
  }

  html {
    font-size: 15px;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: Arial, sans-serif;
  }

  a:link, a:visited, a:active {
    color: var(--color-mark);
    text-decoration: none;
  }
  a:hover {
    color: var(--color-mark-v2);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-mark);
    font-family: 'Courier New', monospace;
  }

  #page {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>