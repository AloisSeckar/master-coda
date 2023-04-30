Modul [Nuxt Content](https://content.nuxtjs.org/) je elegantní způsob, jak si usnadnit tvorbu obsahu na webu. Místo složitého šablonování vlastního HTML + CSS je možné jednoduše vzít něco lepšího - například [Markdown](https://www.markdownguide.org/). Stačí dodat zdrojová data, Nuxt Content zařídí za vás, aby se obsah správně vykreslil. A `.md` soubory to nekončí, umí pracovat i s dalšími formáty. V tomto díle tutoriálu si však ukážeme pouze implementaci souborů stylovaných pomocí Markdown syntaxe.

## Případová studie

Pro příklad použití v praxi nemusíme chodit daleko - právě ho čtete. Když jsem s webem Master Coda začínal, původní myšlenka byla mít samostatnou Nuxt komponentu pro každý jednotlivý článek. To znamenalo mít ji plnou stylovaných HTML tagů, aby se obsah vykresloval tak, jak by se mi líbilo. Bylo to pracné a těžkopádné. Pak jsem se dozvěděl o existenci Nuxt Content.

Výsledkem je, že samotný obsah článku žije ve svém souboru `jmeno-clanku.md` v adresáři `/content/article/`. Chcete-li se pro zajímavost podívat, tady najdete, [jak vypadá tento článek](https://github.com/AloisSeckar/master-coda/blob/master/content/article/nuxt-content.md).

Zvolil jsem Markdown, protože tuto syntaxi celkem dobře znám z různých MediaWiki stránek. Píše se mnohem snáz než těžkopádné HTML s CSS třídami. CSS (resp. [Tailwind]('/article/nuxt-tailwind')) jsem tedy úplně neopustil, ale stylování je nyní globální a o těžkou práci s přiřazováním tříd se stará Nuxt Content, který v sobě navíc obsahuje i zabudovaný syntax-highlighting pro označené bloky zdrojového kódu.

Jak to celé zprovoznit, to si řekneme vzápětí:

## Setup

Prvním krokem je doplnit závislost na `@nuxt/content` do `devDependencies` v projektovém `package.json` souboru.

Poté zavést příslušný modul do `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  // ...
  modules: [
    // ...
    '@nuxt/content'
    // ...
  ]
})
```

Strukturovaný obsah, který budete chtít vykreslovat, umístěte do složky `/content`. Tato složka se chová stejně jako `/pages` - aktuální cesta dle URL v prohlížeči se automaticky se namapuje příslušný obsah. Pomocí podadresářů lze vytvářet složitější struktury. V místech, kde se má strukturovaný obsah vykreslovat, použijte komponentu `<ContentDoc />`. Pokud chcete, můžete ji použít zcela místo `<NuxtPage />` a namísto klasických `/pages` dodávat veškerý věcný obsah vašeho webu už jen přes Nuxt Content.

Dá se to ale i kombinovat, jako to mám například použito zde na svém webu. Klasické struktury komponent pro jednotlivé stránky jsem se nevzdal, komponentu `<ContentDoc />` používám pouze na stránce `/pages/article/[article].vue` - mezi společnou hlavičkou a patičkou, což zase jsou klasické Vue komponenty. Když tedy navštívíte v prohlížeči stránku článku, Nuxt načte globálně společné části definované v šabloně `app.vue`, potom hlavičku a patičku společnou pro všechny články a mezi ně pomocí modulu Nuxt Content naservíruje příslušný `.md` soubor ze složky `/content/article`.

Pokud byste náhodou zkusili navštívit URL neexistujícího článku, stačí komponentě dodat obsah, který má vykreslit, pokud nenalezne odpovídající obsah v očekávané cestě. Dělá se to velmi jednoduše pomocí [pojmenovaného slotu](https://vuejs.org/guide/components/slots.html#named-slots) `#not-found`:

```js
<ContentDoc>
  <template #not-found>
    These are not the articles you are looking for. Keep browsing. Keep browsing.
  </template>
</ContentDoc>
```

Poslední věcí, kterou bych chtěl ukázat, je už zmíněný syntax-highlighting. Nuxt Content má potřebné nástroje v sobě. Pokud pomocí "backticku" začnete psát inline kód nebo pomocí tří "backticků" blok kódu, modul je při vykreslování sám aplikuje a zdrojový kód barevně odliší. Můžete si vybrat, jaký [barevný styl](https://github.com/shikijs/shiki/blob/main/docs/themes.md) použijete. Dělá se to v `nuxt.config.ts` ve vlastní sekci `content`, kterou si modul přináší:

```js
content: {
  highlight: {
    theme: 'dracula'
  }
}
```

Kdyby vás možnosti nastavení modulu zajímaly blíže, [zde je dokumentace](https://content.nuxtjs.org/api/configuration).

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-content @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-content)

## Shrnutí

Pomocí modulu Nuxt Content si můžete velmi usnadnit práci s tvorbou obsahu vašeho webu. Může vás odstínit od těžké a zbytečné práce s HTML a CSS a umožní vám více se soustředit na věcnou kvalitu vámi tvořeného obsahu.

Neukázali jsme si ani zdaleka vše, co modul umí. Ale i s tímto málem už můžete tvořit velké věci.
