---
file: 'nuxt-utils'
cat: 'web'
title: 'Nuxt Tutorial 3 - Utils & Composables'
dscr: 'Nuxt - jak fungují složky /utils a /composables'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial']
date: '2025-11-15'
created: '15.11.2025'
english: 'https://dev.to/aloisseckar/nuxt-tutorial-3-utils-composables-3o51'
---

V [předchozím díle](/article/nuxt-pages){external} jsme se učili pracovat s komponentami a stránkami. Pokud se opakuje nějaká část šablony, je v souladu s programátorským [DRY principem](https://zdrojak.cz/clanky/navrhove-principy-dry/) horkým kandidátem na extrakci do samostatné nové komponenty. Co když se však opakují metody pro práci s daty v sekci `<script>`? Nebo chceme aplikaci lépe členit a vyhnout se hrozivě dlouhým souborům komponent, ve kterých se pak špatně orientuje?

Logiku z JavaScript (TypeScript) kódu můžeme samozřejmě dát stranou také. Nuxt zařídí automatický import napříč aplikací, pokud příslušné soubory umístíme do dalších dvou speciálních složek - `/app/utils` a `/app/composables`.

**Pozn.:** Také tyto složky jsou v Nuxt v4 nově uvnitř adresáře `/app`, zatímco dříve jste je našli přímo v kořenovém adresáři projektu.

## Export a import v JavaScriptu

Funkci nebo konstantu JavaScriptu lze pomocí klíčového slova `export` zviditelnit pro další soubory, které by ji chtěly použít. Obecně platí, že definici je třeba na druhé straně zase „importovat“ - `import { foo } from ./foo.js`. Více o modulech (vč. nuance s „default“ exporty) například [ZDE](https://www.w3schools.com/js/js_modules.asp). Tento způsob pojmenovaný „ESM“ je dnes de-facto standardem, přestože leckde ještě můžete narazit na starší variantu (CommonJS). My se budeme držet ESM.

Funguje to dobře i v Nuxtu, ten nás ovšem dokáže od nutnosti psát explicitní importy v mnoha případech odstínit. Soubory ve složkách `/app/utils` a `/app/composables` jsou automaticky proskenovány a na pozadí nalinkovány tak, aby z nich exportované prvky byly všude přístupné, aniž by bylo nutné dělat cokoliv dalšího. Mechanismu se říká [auto-import](https://nuxt.com/docs/4.x/guide/concepts/auto-imports). Popravdě i složka `/app/components`, o které jsme mluvili minule, funguje na stejném principu (navíc danou komponentu registruje v rámci Vue.js aplikace). Dále jsou tímto způsobem automaticky přístupné všechny Vue.js a Nuxt API metody a komponenty.

Není pochopitelně nařízeno ukládat si své vlastní soubory pouze do definovaných složek, lze si je umisťovat kamkoliv, ale z jiných adresářů už importy obvykle potřeba jsou. Naopak někomu nevyhovuje, pokud nevidí, co přesně ve svém kódu používá odjinud. Pro takové případy je možné importovat tak, jak jste zvyklí - z relativní cesty k souboru. Ovšem ještě lepší je využít tzv. aliasy - `#imports` pro auto-importované funkce a `#components` pro komponenty. Např.:

```ts
// computed pochází z Vue, mojeFunkce z vlastního souboru v /app/utils
import { computed, mojeFunkce } from '#imports'
```

Mě se líbí, když se o importy nemusím zbytečně starat. Patrně to je důsledek mé Java minulosti, kde importy tříd často zabírají víc řádků než je zdrávo. Pojďme si tedy ukázat, jak to vypadá, když auto-importy pracují.

## /app/utils

Do složky `/app/utils` je doporučeno umisťovat tzv. **bezstavovou** logiku - tj. pomocné funkce, které pracují pouze s deklarovanými vstupy a jejich výstup nijak nezávisí na momentálním stavu aplikace.

Nuxt během sestavení projde všechny soubory ve složce a cokoliv je uvozeno klíčovým slovem `export` zpřístupní v celém zbytku aplikace. Všude jinde stačí exportovaný prvek prostě použít.

**TIP:** Automatický import bude dostupný až po novém sestavení. Pokud vám běží dev server, hot-reload to zařídí během pár okamžiků, ale pokud máte zrovna server vypnutý, bude funkce/konstanta v IDE svítit jako neznámá. Někdy může mít IDE tendenci vám import na začátek `<script>` sekce podstrčit. Ničemu to kdyžtak nevadí, ale je to zbytečné. A je dobré si uvědomit, proč se to děje. Stačí pustit `pnpm dev`, přitom se provede auto-scan a vytvoří se potřebné `.d.ts` linkovací soubory a IDE to za chvíli pochopí a přestane chybu hlásit (pokud náhodou ne, pomůže refresh projektového okna nebo v krajním případě restart IDE).

Je tu jedno malé ale: Toto implicitní zpřístupnění obsahu se ve výchozím nastavení provádí pouze na úrovni adresáře `/app/utils`, nejde se rekurzivně do hloubky. Hádám, že to je díky potenciální náročnosti na výkon a dobu zpracování. Dá se to nastavením změnit, ale [doporučený postup](https://nuxt.com/docs/4.x/directory-structure/app/composables#how-files-are-scanned) - pokud se tedy rozhodnete organizovat svou znovupoužitelnou logiku do více podadresářů - je spíše založit soubor `/utils/index.ts`, v něm provést explicitní importy funkcí/konstant a tyto obratem „re-exportovat“. Vypadá to pak nějak takto:

```js
// /app/utils/subdir/helper.ts
export function helper () {
    // ...
}

// /app/utils/index.ts
export { helper } from '@/utils/subdir/helpers'
```

## /app/composables

Složka `/app/composables` se chová naprosto stejně jako `/app/utils`, ale je určena pro **stavové** funkce. Měly by se sem umisťovat „composables“ ve [smyslu, jak tento pojem definuje Vue.js](https://vuejs.org/guide/reusability/composables.html#what-is-a-composable). Platí nepsané (resp. v dokumentaci psané) pravidlo, že název Vue.js composable je **VŽDY** uvozen předponou `use`.

Jak už jsem stihl zjistit - z technického hlediska je to jedno. Nuxt nijak nevynucuje, jak má obsah toho kterého adresáře vypadat. Klidně to můžete i domotat jedno přes druhé a mít bezstavové funkce i v `/app/composables` a volat composables i v rámci `/app/utils` (jako se to „povedlo“ mě na mých prvních projektech). Z hlediska kvality a dlouhodobé udržitelnosti by však bylo lepší toto rozdělení dodržovat.

## Případová studie

Na tomto webu zatím nemám žádné větší využití pro `/app/utils`. Umístil jsem do něj pouze soubor `types.ts` s definicemi datových typů.

Používám však několik `/app/composables`:
- [useArticleLinkStore](https://github.com/AloisSeckar/master-coda/blob/master/app/composables/useArticleLinkStore.ts) - načítá metadata k článkům z interní databáze, kterou si vytváří modul **Nuxt Content**. Umožňuje zbytku aplikace získat jejich seznam + je umí různě filtrovat. Je to implementace data-store z knihovny **Pinia**. Oběma technologiím se budu podrobněji věnovat v pozdějších dílech tutoriálu.
- [useFunStore](https://github.com/AloisSeckar/master-coda/blob/master/app/composables/useFunStore.ts) - ze souboru `/data/fun.ts` načítá a poskytuje metadata k obrázkům, které se zobrazují v [sekci `Humor`](/fun). Není to zrovna typické použití, ale nechtělo se mi pro tento jednoduchý případ zavádět složitější databázové řešení.
- [usePageMeta](https://github.com/AloisSeckar/master-coda/blob/master/app/composables/usePageMeta.ts) - sem jsem vytáhl funkci, která vloží do každé stránky [SEO meta tagy](https://www.w3schools.com/tags/tag_meta.asp), abych je nemusel na každé stránce opakovat (je to composable, protože volá jinou composable - `useSeoMeta`).

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-utils @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-utils)

Projekt rozšiřuje [nuxt-pages @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pages) z [předchozího tutoriálu](/article/nuxt-pages){external}.

Ukázku použití `/app/utils` reprezentuje funkce `isPrime()`, která určí, zda je zadané číslo prvočíslo. Implementace je na úvodní stránce `/app/pages/index.vue`. A aby to bylo zajímavější, zdrojová data (čísla 1-9) poskytuje [JS generátor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) `generateSequence()`. Ten je stejně jako funkce `isPrime()` definován v `/app/utils/utils.ts`. Ve starších verzích Nuxt 3 auto-import pro generátorovou `function*` nefungoval, ale nyní už je to vyřešeno.

Ukázkou použití `/app/composables` je `useCounter` - je zadefinován jako funkce, která poskytuje data o počtu kliknutí a 3 metody - zjistit aktuální počet, přidat zadané množství a resetovat. Tyto funkce používá nová komponenta `/app/components/ClickCounter.vue`, která si je jednoduchým voláním `useCounter()` rozbalí a použije v šabloně. Komponenta je následně skrz výchozí layout v šabloně souboru `/app/app.vue` vložena do stránky. Všimněte si v implementaci způsobu, jakým composable vrací data - jako objekt obalující ty části, které chceme zvenku zpřístupnit. Takto je koncipována většina Vue.js composables, protože to umožňuje návratový objekt na straně volajícího destrukturovat pouze na ty části, které ho zajímají.

**TIP:** Protože je "počítadlo" definováno v rámci společného layoutu, můžete si všimnout, že jeho hodnota zůstává i po překliknutí na jiný odkaz v menu. To je proto, že opět nepoužívám klasické HTML `<a>` odkazy, jenž provedou refresh celé stránky - a tedy i stavu komponenty počítadla, který se v této jednoduché demo aplikaci nikam neukládá. Místo toho je tu interní komponenta `<NuxtLink>`, kterou jsme již potkali minule a mění pouze „vnitřek“ `<NuxtPage>`. Použití generátoru však v `/app/components/TheMenu.vue`  implikuje jednu zvláštnost - link na `/` (index) má nastavenou vlastnost `:external="true"`, která naopak znovunačtení celé stránky vynutí (říkáme aplikaci, že přechází na cizí - externí - odkaz). Pokud by k tomu nedošlo, tak jak je funkce nyní napsaná, už se znovu nespustí (generátor doběhne a skončí) a na úvodní stránce by se nic nevykreslilo.

## Shrnutí

Nuxt má dva dedikované adresáře `/app/utils` a `/app/composables`, nad kterými automaticky skenuje všechna klíčová slova `export` a zpřístupňuje je napříč celou aplikací bez nutnosti provádět explicitní `import` tam, kde je chceme použít. Adresář `/app/utils` by se měl používat pro bezstavové funkce, adresář `/app/composables` slouží pro stavovou logiku a práci s ostatními composables z Vue.js, Nuxtu a jiných knihoven.

Další díl tutoriálu popíše [serverovou část Nuxt frameworku](/article/nuxt-api){external}.
