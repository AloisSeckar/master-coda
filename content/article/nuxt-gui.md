Už umíme Nuxt aplikaci rozhýbat a používat různé stavební prvky, ze kterých ji lze poskládat. Teď je na čase dát našim stránkám trochu důstojný vzhled. To už si teoreticky můžeme zařídit sami - s pomocí CSS stylů definovaných v rámci sekcí `<style>` jednotlivých komponent. Kdo si na to věří a umí to, může mít zanedlouho krásný web.

Většinou ale spíše nechceme dělat vše od začátku sami znovu. V tomto článku si proto ukážeme nejprve, jak snadno importovat celé připravené CSS soubory, a poté i několik integrací s projekty, které tvorbu uživatelského rozhraní výrazně usnadňují. Konkrétně budu zmiňovat `Tailwind CSS`, `Open Props`, `Vuetify`, `Bootstrap`, `DevExtreme`, `Icônes` a `FontAwesome`.

## Import CSS

Pokud migrujete nějaký svůj starší projekt, možná už `css` soubory stylů máte hotové. Nebo jste využili nějakou ze služeb, které své styly jako samostatný `css` poskytují (třeba při [použití Bootstrap z CDN](https://getbootstrap.com/docs/3.4/getting-started/#download-cdn)). Nuxt pro tyto případy nabízí velmi jednoduchou integraci.

Svoje soubory stylů nahrajte do složky `/assets`. Poté je možné se na ně odkázat pomocí volby `css` v `nuxt.config.ts` konfiguračním souboru:

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
import '~/assets/css/moje.css'
</script>
```

nebo uvnitř `<style>`:
```vue
<style>
@import url("~/assets/css/moje.css");
</style>
```

Jen s tím se už dá leccos vytvořit. Pro příklady integrací s pokročilejšími CSS/UI knihovnami však čtěte dále.

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) je UI framework pro stylování obsahu webových stránek a aplikací. Na rozdíl od klasického přístupu k CSS nepíšete vlastní třídy, ale skládáte vzhled z rozsáhlé sady předdefinovaných CSS tříd, což umožňuje rychlé a flexibilní vytváření stylů a layoutů. Tailwind je navíc hodně flexibilní a konfigurovatelný, například co se týká barevného schématu. 

Jeho popis by vydal na samostatný článek. Pro mě je to nyní jasná volba č. 1 co se tvorby vzhledu webových stránek týká. Vyžaduje trochu jinou filosofii, ale zvykal jsem si den a už to nechci dělat jinak. Tailwind CSS používá třeba právě tento web - původní design jsem ještě nahodil "ručně", převést jej do odpovídající Tailwind struktury trvalo jeden večer.

### Nuxt integrace

Začít používat Tailwind CSS je úplná hračka, protože na to existuje [modul](https://tailwindcss.nuxtjs.org/), který vše podstatné udělá za vás.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-tailwind @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-tailwind)

## Open Props

[Open Props](https://open-props.style/) staví na podobném principu jako Tailwind CSS - nabízí set předpřipravených stylů, jejichž použití vás sice bude trochu svazovat, ale na druhou stranu nemusíte všude znovu vynalézat kolo. Namísto celých předpřipravených CSS tříd jsou v tomto případě nositelem informace o výsledném stylu [CSS proměnné](https://www.jakpsatweb.cz/css/css-promenne.html#promenne), které můžete využít a skládat ve svých třídách. Open Props tedy neabstrahují od veškerého psaní CSS, pouze nabízejí již připravené a vyzkoušené hodnoty. Hlavní výhodou je odlehčenost a škálovatelnost - Tailwind je proti komprimovaným Open Props css souborům i po [veškerých možných optimalizacích](https://v1.tailwindcss.com/docs/controlling-file-size) "velký" a stahujete ho vždy celý. Naproti tomu Open Props umožňují použít jen menší část, která je zrovna potřeba.

### Nuxt integrace

Jelikož Nuxt (Vue) sám o sobě neumí při kompilaci nahrazovat CSS proměnné skutečnými hodnotami, je potřeba doplnit CSS procesor (v demu `postcss`) spolu s pluginem, který po nakrmení definicemi z `OpenProps` nahrazení hodnot provede. To je asi jediný zádrhel, jinak je prostě naimportován NPM balíček `open-props` a v demu nadefinováno pár stylů.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-openprops @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-openprops)

## Vuetify

[Vuetify] je knihovna UI komponent přímo pro Vue.js. Chtěl jsem ji tu zmínit, protože se s ní v rámci ekosystému mohou mnozí potkat, ale přiznám se, že jsem po ni zatím na žádném svém projektu nesáhl a že mi chybí praktická zkušenost. Nemám zatím připraveno ani implementační demo, ale celkem pěkný návod je [ZDE](https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html).

## Bootstrap

[Bootstrap](https://getbootstrap.com/) je dlouhodobě nejpopulárnější UI framework pro rychlý a responzivní vývoj webových stránek. Obsahuje sadu předdefinovaných CSS tříd, komponent a JS pluginů, usnadňujících tvorbu moderního designu, responzivního layoutu, formulářů, navigace a dalších interaktivních prvků. Je vhodný pro vývojáře všech úrovní a umožňuje rychlou a konzistentní tvorbu profesionálních webových stránek. 

Mě úplně k srdci nepřirostl, a pokud si nechcete psát vlastní CSS sami, tak bych doporučil spíš kombinaci výše uvedeného Tailwind CSS + Formkit na formulářové prvky. Ale mnoho vývojářů je na něj zvyklých a Nuxt samozřejmě nebrání, aby ho mohli nadále používat.

### Nuxt integrace

V tomto případě jsem zvolil použití Nuxt [pluginu](https://nuxt.com/docs/guide/directory-structure/plugins). O pluginech jsme zatím ještě nemluvili, ale je to efektivní způsob, jak do základní Nuxt aplikace doplňovat novou funkcionalitu.

V souboru `/plugins/bootstrap.client.ts` stačí mít tyto tři řádky kódu:

```ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bootstrap', import('bootstrap'))
})
```

Funkce `defineNuxtPlugin` je standardizovaný handler, jehož callback obdrží instanci Nuxt aplikace a umožňuje ji různým způsobem obohacovat. Například pomocí funkce `provide` poskytnout `bootstrap` funkcionalitu. Samotný Bootstrap je jako NPM balíček k dispozici díky příslušné závislosti v `package.json`.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-bootstrap @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-bootstrap)

## DevExtreme

UI knihovnu [DevExtreme](https://js.devexpress.com/) mi prvně představil kolega "Angularista". Je však univerzální, takže ji lze použít i ve Vue. Jako hlavní nevýhodu bych hned na úvod zdůraznil, že je placená - a ne zrovna málo. Na druhou stranu použili jsme ji na větším reálném projektu v práci a musím říct, že tvorba složitých vnořených formulářů, které bylo třeba od nuly poskládat, šla v DevExtreme jako po másle. Díky jejich layoutům i celkem slušně responzivně. Také mají kvalitně zpracovanou dokumentaci, i když zpočátku mi chvíli trvalo, než jsem se v ní dokázal orientovat.

Drobná vada na kráse je, že z nějakého důvodu Dx komponenty nefungují při _Server-Side Renderingu_, nebo jsem aspoň nepřišel na to, co je třeba udělat. Je tedy nutné nastavit `ssr: false` a počítat s tím, že aplikace se bude vykreslovat pomocí JavaScriptu až v prohlížeči klienta.

### Nuxt integrace

Přes `package.json` je třeba referencovat základní NPM balíček `devextreme` a jeho Vue port `devextreme-vue`. To už by stačilo pro lokální vývoj, problém je, že mechanismus "tree-shakingu" (odstraňování nepoužitých závislostí z produkčního buildu) nepozná, že část komponent používáte, a úspěšně očeše všechny definice.

S tím jsem docela dlouho bojoval, a nakonec si musel [nechat poradit](https://github.com/nuxt/nuxt/discussions/16898). Klíčem je znovu Nuxt plugin, ve kterém postupně registrujeme komponenty z DevExtreme, které chceme použít, jako Vue komponenty. Silně doporučuji registrovat je pod stejným názvem, jako se jmenují v DevExtreme, jinak se připravíte o možnost jednoduše hledat v jejich dokumentaci.

V příkladu používám pouze základní tlačítko, ale princip je stejný pro všechny ostatní:

```ts
import { DxButton } from 'devextreme-vue/button'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DxButton', DxButton)
})
```

Komponenta `DxButton` je následně globálně dostupná ve všech šablonách komponent vaší aplikace.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-dx @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-dx)

Po spuštění si můžete všimnout nápadného licenčního varování, které si DevExtreme samo vloží. To pro připomenutí, že bez zakoupené licence je vám tato integrace málo platná. Naštěstí free alternativy existují.

## Icônes

[Icônes](https://icones.js.org/) je projekt zaměřený na poskytování rozsáhlé sbírky ikon pro webové stránky a aplikace. Nabízí široký výběr vektorových ikon ve formátu SVG, které jsou snadno použitelné a přizpůsobitelné. Icônes tak usnadňuje integraci ikon do projektů a přispívá k vizuálnímu zlepšení uživatelských rozhraní.

Pokud se mě zeptáte, jak na ikony, jednoznačně doporučím Icônes. Snadný způsob definice z SVG, který je volně přenositelný do různých prostředí, žádná potřeba nových závislostí a obrovský výběr definic ikon zdarma. V Nuxtu, resp. přímo v samotném Vue lze každou ikonu zavést jako samostatnou komponentu. Pokud nepoužíváte UI knihovnu, která si ikony řeší sama jinak (viz např. budoucí článek o Nuxt UI), je to výborná light-weight volba, která vám umožní použít jen to, co skutečně potřebujete.

### Nuxt integrace

Funguje to skutečně bez jakékoliv externí závislosti. Prostě si na webu Icônes najdete ikonu, kterou chcete použít, a přímo odtamtud vyexportujete zdrojový kód ve formě Vue komponenty. V mé demo ukázce jsou takto převzaty tři vybrané ikony ve složce `/components`.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-icones @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-icones)

### Univerzální komponenta ikony

V jiném projektu mám [komponentu](https://github.com/AloisSeckar/ELRHistory/blob/main/components/BaseIcon.vue), která zobrazuje ikonu z palety Icônes obecně na základě definice z [datového souboru](https://github.com/AloisSeckar/ELRHistory/blob/main/assets/icones.json). Mým cílem bylo zamezit vzniku většího množství komponent s de-facto stejným obsahem, který se liší pouze maličko v definici SVG path. Budete-li chtít, klidně se tím do svých projektů inspirujte.

## FontAwesome

[FontAwesome](https://fontawesome.com/) je populární knihovna ikon pro webové stránky a aplikace. Poskytuje široký výběr vektorových ikon ve formátu SVG a fontových souborech, které lze snadno použít prostřednictvím CSS. FontAwesome umožňuje jednoduchou manipulaci s ikonami, změnu velikosti, barvy a další úpravy.

"FA" je podobně jako Boostrap evergreenem ve světě webdesignu a používá jej kde kdo. Integrace do Nuxtu je pochopitelně možná, ale znamená to nejméně tři nové závislosti na JS modulech (více, pokud chcete používat ikony z dalších dostupných (placených!) sad) a celkově mi to přijde těžkopádnější než Icônes. Ale opět - kdo je zvyklý a sype názvy FontAwesome ikon z rukávu, může je používat i nadále.

Jedinou nevýhodou je, že podobně jako DevExtreme, ani FontAwesome si netyká s Nuxt SSR, takže je třeba nastavit `ssr: false`.

### Nuxt integrace

Dotažení FA do Nuxt projektu jsem vyřešil opět pluginem, tentokrát trochu méně intuitivním, protože je potřeba nejprve rozšířit objekt `library` o definice ikon, které chcete používat, a poté vzít druhý objekt `FontAwesomeIcon` (z druhého FA balíčku) a ten zaregistrovat jako Vue komponentu uvnitř vaší aplikace:

```ts
//...
library.add(faEnvelope)
//...
nuxtApp.vueApp.component('fa', FontAwesomeIcon)
```

V šablonách komponent pak lze použít komponentu `fa`:

```vue
<fa class="icon" icon="envelope" title="FA 'envelope' icon" />
```

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-fa @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-fa)

## Shrnutí

Toto rozhodně nebyl žádný vyčerpávající seznam možností, které máte, když si chcete usnadnit tvorbu uživatelského rozhraní. Pro inspiraci však myslím solidní začátek. Pokud máte nějaký svůj oblíbený CSS framework či UI knihovnu a chybí vám návod na zprovoznění v Nuxtu, [napište mi](mailto:alois.seckar@gmail.com), zkusíme tento článek rozšířit.

Mezitím se dalším díle podíváme blíž na ještě jednu možnost, kterou jsem rychle přijal za svou - modul [Nuxt UI](/article/nuxt-ui) přímo od Nuxt týmu.
