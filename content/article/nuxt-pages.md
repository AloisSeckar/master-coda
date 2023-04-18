Základy Vue.js aplikací se staví pomocí **_komponent_**. Komponenta Vue.js je textový soubor s příponou `.vue`, která se obvykle skládá ze tří možných části:
- `<template>` - šablona, která definuje grafický vzhled po vykreslení (renderingu) a za běhu se převádí na skutečné HTML+CSS
- `<script>` - prostor pro JavaScriptovou (TypeScriptovou) definici speciální funkcionality komponenty
- `<style>` - možnost definice grafických CSS stylů

Poměrně často chybí sekce `<style>`, protože komoponenta buď nepotřeuje definovat žádné "svoje" styly, nebo se stylování řeší klasickým centralizovaným způsobem pomocí importu .css (nebo .scss, aj.) souborů. Setkáváme se také s komponentami bez sekce `<script>`, které definují pouze statický vzhled, nebo jednoduché JS výrazy používají inline přímo v `<template>`. Komponenta bez `<template>` je validní (musí však v takovém případě obsahovat `<script>` sekci), ale zatím jsem se nesetkal s praktickým použitím. Pro obslužný kód bez grafického výstupu je lépe použít jiné metody, o kterých si něco řekneme v dalších částech tutorialu.

Aby bylo možné komponenty používat na jiných místech Vue.js aplikace, je třeba je **_registrovat_** - buďto v jiné komponentě, kde je chcete použít, nebo to lze i globálně pro celou aplikaci. Ve vanilla Vue.js se to ale každopádně musí dělat ručně.

Aby mohla mít Vue.js aplikace více stránek než pouze úvodní obsah na úrovni domény, je třeba použít nástroj **Vue router** a nadefinovat cesty (routes) ke komponentám, které se mají pro tu kterou URL zadanou v prohlížeči zobrazit. Opět se to musí dělat ručně.

Nuxt programátory od obou těchto činností umí efektivně odstínit prostřednictvím speciálních adresářů `/components` a `/pages`, které si nyní představíme.

## /components

TODO popis
## /pages

TODO popis
## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-pages @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pages)

## Shrnutí

Nuxt usnadňuje práci s Vue.js komponentami tím, že automaticky skenuje dedikované adresáře `/components` a `/pages` a provádí automatickou globální registraci komponent do aplikace. Nad adresářovou a souborovou strukturou v rámci `/pages` navíc automaticky vytvoří routing pro navigaci z adresního řádku prohlížeče.
