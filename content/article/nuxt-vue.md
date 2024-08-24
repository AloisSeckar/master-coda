V tomto vloženém článku se podíváme trochu blíž na vybrané základní koncepty frameworku Vue.js, nad kterým Nuxt pracuje. Nemyslím totiž, že je vhodné používat jakýkoliv nástroj, aniž by měl člověk alespoň hrubou představu, jak to funguje. Než budeme pokračovat v&nbsp;objevování dalších skvělých funkcí Nuxtu, vrátíme se ke kořenům, aniž bychom v&nbsp;tomto díle něco konkrétního naprogramovali. Budete však mít lepší průpravu, až se o&nbsp;to později sami pokusíte.

Na úvod si zapište nejlepší dostupný zdroj informací o&nbsp;Vue –&nbsp;[oficiální dokumentaci](https://vuejs.org/). „Náhodou“ mám na svědomí její kompletní, průběžně aktualizovaný [překlad do češtiny](https://cs.vuejs.org/), takže na rozdíl od mnoha jiných technologií není třeba vládnout angličtinou. O&nbsp; všech tématech, která zde zmíním, se mnohem víc dozvíte tam a&nbsp;budete se k&nbsp;ní moct vždycky vrátit a&nbsp;zkonzultovat své dotazy a&nbsp;problémy.

A teď už slíbený přehled základních konceptů. Jako první se vrátíme ke komponentám, které jsme si už [stručně popsali](/article/nuxt-pages), nyní však půjdeme o&nbsp;něco více do hloubky.

## Komponenty

Základním stavebním prvkem Vue aplikaci je **komponenta**. Jejich spojováním a&nbsp;vnořováním vzniká požadovaná funkcionalita. Zdaleka nejčastější (i&nbsp;když ne jediná možná) forma definice komponenty je tzv. **SFC – _single file component_**. Jak název napovídá, jde o&nbsp;formu zápisu všech grafických prvků a&nbsp;logiky do **jednoho** souboru, který snadno poznáte pomocí přípony `.vue`.

Zabudovaný kompilátor frameworku Vue umí tyto soubory interpretovat a&nbsp;při sestavování aplikace přeložit na plně funkční HTML +&nbsp;JavaScript. To ovšem znamená, že pokud je chceme používat, musíme zahrnout _build fázi_, během které dochází k&nbsp;transformaci. Zmiňuji to, protože Vue jako takové lze v&nbsp;projektu používat i&nbsp;_staticky_, prostým [dotažením skriptu](https://cs.vuejs.org/guide/extras/ways-of-using-vue.html#standalone-script) do HTML stránky. Jelikož se však učíme Nuxt, _build_ jsme přirozeně adoptovali hned na začátku při prvním `pnpm dev`. Proto jsme mohli SFC použít a&nbsp;nic přitom neřešit.

SFC komponenta je složena ze tří hlavních částí:

- **Template** – HTML-like šablona, která definuje výslednou podobu vykreslené stránky
- **Script** – sekce pro obslužný JS (TS) kód, který řídí logiku vykreslování, komunikaci s&nbsp;backendem či jinými částmi aplikace atd.
- **Style** – oddíl pro definici CSS stylů

Není nezbytně nutné uvést všechny tři oddíly. Validní komponenta může například obsahovat pouze `<script>` (tzv. _„renderless“_ či _„funkční“_ komponenta), nebo naopak pouze `<template>`, pokud nepotřebujeme větší přípravu či manipulaci s&nbsp;daty pomocí JavaScriptu. Pouze samotné `<style>` není povoleno, protože by nebylo zřejmé, k&nbsp;čemu styly patří a&nbsp;jak s&nbsp;takovým kusem kódu pracovat.

_Kromě toho je teoreticky možné nadefinovat si libovolné další [vlastní bloky]( https://cs.vuejs.org/api/sfc-spec.html#custom-blocks). Vue vám je umožní zadat, ale jejich obsluhu si pak musíte zařídit sami. Neříkám, že to užitečné není, ale sám jsem je v praxi zatím nepoužil._

SFC je především způsob, jak mít na jednom místě všechny logicky provázané prvky určité funkcionality. Je to trochu v&nbsp;rozporu s&nbsp;tradičním pojetím, kde se jednotlivé zájmy spíše oddělují. Za mě to však dává mnohem větší smysl a&nbsp;mnohem lépe se s&nbsp;tím pracuje, než neustále přeskakovat mezi několika soubory. Pokud by to někdo nedokázal přenést před srdce, Vue má řešení –&nbsp;pomocí atributu `src` je možné obsah jednotlivých bloků [importovat z&nbsp;jiných souborů](https://cs.vuejs.org/api/sfc-spec.html#src-imports). Důrazně to však nedoporučuji. Budete-li mít pocit, že vám `.vue` soubory příliš bobtnají, spíše se zamyslete nad rozbitím celku na několik menších komponent.

Nyní se ještě podívejme dovnitř jednotlivých základních bloků:

### Template

Uvnitř tagu `<template>` se nachází definice obsahu budoucí vykreslené (části) stránky. Dovnitř píšete de-facto HTML, ovšem s&nbsp;tím, že je možné využít některé speciální syntaktické prvky Vue:

- dovnitř dvojitých složených závorek (tzv. _„mustache“_ syntaxe) je možné vložit JavaScript –&nbsp;`{{ msg }}`. Při kompilaci šablony proběhne _interpolace na text_ a&nbsp;ve vykresleném HTML se objeví vyhodnocená aktuální hodnota výrazu uvnitř –&nbsp;ovšem pouze jako **čistý text**. Typicky chcete nechat vyhodnocovat pouze jednoduché reference na proměnné nebo volání funkcí. Technicky sice omezeni nejste, ale je dobré šablonu udržovat přehlednou a&nbsp;práci s&nbsp;JS kódem směrovat do sekce `<script>`, případně do jiných souborů –&nbsp;na které se v&nbsp;Nuxtu díky automatickým importům můžete odkazovat přímo.
- dvojtečka před názvem atributu (nativního nebo vašeho vlastního –&nbsp;viz **_props_** později) je zkratkou pro `v-bind:` a&nbsp;umožňuje atribut navázat na JavaScript výraz. Opět platí totéž co v&nbsp;předchozím případě –&nbsp;nepřehánějte to s&nbsp;komplexitou.
- zavináč před názvem JS události (event) je zkratkou pro `v-on:` a&nbsp;slouží k&nbsp;navázání na funkci. Jakmile je zachycena specifikovaná událost (buďto nativní jako `click` nebo `change` nebo vlastní – viz **_emits_** později), je volána uvedená funkce. Funkce může být in-line, ale i&nbsp;zde je vhodnější pouze volat callback definovaný v&nbsp;k&nbsp;tomu určeném místě.
- další _v-* direktivy_, což jsou jakési pseudo-atributy, které překladači dávají instrukce o&nbsp;speciálním zacházení. Např.:
  - `v-if` – element se vykreslí, pokud **je** splněna podmínka
  - `v-else` – element se vykreslí, pokud podmínka splněna **není**
  - `v-show` – element se zobrazí, pokud **je** splněna podmínka
  - `v-for` – umožní v&nbsp;cyklu vykreslit stejným způsobem více prvků seznamu
  - `v-html` – umožni dovnitř elementu vložit HTML-stylovaný obsah (pozor, potenciálně nebezpečné)
  - kompletní přehled [ZDE](https://cs.vuejs.org/api/built-in-directives.html)
  - _je možné nadefinovat i&nbsp;[svoje vlastní](https://cs.vuejs.org/guide/reusability/custom-directives.html)_

Druhým specifikem Vue šablon je možnost odkazovat další komponenty. Jako identifikátor v&nbsp;šabloně použijte název `.vue` souboru v&nbsp;_CamelCase_ notaci. V&nbsp;čistém Vue je třeba komponenty před použitím ručně [registrovat](https://cs.vuejs.org/guide/components/registration.html). Nuxt toto řeší automaticky za předpokladu, že jsou `.vue` soubory umístěny ve složce `/components` _(nebo je [nakonfigurováno](https://nuxt.com/docs/guide/directory-structure/components#custom-directories), odkud se má auto-import provádět)_.

Díky tomu je možné větší funkční celky krásně skládat z&nbsp;jednotlivých dílčích SFC komponent, které spolu díky Vue mohou navzájem obousměrně komunikovat. Jak na to si ukážeme za chvíli.

### Script

Jelikož si Vue zakládá na flexibilitě, tak níže uvedené není jediná možnost, ale podle mého v&nbsp;současnosti neexistuje lepší varianta, než blok pro definici JavaScriptové logiky obalit pomocí:

```ts
<script setup lang="ts">
// vaše JS logika
</script>
```

Název tagu je asi zřejmý. Atribut [`setup`](https://cs.vuejs.org/api/sfc-script-setup.html) říká kompilátoru, že budeme používat Vue ve variantě tzv. [Composition API](https://cs.vuejs.org/guide/extras/composition-api-faq.html). Až dosud jsem vám zamlčel, že vůbec existuje i&nbsp;jiná varianta, ale ono _Options API_ je z&nbsp;mého pohledu už pouze legacy záležitost, kterou vůbec nemá smysl se učit. Časem možná narazíte na návody či knihovny, které ho stále používají, ale než to budete skutečně potřebovat, není třeba si zbytečně zatěžovat hlavu. Jsem přesvědčen, že se `<script setup>` neprohloupíte. Prvky Vue zmiňované dále v&nbsp;textu ostatně implicitně předpokládají, že ho používat budete.

Atribut `lang="ts"` v&nbsp;kontextu Vue označuje _pre-procesor_, který v&nbsp;tomto konkrétním případě zapíná podporu TypeScriptu. Není to přímo povinnost, ale jak už jsem psal v&nbsp;dřívějších dílech tutoriálu, bez TypeScriptu a&nbsp;jeho statické analýzy kódu si vývoj nedovedu představit. Správně nakonfigurovovaný TypeScript v&nbsp;IDE vás obratem upozorní, že hrozí přístup k&nbsp;nedefinované proměnné, že předáváte jako argument špatný datový typ nebo dokonce voláte funkci, která není definována. To a&nbsp;ještě mnohem víc. Vážně se vyplatí investovat zpočátku trochu úsilí k&nbsp;pochopení jeho principů.

Jakékoliv JS proměnné a&nbsp;funkce, které nadefinujete uvnitř `<script setup>`, jsou automaticky k&nbsp;dispozici pro použití v&nbsp;šabloně komponenty. Zároveň jsou ale bezpečně uzavřeny před okolím, pokud je explicitně nevystavíte pomocí konstruktu [`defineExpose`](https://cs.vuejs.org/api/sfc-script-setup.html#defineexpose). Doporučuji snažit se obsah bloku spíše krátit –&nbsp;deklarovat zde výlučně prvky pevně spjaté s&nbsp;aktuální komponentou a&nbsp;delší sekvence kódu refaktorovat do samostatných `/utils` nebo `/composables` (viz [starší díl tutoriálu](/article/nuxt-utils)). Jen co si představíme poslední sekci, dojde na konkrétnější příklady využití.

### Style

Blok pro definici CSS stylů obaluje tag `<style>`. I&nbsp;zde je možné využít atribut `lang` k&nbsp;definici pre-procesoru, zde například [Sass](https://sass-lang.com/), které ale musíte ve svém projektu napřed správně [nakonfigurovat](https://nuxt.com/docs/getting-started/styling#using-preprocessors).

Je dobré držet se pravidla, že styly uvnitř SFC komponenty patří pouze k&nbsp;této komponentě, a&nbsp;nenechat je „prosakovat“ do zbytku aplikace. Mívá to nečekané následky [úplně někde jinde](https://github.com/vuejs-translations/docs-cs/issues/267) a&nbsp;zdroj problémů se špatně hledá. Vue zapouzdření na úrovni souboru umožňuje velice snadno – přidejte do tagu atribut _„scoped“_: `<style scoped>` – a&nbsp;máte vyřešeno. Styly, které se globálně aplikovat mají, bych definoval pouze na nejvyšší úrovni v&nbsp;`app.vue`, nebo pokud je jich víc, tak v&nbsp;samostatném CSS souboru, který se pak [načte v&nbsp;konfiguraci Nuxtu](https://nuxt.com/docs/getting-started/styling#the-css-property).

Platí, že `<style>` bloků může být v&nbsp;jedné komponentě definováno více, ale nepřipadá mi to příliš praktické. Stejně tak jsem zatím nevyužil podporu [CSS modulů](https://cs.vuejs.org/api/sfc-css-features.html#css-modules).

Obecně bych řekl, že v&nbsp;praxi budete tento blok používat spíš méně, pouze pro řešení nějakých speciálních požadavků. Vzhled často už řeší různé UI knihovny a&nbsp;není většinou třeba vynalézat znovu kolo. Nebo pokud sáhnete třeba po populární knihovně **Tailwind CSS** (viz [pozdější díl tutoriálu](/article/nuxt-tailwind)), klasické CSS pro vás takřka přestane existovat...

## Předávání dat mezi komponentami

Možnost zapouzdření částí aplikace do samostatných komponent je fajn, ale aby to fungovalo, musí se spolu umět bavit. Na to Vue pochopitelně myslí.

### Props

Pomocí speciální funkce `defineProps()` je možné definovat sadu proměnných, které je možné komponentě předat zvenčí. Konceptuálně to odpovídá veřejným atributům třídy v&nbsp;objektově orientovaných jazycích. Abych byl úplně přesný, nejde o&nbsp;skutečnou funkci, ale o&nbsp;tzv. _makro prohlížeče_, jehož obsah se při překladu `.vue` souboru na skutečný kód patřičným způsobem nahradí.

Argumentem tohoto makra je pole definovaných vlastností, kterým Vue říká **props**. Existuje několik variant zápisu, já mám nejradši tzv. _objektovou_ syntaxi:

```ts
const props = defineProps({
  foo: { type: String, required: true },
  bar: { type: Number },
})
```

Takto zadefinované hodnoty poté můžeme uvnitř `<script>` komponenty volat jako `props.foo` a&nbsp;`props.bar`. Ve výrazech uvnitř `<template>` stačí odkazovat pouze `foo` nebo `bar`, jelikož kompilátor je dost chytrý na to, aby uměl dohledat, že se jedná o&nbsp;**props**.

Předávání dovnitř komponenty pak o&nbsp;úroveň výš vypadá takto:

```vue
<template>
  <ChildComponent foo="foo" :bar="2" />
</template>
```

Díky TypeScriptu funguje typová kontrola, takže do `foo` dostanete pouze řetězec a&nbsp;do `bar` jen číslo. Všimněte si, že text lze předat jako kdyby se jednalo o&nbsp;hodnotu klasického HTML atributu, zatímco všechny ostatní datové typy je třeba uvodit dvojtečkou (zkratka pro `v-bind:`).

Pamatujte si zásadu, že **props** byste měli v&nbsp;rámci komponenty používat jako _read-only_ a&nbsp;neměnit je. Pokud to totiž uděláte, svazujete napevno komponentu rodiče a&nbsp;potomka, což podstatně omezuje myšlenku zapouzdření a&nbsp;znovupoužitelnosti. Co udělat můžete, je použít hodnotu z&nbsp;**props** k&nbsp;prvotní inicializaci vlastní proměnné uvnitř komponenty (jen pozor na [_pass-by-reference_](https://medium.com/front-end-weekly/understanding-pass-by-value-and-pass-by-reference-in-javascript-8e2a0806b175) u&nbsp;objektů). Ještě lepší však obvykle bude využít `v-model` nebo `state management` (viz dále).

### Emits

To bylo předávání dat dovnitř komponent a&nbsp;nyní ještě potřebujeme opačný směr. K&nbsp;tomu máme makro `defineEmits()`, kde nadefinujeme soubor vlastních událostí (events), které může komponenta produkovat. V&nbsp;nejjednodušším případě stačí názvy událostí předat jako pole řetězců. Událost pak můžeme vyvolat v&nbsp;šabloně předáním jejího názvu do vestavěné metody `$emit`:

```html
<button @click="$emit('event')">
``` 

Při použití uvnitř bloku `<script>` se podobně jako u&nbsp;**props** musíme odkazovat na výsledek `defineEmits`, např. takto:

```ts
const emit = defineEmits(['event'])

function buttonClick() {
  emit('event')
}
```

V komponentě rodiče se události naslouchá s&nbsp;použitím @ (zkratka pro `v-on:`) před deklarovaným názvem události. Ve chvíli, kdy potomek vyvolá (emituje) událost `event`, zavolá se v&nbsp;rodiči metoda `foo`:

```vue
<template>
  <ChildComponent @event="foo()" />
</template>
```

Aby šlo kromě prosté informace, že něco nastalo, předávat zpátky o&nbsp;úroveň výš i&nbsp;nějaká data, mohou mít události deklarované atributy, jejichž hodnoty se pak spolu s nimi posílají. Tím už ale nebudu tento článek zatěžovat, podrobnosti naleznete [zde](https://cs.vuejs.org/guide/typescript/composition-api.html#typing-component-emits).

### Provide/Inject

Mechanismus předávání **props** do komponent funguje dobře, je-li strom komponent v&nbsp;aplikaci plochý. Jakmile se do sebe začnou zanořovat další a&nbsp;další komponenty, může se brzy ukázat, že některé předávané vlastnosti potřebujeme vlastně jen proto, abychom je poslali hlouběji a&nbsp;teprve někde na konci cesty je cílová komponenta skutečně použije. To může vést k&nbsp;anti-patternu, kterému se říká _prop drilling_. Výsledkem je pevně provázaná struktura, která se obtížně udržuje, protože když si rozmyslíte cílovou vnitřní implementaci, musíte najednou upravovat definici **props** v&nbsp;mnoha dalších komponentách.

Vue tohle obchází pomocí mechanismu `provide` a&nbsp;`inject`. S&nbsp;použitím vestavěné funkce `provide()` můžete deklarovat, že komponenta vystavuje nějaká data všem svým potomkům:

```ts
provide(/* klíč */ 'message', /* hodnota */ 'foo')
```

Za předpokladu, že se komponenta nachází v&nbsp;hierarchii potomků, může si o&nbsp;data říct komplementární funkcí `inject()`:

```ts
const message = inject('message')
```

Poskytnout data je možné i&nbsp;globálně na úrovni celé aplikace pomocí `app.provide()`.

Tato možnost distribuce dat se zprvu může jevit jako užitečná, já se však přiznám, že jsem ji vlastně nikdy pořádně nevyužil. V&nbsp;praxi se totiž daleko lépe pracuje s&nbsp;knihovnami pro správu stavu (viz dále). Je však dobré tušit, že něco takového také jde.

U **emits** podobný problém nemáme, protože události nativně probublávají DOM stromem nahoru a&nbsp;je na vás, kde si je chytíte. _Kromě toho Vue dovoluje si s&nbsp;chováním událostí různě hrát pomocí [modifikátorů](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)._

### v-model

Častým scénářem v&nbsp;interaktivních aplikacích je komponenta, která jako vlastnost přijímá počáteční hodnotu, uživateli umožňuje s&nbsp;ní pracovat a&nbsp;když dojde ke změně, notifikuje rodiče pomocí události. Typicky jde třeba o&nbsp;vstupní pole ve formuláři.

Direktiva `v-model` v&nbsp;kombinaci s&nbsp;makrem `defineModel` umožňuje pro tento případ přímočařejší definici. Díky tomu lze mít takto jednoduchou komponentu `Child.vue`:

```vue
<template>
  <input v-model="model" />
</template>

<script setup>
const model = defineModel()
</script>
```

A neméně jednoduše ji volat v&nbsp;`Parent.vue`:

```vue
<template>
  <Child v-model="foo" />
</template>
```

Vue automaticky zajistí, že se uživatelský vstup v&nbsp;hodnotě `foo` projeví, není třeba se o&nbsp;to dál starat a&nbsp;implementovat obslužné funkce. Další příjemné usnadnění rutinních činností.

### State management

Výše uvedené mechanismy fungují uspokojivě pro jednodušší aplikace. Jak roste počet komponent a&nbsp;interakcí mezi nimi, začíná být otravné neustále přemýšlet, odkud kam vést propojení. V&nbsp;takovém případě lze problematiku pozvednout o&nbsp;úroveň výš a&nbsp;stav udržovat na jednom místě napříč celou aplikací.

Nuxt má k&nbsp;dispozici composable [`useState`](https://nuxt.com/docs/api/composables/use-state), která pro méně složitá data postačí sama o&nbsp;sobě. De facto standard pro řešení správy stavu ve Vue je však aktuálně knihovna **Pinia**, se kterou je hračka globální stav vytvořit, udržovat a&nbsp;bezpečně použít kdekoliv ve Vue aplikaci. O&nbsp;jejím použití však více až později v&nbsp;[samostatném článku](/article/nuxt-pinia).

## Reaktivita

Pravá síla Vue se projeví ve chvíli, kdy začnete pracovat s dynamicky se měnícími daty. Když například kliknu na tlačítko, chtěl bych, aby se aktualizovala navazující hodnota _„počet kliknutí“_. Napíšu si listener události `click`, v&nbsp;něm zvednu hodnotu příslušné proměnné...a dál? Jak vynutit překreslení na obrazovce? Sáhnout si přes JavaScript na DOM a&nbsp;upravit textový obsah příslušného elementu? Nic takového, ve Vue to jde „samo“ -&nbsp;díky reaktivitě.

Reaktivita ve Vue světě znamená, že je možné zavést speciální objekty obalující data, které umí automaticky sledovat, že dojde k&nbsp;nějaké změně hodnoty, a&nbsp;**reagovat** na ni automatickým promítnutím změny na **všechna místa**, kde se s&nbsp;hodnotou pracuje. Tento obecný problém s&nbsp;informováním jiných částí aplikace o&nbsp;změnách, řeší různé frameworky různě. Vue nabízí sadu prostředků nazvaných [Reactivity API](https://cs.vuejs.org/api/reactivity-core.html), díky níž je to z&nbsp;pohledu programátora úplná hračka.

Technickým pozadím se zde hlouběji zabývat nebudeme, pokud vás to zajímá, pokračujte na kapitolu [Reaktivita podrobně](https://cs.vuejs.org/guide/extras/reactivity-in-depth.html) v&nbsp;dokumentaci. V&nbsp;tuto chvíli bude stačit znát následující tři funkce:

- `ref()` – jako svůj argument přijme obyčejnou proměnnou (primitivní typ, objekt nebo pole) a&nbsp;obalí ji tak, aby návratová hodnota byla _reaktivní_. To znamená, že kdekoliv ji použijete, dojde k&nbsp;její aktualizaci v&nbsp;budoucnu kdykoliv, když se změní. Takto získané objekty – **_refs_**, je možné předávat jako argumenty funkcí nebo i&nbsp;jako **_props_** do komponent v&nbsp;šablonách, a&nbsp;svou reaktivitu si přitom všude nesou sebou. Cenou za to je nutnost psát `nazev.value` při použití ve skriptech, aby se funkcionalita uměla vyvolat. Uvnitř `<template>` stačí pouze `nazev`, protože tam si `.value` doplní překladač.
- `computed()` – zde je argumentem callback funkce, která se umí automaticky zavolat, pokud je uvnitř těla detekována reaktivní změna –&nbsp;tj. u&nbsp;některé z&nbsp;proměnných došlo ke změně, kterou systém reaktivity propaguje napříč aplikací. Toto slouží k&nbsp;definici dynamických výpočtů. Například pro jednoduchou sčítací kalkulačku můžete nadefinovat dvě `ref()` hodnoty propojené s&nbsp;uživatelským vstupem a&nbsp;součet jejich hodnot bude výsledek `computed(() => a.value + b.value)`. Kdykoliv uživatel změní jeden ze vstupů, výsledek se ihned sám přepočítá.
- `watch()` – nabízí možnost sledování změny reaktivní hodnoty a&nbsp;automatické provedení _vedlejšího efektu_. Jako první argument určíte hodnotu, která se má sledovat, druhým je callback, který se spustí při detekci změny. Například by tím šlo sledovat počet špatných pokusů o&nbsp;přihlášení a&nbsp;po překročení limitu nastavit proměnnou, která zablokuje další stiknutí tlačítka _"Přihlásit"_.

To bylo představení letem světem. Systém reaktivity je samozřejmě mnohem komplexnější, dostupných funkcí je více a&nbsp;navíc mají různé možnosti nastavení. To si ale můžete postupně načíst v&nbsp;dokumentaci, až to budete potřebovat. Už s&nbsp;těmito třemi základními prvky lze obsáhnout celou řadu scénářů.

Zároveň je vhodné už teď upozornit na určité úskalí. Dle mých zkušeností má totiž jednoduchost použití tendenci svádět k&nbsp;přílišnému používání i&nbsp;tam, kde to vůbec není potřeba. Jak aplikace roste, pak zejména u&nbsp;`computed()` a&nbsp;`watch()` začíná docházet ke stále častějšímu převolávání a&nbsp;brzy dokáže jedna zdánlivě malá změna hodnoty vyvolat kaskádovitý efekt desítek volání funkcí, o&nbsp;následných manipulacích s&nbsp;DOM výsledné HTML stránky ani nemluvě. Vue sice reaktivní úpravy dávkuje a&nbsp;úpravy DOM maximálně optimalizuje, zátěž na pozadí však přesto bobtná. Nehledě na to, že je pak obtížné tok aktualizací sledovat, pokud je potřeba ladit, že se kdesi skrytě změní něco, co se vlastně vůbec měnit nemá.

Problém je, že z&nbsp;počátku nejspíš ani nebudete tušit, že problém máte. Veškeré operace systému reaktivity probíhají tiše na pozadí a&nbsp;jelikož je Vue optimalizované na brutální výkon, na jednoduchých aplikacích zpočátku nepoznáte, že se děje něco nekalého. Když vás to začne dobíhat, může být už poměrně složité kód předělávat a&nbsp;optimalizovat. Lepší je hned od počátku k&nbsp;reaktivitě přistupovat spíše skepticky –&nbsp;neptejte se, co všechno můžete udělat reaktivní, přemýšlejte, co reaktivní být nepotřebuje, protože se vlastně nebude měnit, popř. to lze řešit jinak než přidáním `computed() / watch()`.

Zároveň platí, že to je nesmírně silný nástroj a&nbsp;nedílná součást arsenálu Vue vývojáře. Jen pozor na syndrom kladiva a&nbsp;hřebíku.

## Životní cyklus komponenty

Reaktivní či nikoliv, instance Vue komponenty není statická entita. Postupně prochází několika fázemi svého virtuálního života. Velmi stručně a&nbsp;zjednodušeně:

1) Když překladač zjistí, že má zavést novou instanci, provede jako první kód uvnitř `<script setup>`. Zavedou se proměnné, nastaví se výchozí reaktivní stav.
2) Nastane fáze _připojování_ (**mount**), kdy vzniká potřebná HTML struktura uvnitř virtuálního DOM, kterým Vue ovládá, co bude ve výsledku vykresleno na stránce. Poté se hotová komponenta zobrazí.
3) Hotová a&nbsp;připojená komponenta může přejít do fáze _aktualizace_ (**update**), pokud se detekuje změna reaktivního stavu, který se ji týká – přitom se přepočítávají hodnoty proměnných, přepisuje virtuální DOM a&nbsp;nakonec překreslí HTML.
4) Komponenta je _odpojována_ (**unmount**), protože se vykresluje jiný obsah, přechází na jinou stránku nebo ukončuje celá aplikace.
5) Instance komponenty přestala existovat.

Před a&nbsp;po každé fázi **mount**, **update**, **unmount** je možné si zaregistrovat callback, který Vue automaticky provede pokaždé, když se do daného bodu dospěje. Slouží k tomu speciální funkce (_lifecycle hooks_) `onBeforeMount()`, `onMounted()`, atd. Může to být užitečné, když byste např. chtěli zobrazit hlášku, že inicializace stránky byla kompletně dokončena, nebo po skončení práce s&nbsp;komponentou provést nějaké uvolnění zdrojů.

Pozor přitom na dvě věci: 

- Na doběhnutí asynchronní funkce se zde **nečeká**. Pokud je to potřeba, dejte `await` přímo do `<script setup>`. Asynchronní funkce uvnitř `onBeforeMount()` **nezaručí**, že proces připojování do DOM začne až po jejím ukončení.
- A už vůbec nechtějte definici callbacku umístit někam do asynchronního bloku (např. dovnitř funkce `setTimeout`). Vue totiž ihned po ukončení synchronního běhu `<script setup>` ztratí kontext aktuální instance komponenty, takže nebude k&nbsp;čemu se připojit.

Více informací vč.&nbsp;přehledného diagramu naleznete [ZDE](https://cs.vuejs.org/guide/essentials/lifecycle.html).

## Shrnutí

Článek je už opravdu dlouhý, ačkoliv jsme u&nbsp;většiny témat pouze lehce sklouzli po povrchu a&nbsp;řadu z&nbsp;nich ani nezačali. Připomínám svůj tip z&nbsp;úvodu –&nbsp;čtěte [Vue dokumentaci](https://cs.vuejs.org/), tam najdete mnohem víc. Samozřejmě je tu také obsáhlá [dokumentace pro Nuxt](https://nuxt.com/), zatím bohužel nepřeložená.

V tuto chvíli byste už ovšem měli být vyzbrojeni dostatečnou porcí znalostí o&nbsp;možnostech Vue a&nbsp;frameworku Nuxt, abyste mohli pomalu zkoušet tvořit větší a&nbsp;reálnější aplikace sami. Dělat si však všechno od nuly by mohlo být zbytečně zdlouhavé. Proto si v&nbsp;dalším díle tutoriálu ukážeme, jak je možné bez větší námahy [integrovat prvky vybraných UI knihoven](/article/nuxt-gui) a&nbsp;rovnou je začít používat.
