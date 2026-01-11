---
file: 'nuxt-gui'
cat: 'web'
title: 'Nuxt Tutorial 8 - UI integrace'
dscr: 'Nuxt - jak snadno integrovat knihovny UI prvků'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS']
date: '2026-01-11'
created: '11.01.2026'
english: 'https://dev.to/aloisseckar/nuxt-tutorial-7-ui-integrations-4mjm'
---

V minulém díle jsme řešili CSS, nyní přejdeme k pokročilejším UI integracím. Stejně jako v případě stylů platí, že není nutně třeba vynalézat kolo a místo tvoření všech funkčních prvků na zelené louce bude patrně snazší sáhnout po některé z dedikovaných knihoven. 

Ukážeme si čtyři praktické příklady integrací. Výběr není motivován žádnou hlubší logikou, jde zkrátka o technologie, s nimiž jsem se setkal a měl potřebu je ve svých Nuxt projektech použít. Nicméně na nich dobře uvidíte obecné principy, jak si poradit, pokud byste jednou chtěli řešit něco podobného. V závěru článku na vás pak čekají odkazy na již hotové integrace pro další známé UI knihovny z Vue světa. Pojďme na to.

## Bootstrap

[Bootstrap](https://getbootstrap.com/) svého času byl a možná pořád je nejpopulárnější CSS framework pro rychlý a responzivní vývoj webových stránek. Obsahuje sadu předdefinovaných CSS tříd, komponent a JS pluginů, usnadňujících tvorbu moderního designu, responzivního layoutu, formulářů, navigace a dalších interaktivních prvků. V tomto smyslu jde tedy dále než minule představený [Tailwind CSS](/article/nuxt-css#tailwind-css) řešící pouze styly.

Mě osobně k srdci moc nepřirostl. Pokud dnes začínáte, doporučil bych spíš kombinaci Tailwind CSS a nějaké knihovny specializované na formulářové prvky (o těch bude jeden z příštích článků). Ale mnoho vývojářů je na Bootstrap zvyklých z dřívějška a Nuxt samozřejmě nebrání, aby ho mohli nadále používat.

### Nuxt integrace

V adresáři Nuxt modulů se pro Bootstrap dají najít nějaká řešení, mám však pochybnosti o jejich aktuálnosti, proto jsem zvolil raději DYI přístup prostřednictvím [Nuxt pluginu](https://nuxt.com/docs/guide/directory-structure/plugins). O pluginech jsme zatím ještě nemluvili, ale je to efektivní způsob, jak do základní Nuxt aplikace doplňovat novou funkcionalitu.

Krátká vysvětlující odbočka: Nuxt Plugin je v tomto případě soubor ve složce `/app/plugins`, který prostřednictvím dedikované funkce umožní obohatit instanci Nuxtu nebo i samotné pod ním běžící Vue.js aplikace. Nuxt tyto soubory automaticky načítá a spouští při svém startu.

V projektu je potřeba doplnit závislosti na NPM balíčku `boostrap` a na `sass` (podobně jako v případě [Open Props](/article/nuxt-css#open-props) bude třeba aplikovat CSS processing na vstupní soubor stylů a toto je doporučená varianta). Bootstrap styly je třeba importovat do hlavního `.scss` souboru v `/app/assets/`:

```scss
/* /app/assets/main.scss */
@import 'bootstrap/scss/bootstrap';
```

V `nuxt.config.ts` musíme tento soubor registrovat volbou `css`:

```ts
// /nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/main.scss']
  // ...
})
```

Nakonec potřebujeme ještě plugin, který Nuxt aplikaci poskytne interaktivitu prostřednictvím Bootstrap JS. Stačí v něm mít tyto tři řádky kódu:

```ts
// /app/plugins/Bootstrap.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bootstrap', import('bootstrap'))
})
```

Funkce `defineNuxtPlugin` je výše zmíněná obslužná funkce (handler), jehož callback obdrží na vstupu instanci Nuxt aplikace a umožňuje ji různým způsobem pomocí vystaveného API obohacovat. Například pomocí funkce `provide` _poskytnout_ vše, co skrze své exporty nabízí balíček `bootstrap`.

Zdrojový kód jednoduché ukázkové implementace naleznete zde:
[nuxt-bootstrap @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-bootstrap)

## DevExtreme

UI knihovnu [DevExtreme](https://js.devexpress.com/) mi prvně představil kolega "Angularista". Je však univerzální, takže ji lze použít i ve Vue. Jako hlavní nevýhodu bych hned na úvod zdůraznil, že je placená - a ne zrovna málo. Na druhou stranu použili jsme ji na větším reálném projektu v práci a musím říct, že tvorba složitých vnořených formulářů, které bylo třeba poskládat úplně od nuly, šla v DevExtreme jako po másle. Díky jejich layoutům i celkem slušně responzivně. Také mají kvalitně zpracovanou dokumentaci, i když zpočátku mi chvíli trvalo, než jsem se v ní dokázal orientovat.

Drobná vada na kráse je, že z nějakého důvodu `Dx` komponenty nefungují při _Server-Side Renderingu_, nebo jsem aspoň ani po několika letech nepřišel na to, co je třeba udělat. Je tedy nutné nastavit `ssr: false` a počítat s tím, že aplikace se bude vykreslovat pomocí JavaScriptu až v prohlížeči klienta. Hodí se tedy spíše pro tzv. SPA (Single Page Aplikace), kdy uživatel používá web spíše jako běžnou desktopovou aplikaci a je ochotent třeba i chvíli čekat na načtení obsahu - což byl i náš případ. Pro projekty, kde rozhoduje rychlost načítání a SEO (typicky e-shopy), asi právě nejvhodnější není.

### Nuxt integrace

Přes `package.json` je třeba referencovat základní NPM balíček `devextreme` a jeho Vue port `devextreme-vue`. To už by samo o sobě stačilo pro lokální vývoj, problém je, že mechanismus _"tree-shakingu"_ (odstraňování nepoužitých závislostí z produkčního buildu) sám nepozná, že část komponent používáte, a úspěšně očeše všechny definice z finálního balíčku.

S tím jsem docela dlouho bojoval, a nakonec si musel [nechat poradit](https://github.com/nuxt/nuxt/discussions/16898). Klíčem je znovu Nuxt plugin, ve kterém postupně registrujeme komponenty z DevExtreme, které chceme použít, jako Vue komponenty. Silně doporučuji registrovat je pod stejným názvem, jako se jmenují v DevExtreme, jinak se připravíte o možnost jednoduše hledat v jejich dokumentaci.

V příkladu používám pouze základní tlačítko, ale princip je stejný pro všechny ostatní:

```ts
// /app/plugins/DevExtreme.ts
import { DxButton } from 'devextreme-vue/button'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('DxButton', DxButton)
})
```

Komponenta `DxButton` je následně globálně dostupná ve všech šablonách komponent vaší aplikace a je možné ji bez dalších omezení kdekoliv použít tak, jak uvádí DevExtreme dokumentace.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-dx @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-dx)

Po spuštění si můžete v záhlaví všimnout velmi nápadného licenčního varování, které si DevExtreme do neregistrované verze samo vloží. To pro připomenutí, že bez zakoupené licence je vám tato integrace málo platná. Ukázali jsme si však aspoň obecný princip, jak pomocí pluginů přidávat do Nuxtu **jakékoliv** externí Vue komponenty.

## FontAwesome

Po obecných UI knihovnách se přesuneme k [FontAwesome](https://fontawesome.com/), což je populární řešení zobrazování ikon pro webové stránky a aplikace. Poskytuje široký výběr vektorových ikon ve formátu SVG a fontových souborech, které lze snadno použít prostřednictvím CSS. FontAwesome umožňuje jednoduchou manipulaci s ikonami, změnu velikosti, barvy a další úpravy.

"FA" býval před pár lety podobně jako Boostrap evergreen ve světě webdesignu. Myslím, že už je také za svým zenitem, přesto se na něj ale podívejme. Od chvíle, kdy jsem integraci vyřešil sám ručně, vznikl i [modul](https://nuxt.com/modules/nuxt-fontawesome), takže to už možná jde snáze, než uvádím dále. Moje řešení znamená nejméně tři nové závislosti v `package.json` (více, pokud chcete používat ikony z dalších dostupných (placených!) sad) a celkově mi to přijde pněkud těžkopádné. Ale kdo je zvyklý a sype názvy FontAwesome ikon z rukávu, může si je přinést do Nuxtu s sebou.

Nevýhodou je, že podobně jako DevExtreme, ani FontAwesome si netyká s Nuxt SSR, takže je třeba nastavit `ssr: false`.

### Nuxt integrace

Dotažení FA do Nuxt projektu jsem vyřešil opět pluginem, tentokrát trochu méně intuitivním, protože je potřeba nejprve rozšířit objekt `library` o definice ikon, které chcete používat, a poté vzít druhý objekt `FontAwesomeIcon` (z druhého FA balíčku) a ten zaregistrovat jako Vue komponentu uvnitř vaší aplikace:

```ts
// /app/plugins/FontAwesome.ts
import { 
  faEnvelope, faFaceSmile, faHouse 
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// tyto ikony budou dostupné jako hodnota atributu "icon"
library.add(faEnvelope)
library.add(faFaceSmile)
library.add(faHouse)

// registrace komponenty "fa"
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa', FontAwesomeIcon)
})
```

V šablonách komponent pak lze použít komponentu `<fa>` takto:

```vue
<fa class="icon" icon="envelope" title="FA 'envelope' icon" />
```

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-fa @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-fa)

## Icônes

Protože výše uvedené řešení nepokládám za přílíš dobré, rád bych místo toho obratem představil i možnou alternativu. [Icônes](https://icones.js.org/) je projekt zaměřený na poskytování rozsáhlé sbírky ikon pro webové stránky a aplikace. Nabízí široký výběr vektorových ikon ve formátu SVG, které jsou snadno použitelné a přizpůsobitelné. Icônes tak usnadňuje integraci ikon do projektů a přispívá k vizuálnímu zlepšení uživatelských rozhraní.

Pokud se mě zeptáte, jak na ikony, jednoznačně doporučím Icônes. Snadný způsob definice z SVG, který je volně přenositelný do různých prostředí, žádná potřeba nových závislostí a obrovský výběr definic ikon **zdarma**. V Nuxtu, resp. přímo v samotném Vue lze každou ikonu zavést jako samostatnou komponentu. Pokud nepoužíváte UI knihovnu, která si ikony řeší sama jinak (viz např. budoucí článek o Nuxt UI), je to výborná light-weight volba, která vám umožní použít jen to, co skutečně potřebujete.

### Nuxt integrace

Funguje to skutečně bez jakékoliv externí závislosti. Prostě si na webu [Icônes](https://icones.js.org/) najdete ikonu, kterou chcete použít, a přímo odtamtud vyexportujete zdrojový kód ve formě Vue komponenty. V mé demo ukázce jsou takto převzaty tři vybrané ikony ve složce `/components`.

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-icones @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-icones)

### Univerzální komponenta ikony

Možná jste si stejně jako já všimli, že se takto získané komponenty podobají jedna druhé jako vejce vejci a liší se jen ve svých definicích `<svg>` a `<path>`.

V jiném projektu mám proto [komponentu](https://github.com/AloisSeckar/ELRHistory/blob/main/app/components/BaseIcon.vue), která zobrazuje ikonu z palety Icônes obecně na základě definice z [datového souboru](https://github.com/AloisSeckar/ELRHistory/blob/main/app/assets/icones.json), kam se přidá nová definice, když v aplikaci vznikne potřeba nové ikony. Budete-li chtít, klidně se tím do svých projektů inspirujte.

## Shrnutí

V tomto článku jsme si ukázali čtyři příklady, jak do Nuxt aplikace integrovat externí UI knihovny. Rozhodně to nebyl žádný vyčerpávající seznam možností, které máte, pro inspiraci však myslím solidní začátek.

Rozhodně platí, že pro celou řadu populárních technologí už existuje hotový Nuxt modul, který integraci řeší za vás. Namátkou mohu jmenovat řešení pro:
- [Vuetify](https://nuxt.com/modules/vuetify-nuxt-module)
- [PrimeVue](https://nuxt.com/modules/primevue)
- [Quasar](https://nuxt.com/modules/quasar)

S žádným sice nemám osobní zkušenost, ale případnou podporu a pomoc v aktivní a přátelské Nuxt komunitě jistě seženete. Nebo pokud máte nějaký svůj oblíbený CSS framework či UI knihovnu a návod na zprovoznění v Nuxtu vám chybí, [napište mi](mailto:alois.seckar@gmail.com), zkusíme integraci vymyslet.

Mezitím se dalším díle podíváme blíž na ještě jednu možnost, kterou jsem prozatím úmyslně zamlčel a zároveň rychle přijal za svou - modul [Nuxt UI](/article/nuxt-ui) přímo od Nuxt týmu.
