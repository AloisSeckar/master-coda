V [předchozím díle](/article/nuxt-pages) jsme se naučili pracovat s komponentami a stránkami. Pokud se opakuje nějaká část šablony, je horkým kandidátem na extrakci do samostatné nové komponenty. Co když se však opakují metody pro práci s daty v sekci `<script>`? Nebo chceme aplikaci lépe členit a vyhnout se hrozivě dlouhým souborům komponent, ve kterých se pak špatně vyznává?

Logiku z JavaScript (TypeScript) kódu můžeme samozřejmě dát stranou také. Nuxt zařídí automatický import napříč aplikací, pokud soubory umístíme do dalších dvou speciálních složek `/utils` a `/composables`.

## Export a import v JavaScriptu

Funkci nebo konstantu JavaScriptu lze pomocí klíčového slova `export` /  `export default` zviditelnit pro další soubory, které by ji chtěly použít. Obecně platí, že definici je třeba na druhé straně zase "importovat" - `import foo from ./foo.js`.

Nuxt dokáže odstínit od nutnosti explicitní importy psát. Soubory ve složkách `/utils` a `/composables` jsou automaticky proskenovány a na pozadí nalinkovány tak, aby z nich exportované prvky byly všude přístupné, aniž by bylo nutné cokoliv dalšího.

Jinak jako vývojáři nejsme omezeni pouze těmito složkami, lze si svoje vlastní soubory s exporty umisťovat kamkoliv, ale z jiných adresářů už importy potřeba jsou. Mě se to například stává s definicemi datových typů - kvůli přehlednosti je mám tendenci umisťovat do složky `/types` - odtud je už ale musím importovat explicitně ručně.

## /utils

TODO

## /composables

TODO

## Nuxt Utils

[nuxt-utils @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-utils)
