V [předchozím díle](/article/nuxt-pages) jsme se naučili pracovat s komponentami a stránkami. Pokud se opakuje nějaká část šablony, je horkým kandidátem na extrakci do samostatné nové komponenty. Co když se však opakují metody pro práci s daty v sekci `<script>`? Nebo chceme aplikaci lépe členit a vyhnout se hrozivě dlouhým souborům komponent, ve kterých se pak špatně vyznává?

Logiku z JavaScript (TypeScript) kódu můžeme samozřejmě dát stranou také. Nuxt zařídí automatický import napříč aplikací, pokud soubory umístíme do dalších dvou speciálních složek `/utils` a `/composables`.

## Export a import v JavaScriptu

Funkci nebo konstantu JavaScriptu lze pomocí klíčového slova `export` /  `export default` zviditelnit pro další soubory, které by ji chtěly použít. Obecně platí, že definici je třeba na druhé straně zase "importovat" - `import foo from ./foo.js`.

Nuxt dokáže odstínit od nutnosti explicitní importy psát. Soubory ve složkách `/utils` a `/composables` jsou automaticky proskenovány a na pozadí nalinkovány tak, aby z nich exportované prvky byly všude přístupné, aniž by bylo nutné cokoliv dalšího.

Jinak jako vývojáři nejsme omezeni pouze těmito složkami, lze si svoje vlastní soubory s exporty umisťovat kamkoliv, ale z jiných adresářů už importy potřeba jsou. Mě se to například stává s definicemi datových typů - kvůli přehlednosti je mám tendenci umisťovat do složky `/types` - odtud je už ale musím importovat explicitně ručně.

## /utils

Do složky `/utils` je doporučeno umisťovat **bezstavovou** logiku - tj. pomocné funkce, které pracují pouze s deklarovanými vstupy a jejich výstup nijak nezávisí na momentálním stavu aplikace.

Nuxt během sestavení prijde všechny soubory ve složce a cokoliv je uvozeno klíčovým slovem `export` zpřístupní v celém zbytku aplikace.

Toto implicitní zpřístupnění obsahu se však ve výchozím nastavení provádí pouze na úrovni adresáře `/utils`, nejde se rekurzivně do hloubky. Hádám, že to je díky potenciální náročnosti na výkon a dobu zpracování. Dá se to změnit, ale doporučený postup - pokud se tedy rozhodnete organizovat svou znovupoužitelnou logiku do více podadresářů - je spíše založit soubor `/utils/index.ts`, v něm provést explicitní importy funkcí/konstant a tyto obratem "re-exportovat".

## /composables

Složka `/composables` se chová naprosto stejně jako `/utils`, ale je určena pro **stavové** funkce. Měly by se sem umisťovat "composables" ve [smyslu, jak tento pojem definuje Vue.js](https://vuejs.org/guide/reusability/composables.html#what-is-a-composable). Platí nepsané (v dokumentaci psané) pravidlo, že název Vue.js composable je uvozen předponou `use`.

Jak už jsem stihl zjistit - z technického hlediska je to jedno. Nuxt nijak nevynucuje, jak má obsah toho kterého adresáře vypadat. Klidně to můžete i domotat jedno přes druhé a mít bezstavové funkce i v `/composables` a volat composables i v rámci `/utils`(jako se to "povedlo" mě na prvních projektech). Z hlediska kvality a dlouhodobé udržitelnosti by však bylo lepší toto rozdělení dodržovat.

Tato složka je typickým domovem například pro definice _stores_ pro stavový management - jak uvidíme v [jednom z příštích článků](/articles/nuxt-pinia).

## Případová studie

Na tomto webu zatím nemám žádné využití pro `/utils`. Používám však dvě `/composables`:
- [useArticleStore](https://github.com/AloisSeckar/master-coda/blob/master/composables/useArticleStore.ts) - načítá metadata k článkům ze souboru `/data/articles.ts` (typičtější by bylo čtení z Databáze). Umožňuje zbytku aplikace získat jejich seznam + je umí různě filtrovat. Je to implementace Pinia store, o kterém bude řeč v [pozdějším tutorialu](/article/nuxt-pinia).
- [useFunStore](https://github.com/AloisSeckar/master-coda/blob/master/composables/useFunStore.ts) - obdobným způsobem načítá a poskytuje metadata k obrázkům, které se zobrazují v [sekci `Humor`](/fun).

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-utils @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-utils)

Projekt rozšiřuje [nuxt-pages @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pages) z předchozího tutorialu.

Ukázku použití `/utils` reprezentuje funkce `isPrime()`, která určí, zda je zadané číslo prvočíslo. Implementace je na úvodní stránce `/pages/index.vue`. A aby to bylo zajímavější, zdrojová data (čísla 1-9) poskytuje [JS generátor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) `generateSequence()`. Ten je stejně jako funkce `isPrime()` definován v `/utils/utils.ts`, ale demonstruje zároveň rozdíl, protože pro generátorovou `function*` Nuxt auto-import v tuto chvíli nefunguje. Musí se tedy na místo použití importovat ručně. Samotná funkce na určení prvočísla nikoliv.

Ukázkou použití `/composables` je `useCounter` - je zadefinován jako funkce, která poskytuje data o počtu kliknutí a 3 metody - zjistit aktuální počet, přidat zadané množstí a resetovat. Tyto funkce používá nová komponenta `/components/ClickCounter.vue`, která si je jednoduchým voláním `useCounter()` rozbalí a použije v šabloně. Komponenta je následně skrz výchozí layout v šabloně souboru `/app.vue` vložena do stránky. 

**Pozn.:** Protože je "počítadlo" definováno v rámci společného layoutu, můžete si všimnout, že jeho hodnota zůstává i po překliknutí na jiný odkaz v menu. To je proto, že se nepoužívá klasické HTML `<a>` odkazy, jenž provedou refresh celé stránky - a tedy i stavu komponenty počítadla, který se v této jednoduché demo aplikaci nikam neukládá. Místo toho je tu interní komponenta `<NuxtLink>`, která mění pouze "vnitřek" `<NuxtPage>`.

## Shrnutí

Nuxt má dva dedikované adresáře `/utils` a `/composables`, nad kterými skenuje všechny `exports` a zpřístupňuje je napříč celou aplikací bez nutnosti provádět explicitní `import` tam, kde je chceme použít. Adresář `/utils` by se měl používat pro bezstavé funkce, adresář `/composables` slouží pro stavovou logiku.
