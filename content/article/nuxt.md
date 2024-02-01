Dovolte mi, abych vám představil [Nuxt](https://nuxt.com/). Nástroj, díky kterému je tvorba webů hračka. Stačí jen velmi málo a máte připravenou aplikaci, kterou dalšími několika kliknutími zvládnete i nasadit. Zejména menší projekty, které nepotřebují příliš mnoho dodatečné funkcionality se v něm píšou úplně hladce. Zároveň ale nabízí spoustu možností, jak jít hlouběji a vytvářet i sofistikované webové aplikace.

V následující sérii článků se na něj postupně podíváme podrobněji.

## O co jde?

**Nuxt** je framework pro tvorbu webových aplikací v (převážně) JavaScriptu, resp. TypeScriptu. Je postaven nad základem [Vue.js](https://vuejs.org/), což je "ten třetí vzadu" v rodině velkých a populárních JavaScriptových frameworků (spolu s nástroji [React](https://react.dev/) a [Angular](https://angular.io/)). Na rozdíl od zmíněných dvou za ním nestojí velká technologická firma, ale čistě opensource komunita. Kolegovi, který ovládá Angular, přijde programování ve Vue "punkové", ale možná i proto mě poslední měsíce baví jeho svět objevovat a zkoumat.

Tak jako jiné nástroje podobného typu abstrahuje vývojáře od nutnosti opakovat stále znovu nudné a repetitivní základní činnosti a pomáhá mu soustředit se na důležité funkční a obsahové věci. Nuxt jde oproti čistému Vue.js ještě dál a řadu věcí, které byste jinak museli psát ručně, zvládnete jenom tím, že soubor ve správném formátu umístíte to určeného adresáře.

Je v něm napsaný třeba i tento web.

## Co je potřeba?

Potřeba je pouze nejnovější LTS verze [Node.js](https://nodejs.org/) v počítači, na kterém chcete vyvíjet. Výsledná aplikace může rovněž běžet v Node.js prostředí, ale není to nezbytně nutné, Nuxt umožňuje vytvořit výstup i jako statický JavaScript, který lze spustit v jakémkoliv modernějším prohlížeči. Sice tím přijdete o některé funkce, ale na provoz pak stačí obyčejný statický webhosting. Na druhou stranu v dnešní době cloudových služeb a kontejnerů už není velkým problémem ani "dynamická" varianta.

Mezi další prerekvizity patří nějaké povědomí o HTML, CSS a JavaScriptu. Ideální je též alespoň letmá znalost TypeScriptu. Sami vývojáři Vue.js a Nuxtu sice všude opakují, že nikoho do TS nenutí, ale z vlastní zkušenosti říkám, že to je velký posun kupředu a vyplatí se obětovat nějaký čas učení a prošlapávání slepých uliček. 

Aby se člověku příjemně programovalo, je dobré mít nějaké IDE. Pro vývoj JavaScriptu je zřejmě nejlepší volbou [VS Code](https://code.visualstudio.com/) - je na to určené, je dobré, je zdarma, má hodně pluginů a lidé z Vue.js světa také pracují nejčastěji v něm.

Pro instalaci a správu JavaScriptových závislostí v Node.js prostředí je nutný nějaký package manager - tak jako JS frameworky existují primárně tři možnosti - `npm`, `pnpm` a `yarn`. Dlouho jsem si vystačil s `npm`, který přišel první a současný JavaScript svět je do značné míry postaven kolem něj. Nicméně pokročilejší `pnpm` má jednu velkou výhodu - pomocí symlinků na jeden centrální adresář deduplikuje závislosti z různýh projektů, které se jinak do lokálních `node_modules` stahují pokaždé znovu a znovu a zabírají pak celé gigabyty na disku. Nikdy jsem nezkusil `yarn`, ačkoliv vím, že ho mnozí preferují a doporučují. Volba je na vás, obecné principy mají všechny stejné a v jádru jde jen o to, jaká bude syntaxe příkazu.

_"Last but not least"_ to chce `Git` na správu a verzování zdrojového kódu. Pro menší testovací projekty si možná vystačíte i bez něj, ale pro vývoj čehokoliv většího je to takřka nutnost. Pokud máte raději jiné verzovací systémy, musíte si nějak poradit.

## Jak na něj?

Návody, tipy a triky zde budou přibývat. Na jednotlivé kapitoly se dostanete pomocí odkazů v boxu dole.

Zatím se můžete podívat na mé postupně se rozrůstající úložiště s demo projekty (v angličtině): [demos-nuxt @ GitHub](https://github.com/AloisSeckar/demos-nuxt). Předpokládá použití `Git` a `pnpm`.

Pak jsou tu samozřejmě oficiální zdroje:
- [Nuxt dokumentace](https://nuxt.com/docs)
- [Nuxt fórum](https://github.com/nuxt/nuxt/discussions)

V češtině jsem zatím nic moc nenašel, i proto jsem se v roce 2023 pustil do psaní těchto článků.

A teď už vzhůru na [první minimální projekt vytvořený pomoci Nuxt frameworku](/article/nuxt-simple).
