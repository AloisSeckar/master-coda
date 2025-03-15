---
file: 'nuxt-content'
cat: 'web'
title: 'Nuxt Tutorial 10 - Nuxt Content'
dscr: 'Nuxt + Nuxt Content = tvorba obsahu bez zbytečných komplikací'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'Markdown']
date: '2024-10-05'
created: '05.10.2024'
edited: '09.02.2025'
---

V minulém díle jsme se zabývali zpracováním formulářů. Neméně důležitá než interakce s uživatelem je ale i samotná prezentace dat. Zejména pokud je na webu více obsahu (blogy, tutoriály, apod.), je třeba řešit vzhled a formátování textu. S Nuxtem je to opět mnohem snazší, pokud víte, jak na to.

## Nuxt Content

Modul [Nuxt Content](https://content.nuxt.com/) je elegantní způsob, jak si tvorbu obsahu na webu usnadnit. Místo složitého šablonování vlastního HTML + CSS či integrace nějakého rich-text editoru a ukládání textů do databáze, je možné v rámci projektu jednoduše začlenit psaní pomocí [Markdown syntaxe](https://www.markdownguide.org/). Stačí dodat soubory se zdrojovými daty a Nuxt Content už zařídí za vás, aby se obsah správně vykreslil. A `.md` soubory to nekončí, umí pracovat i s dalšími formáty, například `.json`.

Zde si však ukážeme pouze implementaci souborů stylovaných v Markdownu.

## Případová studie

Pro příklad použití v praxi nemusíme chodit daleko - právě ho čtete. Když jsem s webem Master Coda začínal, původní myšlenka byla mít samostatnou Nuxt komponentu pro každý jednotlivý článek. To znamenalo mít ji plnou stylovaných HTML tagů, aby se obsah vykresloval tak, jak by se mi líbilo. Bylo to pracné a těžkopádné. Pak jsem se dozvěděl o existenci Nuxt Content.

Výsledkem je, že samotný obsah článku žije ve svém souboru `jmeno-clanku.md` v adresáři `/content/article/`. Chcete-li se pro zajímavost podívat, tady najdete, [jak vypadá tento článek](https://github.com/AloisSeckar/master-coda/blob/master/content/article/nuxt-content.md).

Zvolil jsem Markdown, protože tuto syntaxi celkem dobře znám z různých MediaWiki stránek. Píše se mnohem snáz než těžkopádné HTML s CSS třídami. O těžkou práci s formátováním textu se nyní stará Nuxt Content, který v sobě navíc obsahuje i zabudovaný syntax-highlighting pro označené bloky zdrojového kódu.

Jak to celé zprovoznit, to si řekneme vzápětí.

## Setup

Prvním krokem je doplnit závislost na `@nuxt/content` do `devDependencies` v projektovém `package.json` souboru.

Poté zavést příslušný modul do `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  // ...
  modules: [
    // ...
    '@nuxt/content'
    // ...
  ]
})
```

Strukturovaný obsah, který budete chtít vykreslovat, umístěte do složky `/content`. Tato složka se chová stejně jako `/pages` - aktuální cesta dle URL v prohlížeči se automaticky se namapuje příslušný obsah. Pomocí podadresářů lze vytvářet složitější struktury. V místech, kde se má strukturovaný obsah vykreslovat, použijte komponentu `<ContentRenderer />`. Pokud chcete, můžete ji použít zcela místo `<NuxtPage />` a namísto klasických `/pages` dodávat veškerý věcný obsah vašeho webu už jen přes Nuxt Content.

Dá se to ale i kombinovat, jako to mám například použito zde na svém webu. Klasické struktury komponent pro jednotlivé stránky jsem se nevzdal, komponentu `<ContentRenderer />` používám pouze na stránce `/pages/article/[article].vue` - mezi společnou hlavičkou a patičkou, což zase jsou klasické Vue komponenty. Když tedy navštívíte v prohlížeči stránku článku, Nuxt načte globálně společné části definované v šabloně `app.vue`, potom hlavičku a patičku společnou pro všechny články a mezi ně pomocí modulu Nuxt Content naservíruje příslušný `.md` soubor ze složky `/content/article`.

Od verze 3 (leden 2025) je potřeba zpracovaný Markdown obsah vložit do vykreslovací komponenty pomocí vlastnosti `value`. Nejjednodušší způsob, jak se k hodnotě dostat, je využít utility funkci `queryCollection`. Výchozí kolekce, do které modul načte obsah složky `content`, se jmenuje (nepřekvapivě) také `content`. Pomocí [konfigurace](https://content.nuxt.com/docs/collections/define) se s tím dá pracovat a organizovat si své vlastní kolekce. Já toho využil a pojmenoval svou kolekci `articles`. Není potřeba nic dalšího, než založit soubor `content.config.ts`. Nuxtu nemusíte o jeho existenci nic říkat, sám ho zjistí.

```ts
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      source: 'article/*',
      type: 'page',
    }),
  },
})
```

Data článků načítám v kombinaci s Nuxt composable `useRoute()`, která obsahuje informace o aktuální relativní URL. A protože jde o asynchronní operaci, pro načítání dat je obaleno v `useAsyncData`.

```ts
const { data: articleText } = await useAsyncData(() => queryCollection('articles').path(useRoute().path).first())
```

Pokud byste náhodou zkusili navštívit URL neexistujícího článku, mám ještě fallback text, který se vypíše místo vykreslení komponenty se zformátovaným Markdown obsahem. Celé to tedy v šabloně stránky vypadá takto:

```vue
<ContentRenderer v-if="articleText" :value="articleText" />
<div v-else class="mb-6">
  These are not the articles you are looking for. Keep browsing. Keep browsing.
</div>
```

V rámci Markdownu je legitimní používat HTML vč. tagů pro Vue komponenty (za předpokladu, že jsou umístěny ve složce `/components/global` a tím globálně registrované), ale je podporována i přirozenější integrace do Markdownu. Pokud své komponenty máte ve složce `\components\content`, modul si je automaticky načte a můžete je následně referencovat přes dvojtečku a kebab-case název. Do složených závorek pak předáte atributy vlastností (props).

Takto například ve svých článcích používám komponentu pro vykreslení obrázků:

```ts
:article-image{src="redukce-velikosti-fontu/homepage.jpg" alt="www.alois-seckar.cz" link="http://www.alois-seckar.cz"}
```

Poslední věcí, kterou bych chtěl ukázat, je už zmíněný syntax-highlighting. Nuxt Content má potřebné nástroje v sobě. Pokud pomocí "backticku" začnete psát inline kód nebo pomocí tří "backticků" blok kódu, modul je při vykreslování sám aplikuje a zdrojový kód barevně odliší. Můžete si vybrat, jaký [barevný styl](https://github.com/shikijs/shiki/blob/main/docs/themes.md) použijete. Dělá se to v `nuxt.config.ts` ve vlastní sekci `content`, kterou si modul přináší:

```ts
content: {
  build: {
    markdown: {
      highlight: {
        theme: 'dracula',
      },
    },
  },
}
```

Kdyby vás další možnosti nastavení modulu zajímaly blíže, [zde je dokumentace](https://content.nuxt.com/docs/getting-started/installation).

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-content @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-content3)

## Shrnutí

Pomocí modulu Nuxt Content si můžete velmi usnadnit práci s tvorbou obsahu vašeho webu. Může vás odstínit od těžké a zbytečné práce s HTML a CSS a umožní vám více se soustředit na věcnou kvalitu vámi tvořeného obsahu. Neukázali jsme si ani zdaleka vše, co modul umí. Ale i s tímto málem už můžete tvořit velké věci.

Možnosti našeho webu se nám pomalu rozrůstají. Abychom odemkli další level, ukážeme si v příštím díle tutoriálu [správu stavu](/article/nuxt-pinia), díky níž budeme moci efektivně distribuovat a udržovat data napříč celou aplikací.
