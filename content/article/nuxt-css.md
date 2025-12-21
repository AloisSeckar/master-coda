---
file: 'nuxt-css'
cat: 'web'
title: 'Nuxt Tutorial 7 - Práce s CSS styly'
dscr: 'Nuxt - jak oživit vzhled aplikace pomocí externího CSS'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS', 'Tailwind']
date: '2025-12-21'
created: '21.12.2025'
english: 'https://dev.to/aloisseckar/nuxt-tutorial-7-adopting-css-1m2a'
---

Už umíme Nuxt aplikaci rozhýbat a používat různé stavební prvky, ze kterých ji lze poskládat. Teď je na čase dát našim stránkám trochu důstojný vzhled. To už si teoreticky můžeme zařídit sami - s pomocí CSS stylů definovaných v rámci sekcí `<style>` jednotlivých komponent. Kdo si na to věří a umí to, může mít zanedlouho krásný web.

Většinou ale spíše nechceme sami dělat vše znovu od začátku. V tomto článku si proto nejprve ukážeme, jak snadno importovat celé připravené CSS soubory, a poté i dvě ukázkové integrace s projekty, které práci s vzhledem výrazně usnadňují - `Tailwind CSS` a `Open Props`.

## Import CSS

Pokud migrujete nějaký svůj starší projekt, možná už `.css` soubory stylů máte hotové. Nebo jste využili nějakou ze služeb, které své styly jako samostatný `.css` poskytují (třeba při [použití Bootstrap z CDN](https://getbootstrap.com/docs/5.3/getting-started/download/#cdn-via-jsdelivr)). Nuxt pro tyto případy nabízí velmi jednoduchou integraci.

Svoje soubory stylů nahrajte do složky `/app/assets` (obvykle do podadresáře `/css` kvůli přehlednosti). Poté je možné se na ně odkázat pomocí volby `css` v `nuxt.config.ts` konfiguračním souboru:

```ts
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
  // ...
})
```

Importované styly jsou následně automaticky dostupné napříč celou aplikací.

Pokud by to bylo třeba, je možné je načítat rovněž individuálně pro každou vaši komponentu. Buďto ve `<script setup>` sekci:

```vue
<script setup lang="ts">
import '~/assets/css/main.css'
</script>
```

nebo uvnitř `<style>`:

```vue
<style>
@import url("~/assets/css/main.css");
</style>
```

Jen s tím se už dá leccos vytvořit. Pro příklady integrací s pokročilejšími CSS/UI knihovnami však čtěte dále.

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) je CSS framework pro stylování obsahu webových stránek a aplikací. Na rozdíl od klasického přístupu k CSS nepíšete vlastní třídy, ale skládáte vzhled z rozsáhlé sady předdefinovaných CSS tříd, což umožňuje rychlé a flexibilní vytváření stylů a layoutů. Tailwind je navíc sám o sobě hodně přizpůsobivý a konfigurovatelný, například co se týká barevného schématu. 

Jeho popis by vydal na samostatný článek (což jsem měl původně v plánu a možná na to dojde časem). Pro mě je to nyní jasná volba č. 1 co se tvorby vzhledu webových stránek týká. Vyžaduje trochu jinou filosofii, ale zvykal jsem si den a už to nechci dělat jinak. Tailwind CSS používá třeba právě tento web - původní design jsem ještě nahodil "ručně", převést jej do odpovídající Tailwind struktury trvalo jeden večer.

Sluší se podotknout, že to není CSS framework "pro náročné", protože vás samozřejmě různě omezuje. Jiní mu zase vyčítají, že vytváří přílišnou abstrakci a dává uživatelům iluzi, že rozumí tomu, co dělají - do chvíle, než se chytnou do nějaké pasti, kterou pak neumí vyřešit, protože neznají pořádně CSS, které je pod tím. Jenže moje zkušenost je, že vám v 90+ % případů stačit bude a na řešení zbytku budete mít díky jeho efektivitě více času.

### Nuxt integrace

Začít používat Tailwind CSS je nyní úplná hračka. Jeho tvůrci distribuují plugin pro Vite (build nástroj, který Nuxt sestavuje), který stačí spolu s hlavní knihovnou v projektu nainstalovat:

```bash
npm install tailwindcss @tailwindcss/vite
```

A plugin přidat do `nuxt.config.ts` spolu s odkazem na CSS soubor, který Tailwind importuje:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // integrační vite plugin
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // css soubor s importem Tailwind tříd
  css: ['~/assets/css/tailwind.css']
  
  // ostatní nastavení...

});
```

Posledním krokem je vytvoření jednoduchého CSS souboru, který načítáme přes volbu `css`. Jeho obsah může být prostý:

```css
@import "tailwindcss";
```

### Demo aplikace

Výše uvedený postup si můžete vyzkoušet v praxi. Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-tailwind @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-tailwind)

Demo se zaměřuje jak na samotnou integraci, tak na ukázku použití. Veškerý vizuální projev je v souboru `/app/app.vue`. Obsahuje několik příkladů, jakým způsobem lze Tailwind CSS aplikovat. Je ukázáno, že definované třídy lze volně kombinovat s klasickým čistým CSS. V souboru `/app/assets/css/tailwind.css` se můžete podívat, jak snadno rozšířit výchozí nabídku Tailwind CSS `@theme` o vlastní barvy nebo fonty, pokud by vám [základní nabídka](https://tailwindcss.com/docs/colors) nestačila.

Na základě osobní špatné zkušenosti jsem se navíc rozhodl do dema netradičně přidat kromě pozitivních také jeden odstrašující příklad. Riskuju sice, že to někoho inspiruje k použití a vleze do stejné pasti jako kdysi já, ale mnohé z vás to snad uchrání od zbytečných problémů. O co jde? Tvůrci Tailwind CSS nabádají, aby se utility třídy používaly pokud možno přímo v HTML šablonách jako atributy jednotlivých elementů. To se samozřejmě nemusí každému (ahoj, mé starší já) líbit, protože:

1. Definice tříd mohou být opravdu dlouhé
2. Definice se opakují

Zároveň začátečník, který to vybaven obecnými programátorskými poučkami chce nějak začít řešit, dříve či později narazí na [direktivu `@apply`](https://tailwindcss.com/docs/functions-and-directives#apply-directive), jenž mu zdánlivě umožní znovupoužitelné třídy v CSS souborch definovat. Tedy ona mu to umožní dokonale, skutečně to funguje. Potíž je v tom, že to strašlivě zamlžuje implementaci. Po pár měsících zapomenete, že jste si `<div>` nastylovali globálně a divíte se, proč se inline definice neprojevují. V demo aplikaci je názorná ukázka s barvou HTML odkazu dole na stránce. O celé věci jsem se více rozepsal v [tomto článku](https://dev.to/aloisseckar/i-was-using-tailwind-wrong-so-you-dont-have-to-4h7j).

Konec odbočky. Na Tailwind CSS se určitě podívejte a třeba si ho oblíbíte stejně jako já a tísce dalších vývojářů, kteří upřednostňují rychlost a efektivitu před dokonalou kontrolou pomocí nativního CSS.

P.S.: Dříve jsem integraci řešil pomocí dedikovaného [Nuxt modulu](https://tailwindcss.nuxtjs.org/), který byl trochu jednodušší na zavedení (stačilo nainstalovat a přidat modul). Jeho aktuálním stavem si však nejsem jistý. Po vydání **Tailwind v4** mi přestal fungovat. Jeho nová verze "visí" už několik měsíců v beta fázi a skoro se zdá, že jeho historická úloha už skončila. Pokud se situace změní, vrátím se sem tento článek aktualizovat.

## Open Props

[Open Props](https://open-props.style/) staví na podobném principu jako Tailwind CSS - nabízí set předpřipravených stylů, jejichž použití vás sice bude trochu svazovat, ale na druhou stranu nemusíte všude znovu vynalézat kolo. Namísto celých předpřipravených CSS tříd jsou v tomto případě nositelem informace o výsledném stylu [CSS proměnné](https://www.jakpsatweb.cz/css/css-promenne.html#promenne), které můžete využít a skládat ve svých třídách. Pro úplnost musím dodat, že Tailwind v4 už CSS proměnné používá také a vy už jste si je možná i nevědomky vyzkoušeli (viz rozšiřování výchozího `@theme` v demo aplikaci).

Open Props jsou tedy o level níže. Neabstrahují od veškerého psaní CSS, pouze nabízejí již připravené a vyzkoušené hodnoty. To vám dává větší svobodu, ale zase je to trochu pracnější. Hlavní výhodou je odlehčenost a škálovatelnost. Knihovna umožňuje [použít jen menší část](https://open-props.style/#overview), která je zrovna potřeba.

### Nuxt integrace

Jelikož Nuxt (Vue) sám o sobě neumí při kompilaci nahrazovat CSS proměnné skutečnými hodnotami, je potřeba doplnit CSS procesor (v demu `postcss`) spolu s pluginem, který po nakrmení definicemi z `OpenProps` nahrazení hodnot provede. To je asi jediný zádrhel, jinak je prostě naimportován NPM balíček `open-props` a v demo ukázce nadefinováno ukázkové použití několika stylů.

Asi nejvíc se mi na Open Props líbí připravené [gradienty](https://open-props.style/#gradients), tedy plynulé přechody mezi barvami. Sice teoreticky není až takový problém psát si je sám pomocí čistého CSS, dokonce jsem nedávno sledoval demo na programování "editoru gradientů", ale pokud nejste duší webový designér a grafik, komu by se s tím chtělo mořit?

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-openprops @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-openprops)

## Shrnutí

Ukázali jsme si, jakým způsobem do Nuxt aplikací načítat interní i externí CSS soubory a příklad dvou CSS knihoven a jejich integrace. Nepochybně existuje celá řada dalších možností. Pokud nějakou oblíbenou grafickou knihovnu máte, podívejte se, zda už pro ni existuje Nuxt integrace (nejčastěji ve formě [modulu](https://nuxt.com/modules)). Pokud ne, možná stačí jen v úvodu popsaným způsobem načítat výsledné CSS soubory a používat je přímo. A kdybyste si nevěděli rady, napište a zkusíme spolu něco vymyslet.

V [příštím díle](/article/nuxt-gui){external} se od obecného stylování posuneme dále k pokročilejším **UI knihovnám**, které kromě stylů nabízejí i předpřipravené komponenty uživatelského rozhraní. Ukážeme si jich několik spolu s příkaldy jejich integrace do Nuxtu.
