V [předchozím díle](/article/nuxt-pages) jsme se učili pracovat s&nbsp;komponentami a&nbsp;stránkami. Pokud se opakuje nějaká část šablony, je v&nbsp;souladu s&nbsp;programátorským [DRY principem](https://zdrojak.cz/clanky/navrhove-principy-dry/) horkým kandidátem na extrakci do samostatné nové komponenty. Co když se však opakují metody pro práci s&nbsp;daty v sekci `<script>`? Nebo chceme aplikaci lépe členit a&nbsp;vyhnout se hrozivě dlouhým souborům komponent, ve kterých se pak špatně vyznává?

Logiku z JavaScript (TypeScript) kódu můžeme samozřejmě dát stranou také. Nuxt zařídí automatický import napříč aplikací, pokud příslušné soubory umístíme do dalších dvou speciálních složek -&nbsp;`/utils` a&nbsp;`/composables`.

## Export a import v JavaScriptu

Funkci nebo konstantu JavaScriptu lze pomocí klíčového slova `export` zviditelnit pro další soubory, které by ji chtěly použít. Obecně platí, že definici je třeba na druhé straně zase „importovat“ - `import { foo } from ./foo.js`. Více o&nbsp;modulech (vč. nuance s&nbsp;„default“ exporty) například [ZDE](https://www.w3schools.com/js/js_modules.asp).

Nuxt ovšem navíc dokáže odstínit od nutnosti psát explicitní importy. Soubory ve složkách `/utils` a&nbsp;`/composables` jsou automaticky proskenovány a&nbsp;na pozadí nalinkovány tak, aby z&nbsp;nich exportované prvky byly všude přístupné, aniž by bylo nutné dělat cokoliv dalšího.

Jinak jako vývojáři nejsme omezeni pouze těmito složkami, lze si svoje vlastní soubory s&nbsp;exporty umisťovat kamkoliv, ale z&nbsp;jiných adresářů už importy potřeba jsou. Mě se to například stává s&nbsp;definicemi datových typů -&nbsp;pokud jich je víc ve více souborech, mám je kvůli přehlednosti tendenci umisťovat do složky `/types` -&nbsp;odtud je už ale musím importovat explicitně ručně.

## /utils

Do složky `/utils` je doporučeno umisťovat tzv. **bezstavovou** logiku -&nbsp;tj. pomocné funkce, které pracují pouze s&nbsp;deklarovanými vstupy a&nbsp;jejich výstup nijak nezávisí na momentálním stavu aplikace.

Nuxt během sestavení projde všechny soubory ve složce a&nbsp;cokoliv je uvozeno klíčovým slovem `export` zpřístupní v&nbsp;celém zbytku aplikace. Všude jinde stačí exportovaný prvek prostě použít.

**TIP:** Automatický import bude dostupný až po novém sestavení. Pokud vám běží dev server, hot-reload to zařídí během pár okamžiků, ale pokud máte zrovna server vypnutý, bude funkce/konstanta v&nbsp;IDE svítit jako neznámá. Nebo dokonce bude mít IDE tendenci vám import na začátek `<script>` sekce podstrčit. Ničemu to kdyžtak nevadí, ale je to zbytečné. A&nbsp;je dobré si uvědomit, proč se to děje. Stačí pustit `pnpm dev`, provede se auto-scan, vytvoří se potřebné `.d.ts` linkovací soubory a&nbsp;IDE to za chvíli pochopí a&nbsp;přestane chybu hlásit (pokud náhodou ne, pomůže restart IDE).

Je tu jedno malé ale: Toto implicitní zpřístupnění obsahu se ve výchozím nastavení provádí pouze na úrovni adresáře `/utils`, nejde se rekurzivně do hloubky. Hádám, že to je díky potenciální náročnosti na výkon a&nbsp;dobu zpracování. Dá se to změnit, ale [doporučený](https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned) postup -&nbsp;pokud se tedy rozhodnete organizovat svou znovupoužitelnou logiku do více podadresářů -&nbsp;je spíše založit soubor `/utils/index.ts`, v&nbsp;něm provést explicitní importy funkcí/konstant a&nbsp;tyto obratem „re-exportovat“. Vypadá to pak nějak takto:

```js
// /utils/subdir/helper.ts
export function helper () {
    // ...
}

// /utils/index.ts
export { helper } from '@/utils/subdir/helpers'
```

## /composables

Složka `/composables` se chová naprosto stejně jako `/utils`, ale je určena pro **stavové** funkce. Měly by se sem umisťovat „composables“ ve [smyslu, jak tento pojem definuje Vue.js](https://vuejs.org/guide/reusability/composables.html#what-is-a-composable). Platí nepsané (resp. v&nbsp;dokumentaci psané) pravidlo, že název Vue.js composable je **VŽDY** uvozen předponou `use`.

Jak už jsem stihl zjistit -&nbsp;z&nbsp;technického hlediska je to jedno. Nuxt nijak nevynucuje, jak má obsah toho kterého adresáře vypadat. Klidně to můžete i&nbsp;domotat jedno přes druhé a mít bezstavové funkce i&nbsp;v&nbsp;`/composables` a&nbsp;volat composables i&nbsp;v&nbsp;rámci `/utils` (jako se to „povedlo“ mě na prvních projektech). Z&nbsp;hlediska kvality a&nbsp;dlouhodobé udržitelnosti by však bylo lepší toto rozdělení dodržovat.

Tato složka je typickým domovem například pro definice _stores_ pro stavový management - jak uvidíme v&nbsp;[jednom z&nbsp;příštích článků](/article/nuxt-pinia).

## Případová studie

Na tomto webu zatím nemám žádné větší využití pro `/utils`. Umístil jsem do něj pouze soubor `types.ts` s&nbsp;definicemi datových typů.

Používám však několik `/composables`:
- [useArticleStore](https://github.com/AloisSeckar/master-coda/blob/master/composables/useArticleStore.ts) - načítá metadata k&nbsp;článkům ze souboru `/data/articles.ts` (typičtější by bylo čtení z&nbsp;databáze, ale pro tento web se mi zatím nechtělo žádnou konfigurovat). Umožňuje zbytku aplikace získat jejich seznam +&nbsp;je umí různě filtrovat. Je to implementace Pinia store, o&nbsp;kterém bude řeč v&nbsp;[pozdějším tutoriálu](/article/nuxt-pinia).
- [useFunStore](https://github.com/AloisSeckar/master-coda/blob/master/composables/useFunStore.ts) - obdobným způsobem načítá a&nbsp;poskytuje metadata k&nbsp;obrázkům, které se zobrazují v&nbsp;[sekci `Humor`](/fun).
- [usePageMeta](https://github.com/AloisSeckar/master-coda/blob/master/composables/usePageMeta.ts) - sem jsem vytáhl funkci, která vloží do každé stránky [SEO meta tagy](https://www.w3schools.com/tags/tag_meta.asp), abych je nemusel na každé stránce opakovat.

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-utils @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-utils)

Projekt rozšiřuje [nuxt-pages @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pages) z&nbsp;[předchozího tutoriálu](/article/nuxt-pages).

Ukázku použití `/utils` reprezentuje funkce `isPrime()`, která určí, zda je zadané číslo prvočíslo. Implementace je na úvodní stránce `/pages/index.vue`. A&nbsp;aby to bylo zajímavější, zdrojová data (čísla 1-9) poskytuje [JS generátor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) `generateSequence()`. Ten je stejně jako funkce `isPrime()` definován v&nbsp;`/utils/utils.ts`, ale demonstruje zároveň rozdíl, protože pro generátorovou `function*` Nuxt auto-import pro tento speciální případ nefunguje. Musí se tedy na místo použití importovat ručně. Samotná funkce na určení prvočísla nikoliv.

Ukázkou použití `/composables` je `useCounter` - je zadefinován jako funkce, která poskytuje data o&nbsp;počtu kliknutí a&nbsp;3&nbsp;metody -&nbsp;zjistit aktuální počet, přidat zadané množsvtí a&nbsp;resetovat. Tyto funkce používá nová komponenta `/components/ClickCounter.vue`, která si je jednoduchým voláním `useCounter()` rozbalí a&nbsp;použije v&nbsp;šabloně. Komponenta je následně skrz výchozí layout v&nbsp;šabloně souboru `/app.vue` vložena do stránky. 

**TIP:** Protože je "počítadlo" definováno v&nbsp;rámci společného layoutu, můžete si všimnout, že jeho hodnota zůstává i&nbsp;po překliknutí na jiný odkaz v&nbsp;menu. To je proto, že nepoužívám klasické HTML `<a>` odkazy, jenž provedou refresh celé stránky - a&nbsp;tedy i&nbsp;stavu komponenty počítadla, který se v&nbsp;této jednoduché demo aplikaci nikam neukládá. Místo toho je tu interní komponenta `<NuxtLink>`, která mění pouze „vnitřek“ `<NuxtPage>`.

## Shrnutí

Nuxt má dva dedikované adresáře `/utils` a&nbsp;`/composables`, nad kterými skenuje všechny `exports` a&nbsp;zpřístupňuje je napříč celou aplikací bez nutnosti provádět explicitní `import` tam, kde je chceme použít. Adresář `/utils` by se měl používat pro bezstavové funkce, adresář `/composables` slouží pro stavovou logiku.

Další díl tutorialu popíše [serverovou část Nuxt frameworku](/article/nuxt-api).
