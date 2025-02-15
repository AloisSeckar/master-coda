Druhou desítku článků o frameworku [Nuxt](https://nuxt.com/) začneme dílem o správě stavu naší aplikace a jak nám může pomoct Vue.js knihovna [Pinia](https://pinia.vuejs.org/).

## Kdy stav (ne)spravovat?

### Kdy ne

První důležitý poznatek, který byste si z dnešního povídání měli odnést je, že v (primárně) frontendových aplikacích velmi často žádný stav udržovat vůbec **nemusíte**! Nedělejte stejnou chybu jako já a nevytvářejte zbytečně složité data udržující struktury tam, kde to není potřeba.

Často vám bude stačit, že si dynamická data potřebná pro zobrazení stránky stáhnete při jejím načítání. A při navigaci na jinou stránku stáhnete znovu jiná. A při dalším návratu zpět si znovu vezmete aktuální stav ze serveru. Sice to člověka svádí nedělat, protože to je přeci síťový provoz navíc, ale když jde o menší objemy dat, bude to často efektivnější než se mořit s efektivním cachováním. Ostatně je to původní princip internetu – prohlížeč požádá server o stránku s daty a dostane ji. Převracení této logiky a vytváření ~~tlustých~~ feature-rich klientských aplikací nemusí být vždy to pravé.

Toto samozřejmě nelze brát jako univerzální pravidlo. Pokud máte službu pro miliony uživatelů, pak možná opravdu nechcete, aby do vašeho serveru každou vteřinu bušilo milion lidí a neustále znovu dostávali všechny informace o svém uživatelském účtu, které si v příštích mnoha týdnech nehodlají měnit. Vždy zkrátka záleží na konkrétním případě. Ale pamatujte vždy na základní pravidlo optimalizace: _Dokud to není potřeba, NEOPTIMALIZUJTE._

### Kdy ano

Řekněme ale, že potřeba pamatovat si stejné hodnoty na více než jednom místě nastala. Například pracujete s opravdu složitým formulářem, který jste zcela logicky a správně rozdělili do většího množství do sebe zanořených komponent. To byl například use-case v aplikaci na správu žádostí o důchody, kde jsem poprvé použil Nuxt ve skutečně velkém projektu.

Pokud si v takovém případě zkusíte vystačit se [základními prostředky Vue](/article/nuxt-vue#p%C5%99ed%C3%A1v%C3%A1n%C3%AD-dat-mezi-komponentami), brzy se při předávání vlastností setkáte s jevem známým jako _prop drilling_ - v komponentách vyšší úrovně deklarujete proměnné pro vlastnosti jenom proto, abyste je mohli předat dále do potomků. Částečně si ještě můžete pomoct s technikou `provide/inject` a práci s _emitováním_ událostí v opačném směru nahradit správnou kombinací `ref` a `watch`. Patrně si však spíše začnete říkat, jestli už není ta pravá chvíle, kdy dává smysl sdílený stav napřed více částmi aplikace začít nějak organizovaně udržovat.

## useState

Pro jednoduché případy tohoto typu má Nuxt už přímo v sobě zabudovanou pomocnou composable `useState()`.

Do `useState` předáte jako první parametr název a jako druhý nepovinnou funkci, která vrátí výchozí hodnotu, pokud stav není dosud naplněn. Poté je možné kdekoliv jinde v aplikaci `useState` se stejným názvem zavolat a dostáváte odkaz na sdílená reaktivní data, které lze odevšad číst a upravovat.

**Pozor** - když jsem napsal „kdekoliv“, měl jsem na mysli kteroukoliv komponentu, ale definice by se měla vždy odehrávat uvnitř `<script setup>`, jinak hrozí problémy s memory leaky. Plánujete-li jiné použití, poraďte se s [dokumentací](https://nuxt.com/docs/getting-started/state-management#best-practices). Dalším omezením použití je fakt, že hodnoty uvnitř musí být serializovatelné, protože se převádí na JSON objekt.

Pokud máte pocit, že si s `useState` nevystačíte, nebo chcete znát další alternativu, mám dobrou zprávu. V tomto článku ve skutečnosti celou dobu směřujeme ke svatému grálu state managementu ve Vue jménem **Pinia**.

## Pinia

[Pinia](https://pinia.vuejs.org/) je knihovna pro jednoduchou, a přitom efektivní správu sdíleného stavu aplikace, přičemž už je dnes de-facto standardem ve Vue.js světě. Je možné, že někde ještě narazíte na [Vuex](https://vuex.vuejs.org/), to už je však pouze legacy záležitost a nemá smysl na ni plýtvat pozorností. Raději si pojďme něco říct o nástroji s logem usměvavého ananasu.

Základním stavebním kamenem je **„store“** - speciální composable-like objekt vytvořený pomocí funkce `defineStore`, v jehož rámci vytvoříte definice reaktivních dat. Pinia k těmto datům následně umožňuje odkudkoliv z aplikace přistoupit, číst je i měnit. Změny se automaticky ihned všude projeví (za předpokladu, že nevhodnou implementací reaktivitu sami neztratíte). Přistupovat lze přímo na samotné objekty, není třeba explicitně definovat žádné gettery ani settery, ani se to nedoporučuje. Můžete však definovat složitější pomocné funkce – buďto de-facto `computed` výpočty závislé na více prvcích nebo metody pro aktualizaci dat s vedlejšími efekty (například odeslání změn na backend). To vše je elegantně zabaleno jako composable s názvem `useXYStore` (za předpokladu, že dodržíte běžnou konvenci).

Stejně jako je ve Vue možné programovat v _Composable_ a _Options_ API stylu, také Pinia stores je možné definovat oběma způsoby. Doporučím na začátek investovat chvilku mentální kapacity a naučit se rovnou psát _Composition_ definice. Já sám to zpočátku neudělal, a i když se s tím dá žít, má to potenciál zbytečného zmatení. Pište své Pinia stores stejně jako své komponenty, ušetříte starosti sobě i svému okolí.

Tak jako integrovaný `useState`, i Pinia si hravě poradí se _Server Side Renderingem_ a zajistí soulad obsahu vykresleného ještě na serveru s výstupem hydratovaným v prohlížeči uživatele. Pinia žije s Vue reaktivitou v úplné symbióze a umožní ji využívat zcela přirozeně a naplno. Asi nepřekvapí perfektní podpora TypeScriptu a tedy možnost datový obsah podle potřeby typovat a využít typovou kontrolu během vývoje. Zároveň se plně integruje do nástrojů pro vývojáře, jako jsou [Vue](https://devtools.vuejs.org/) a [Nuxt Devtools](https://devtools.nuxt.com/) - z nich dokonce můžete modul jedním klikem myši v prohlížeči nainstalovat do nového projektu.

Osvojit si základy práce s knihovnou je velmi jednoduché. Pinia přitom umí daleko víc. Sám se ještě chystám absolvovat kurz [Mastering Pinia](https://masteringpinia.com/) od autora knihovny Eduarda San Martin Moroteho, abych se o možnostech a nejsprávnějším použití dovzdělal. Není to zadarmo, ale patrně se to vyplatí, pokud to s programováním ve Vue.js/Nuxtu začnete myslet vážně.

Do Nuxtu se Pinia podobně jako jiné nástroje integruje jednoduše pomocí [dedikovaného modulu `@pinia/nuxt`](https://nuxt.com/modules/pinia). Stačí tedy doplnit závislost v `package.json` a přidat modul do seznamu v `nuxt.config.ts` a můžeme začít spravovat stav aplikace.

## Případová studie

Na tomto webu Master Coda mám Pinia stores dva - `useArticleStore` udržuje seznam článků, které zde čtete, a `useFunStore` seznam vtipných obrázků, které si můžete [prohlédnout](/fun). Trochu jsem si ulehčil práci a nepoužil čtení obsahových dat z databáze. Lépe řečeno mou databází jsou dva soubory. Jelikož se zdejší obsah příliš dynamicky nemění, je to dostatečně dobré a jednoduché řešení.

`useArticleStore` si při prvním použití načte metadata článků z `/data/articles.ts`. Nad tímto seznamem poté nabízí metody pro vyhledávání, které pak používají klientské komponenty.

`useFunStore` obdobně natáhne definice obrázků z `/data/fun.ts`, nastaví interní ukazatel na poslední obrázek a zpřístupňuje metody pro posun ukazatele vpřed a vzad. Pomocí toho se na stránce s obrázky naviguje klikáním na tlačítka.

Oba tyto příklady jsou nedílnou součástí toho, jak tento web funguje. Zároveň jsou dost možná v rozporu s tím, co jsem psal v úvodu, protože řeší udržování něčeho, co by udržováno být nemuselo. Například proto, že metadata všech článků každého z návštěvníků stránek nejspíš ani nezajímají. Vyhledávání nad seznamem metadat by mohlo být implementováno ad-hoc bez zavádění state managementu. Aspoň ale vidíte, že k poznání, co dělat a co nedělat, vede klikatá cesta lemovaná připomínkami špatných rozhodnutí. Zároveň je pravda, že práce s knihovnou Pinia je natolik snadná a režijní náklady natolik malé, že si můžu dovolit tuto nedokonalost v kódu ponechat a zde se na ni z edukativních důvodů odkázat.

Druhá zajímavost obou příkladů je, že jsou stále napsány v _Options_ stylu. Ten mi totiž zpočátku přišel z nějakého důvodu srozumitelnější, ačkoliv je to v rozporu s _Composition API_ přístupem, jenž jsem si osvojil všude jinde. I z tohoto pohledu bych už dnes tento kód napsal jinak. Ale zase to můžete brát jako důkaz, že i druhý přístup funguje, což je vždy to hlavní.

Na konkrétní implementaci se můžete podívat zde:
- https://github.com/AloisSeckar/master-coda/blob/master/composables/useArticleStore.ts
- https://github.com/AloisSeckar/master-coda/blob/master/composables/useFunStore.ts

## Demo projekt

Zdrojový kód ukázkové implementace ilustrující práci se stavem aplikace prostřednictvím knihovny Pinia v Nuxtu naleznete zde:
[nuxt-pinia @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pinia)

Projekt ukazuje, že k plné integraci Pinia v Nuxtu stačí aktivovat příslušný modul. Obsahuje definici Pinia stores v obou API stylech. Každý z nich je pak použit ve vlastní komponentně. K dispozici je metoda pro naplnění daty, která dokazuje, že jde o reaktivní stav – nové hodnoty se ihned projeví na obrazovce, resp. po kliknutí na tlačítko.

## Shrnutí

Se správou stavu by se to ve frontendových aplikacích nemělo zbytečně přehánět. Pokud na ni ale dojde, má Nuxt skvělé nástroje, jak si se sdíleným stavem elegantně poradit. Pro jednodušší případy vlastní `useState`, pro pokročilejší scénáře lze velice snadno integrovat dedikovanou Vue knihovnu [Pinia](https://pinia.vuejs.org/).

V tomto článku jsem se zmínil, že na Master Coda není použita žádná databáze. Není to však v žádném případě proto, že by databáze byly pro Nuxt tabu! A aby nezůstalo jen u slov a slibů, další díl si na [Nuxt a databáze](/article/nuxt-database) posvítí.
