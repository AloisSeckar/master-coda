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

## Nuxt Utils

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-utils @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-utils)
