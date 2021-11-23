<template>
  <div id="page">
    <CodaHeader />
    <main>
      <NuxtPage />
    </main>
    <CodaFooter />
  </div>
</template>

<style>
  :root {
    --color-bg: black;
    --color-text: #708090;
    --color-mark: #FFCC00;
    --color-mark-v2: #FFAA00;
  }

  html {
    font-size: 16px;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: Arial, sans-serif;
    text-align: justify;
    line-height: 1.3;
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