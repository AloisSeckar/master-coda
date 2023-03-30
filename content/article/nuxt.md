Dovolte mi, abych vám představil [Nuxt](https://nuxt.com/). Nástroj, díky kterému je tvorba webů hračka. Stačí jen velmi málo a máte připravenou aplikaci, kterou dalšími několika kliknutími zvládnete i nasadit. Zejména menší projekty, které nepotřebují příliš mnoho funkcionality a v podstatě jde o statické stránky, se v něm píší úplně hladce. Zároveň ale nabízí spoustu možností, jak jít hlouběji a vytvářet i vcelku sofistikované webové aplikace.

## O co jde?

**Nuxt** je framework pro tvorbu webových aplikací v (převážně) JavaScriptu, resp. TypeScriptu. Je postaven nad základem [Vue.js](https://vuejs.org/), což je "ten třetí vzadu" v rodině velkých a populárních JavaScriptových nástrojů na weby (spolu s frameworky React a Angular).

Tak jako jiné nástroje podobného typu abstrahuje vývojáře od nutnosti opakovat stále znovu nudné a repetetivní základní činnosti a pomáhá mu soustředit se na důležité funkční a obsahové věci.

Je v něm napsaný třeba i tento web.

## Co je potřeba?

Potřeba je pouze nejnovější LTS verze [Node.js](https://nodejs.org/) v počítači, na kterém chcete vyvíjet. Výsledná aplikace může rovněž běžet na Node.js prostředí, ale není to nezbytně nutné, Nuxt umožňuje vytvořit výstup i jako statický JavaScript, který lze spustit v jakémkoliv modernějším prohlížeči. Sice tím přijdete o některé funkce, ale na provoz pak stačí obyčejný statický webhosting. Na druhou stranu v dnešní době cloudových služeb není velkým problémem ani "dynamická" varianta.

Mezi další prerekvizity patří nějaké povědomí o HTML, CSS a JavaScriptu, ideálně též TypeScriptu. Sami vývojáři Vue.js a Nuxtu sice všude opakují, že nikoho do TS nenutí, ale z vlastní zkušenosti říkám, že to je velký posun kupředu a vyplatí se obětovat nějaký čas učení a prošlapávání slepých uliček. Aby se člověku příjemně programovalo, je dobré mít nějaké IDE a pro vývoj JavaScriptu je zřejmě nejlepší volbou [VS Code](https://code.visualstudio.com/) - je na to učrené, je dobré, je zdarma, má hodně, pluginů a lidé z Vue.js světa také pracují nejčastěji v něm. A pro instalaci JavaScriptových závislostí v Node.js prostředí se hodí nějaký package manager - tak jako JS frameworky exisutjí především tři možnosti - `npm`, `pnpm` a `yarn`. Já si vcelku vystačím s npm, byť souhlasím, že pokročilejší pnpm má některé výhody. Demoprojekty mám připravné pro npm. Nikdy jsem nezkusil yarn, ačkoliv vím, že ho mnozí preferují a doporučují. Volba je na vás, obecné principy mají všechny stejné a de-facto jde jen o to, jaká bude syntaxe příkazu. Asi to nějak jde i bez něj, ale hodí se mít `Git` na správu a verzování zdrojového kódu.

## Jak na něj?

Návody, tipy a triky zde budou přibývat.

Zatím se můžete podívat na mé postupně se rozrůstající úložiště s demo projekty (v angličtině): [demos-nuxt @ GitHub](https://github.com/AloisSeckar/demos-nuxt)

Pak jsou tu samozřejmě oficiální zdroje:
- [Nuxt dokumentace](https://nuxt.com/docs)
- [Nuxt fórum](https://github.com/nuxt/nuxt/discussions)

V češtině jsem zatím nic moc nenašel. Uvidíme.
