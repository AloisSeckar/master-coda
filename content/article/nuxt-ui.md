Už umíme Nuxt aplikaci rozhýbat a používat různé stavební prvky, ze kterých ji lze poskládat. Teď je na čase dát našim stránkám trochu důstojný vzhled. To už si teoreticky můžeme zařídit sami - s pomocí CSS stylů definovaných v rámci sekcí `<style>` jednotlivých komponent. Kdo si na to věří a umí to, může mít zanedlouho krásný web.

Většinou ale spíše nechceme dělat vše od začátku sami znovu. V tomto článku si proto ukážeme nejprve, jak snadno importovat celé připravené CSS soubory, a poté i několik integrací s projekty, které tvorbu uživatelského rozhraní výrazně usnadňují. Konkrétně budu zmiňovat Vuetify, Tailwind CSS, Bootstrap, Icônes a FontAwesome.

## Import CSS

Jak importovat soubory stylů ze složky `/assets`?

## Vuetify

[Vuetify] je knihovna UI komponent přímo pro Vue.js. Chtěl jsem ji tu zmínit, protože se s ní v rámci ekosystému mohou mnozí potkat, ale přiznám se, že jsem po ni zatím na žádném svém projektu nesáhl a že mi chybí praktická zkušenost. Nemám zatím připraveno ani implementační demo, ale celkem pěkný návod je [ZDE](https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html).

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) je UI framework pro stylování obsahu webových stránek a aplikací. Na rozdíl od klasického přístupu k CSS nepíšete vlastní třídy, ale skládáte vzhled z rozsáhlé sady předdefinovaných CSS tříd, což umožňuje rychlé a flexibilní vytváření stylů a layoutů. Tailwind je navíc hodně flexibilní a konfigurovatelný například co se týká barevného schématu. 

Jeho popis by vydal na samostatný článek. Pro mě je to nyní jasná volba č. 1 co se tvorby vzhledu webových stránek týká. Vyžaduje trochu jinou filosofii, ale zvykal jsem si den a už to nechci dělat jinak. Tailwind CSS používá třeba právě tento web - původní design jsem ještě nahodil "ručně", převést jej do odpovídající Tailwind struktury trvalo jeden večer.

### Integrace do Nuxt 3

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-tailwind @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-tailwind)

## Bootstrap

[Bootstrap](https://getbootstrap.com/) je dlouhodobě nejpopulárnější UI framework pro rychlý a responzivní vývoj webových stránek. Obsahuje sadu předdefinovaných CSS tříd, komponent a JS pluginů, usnadňujících tvorbu moderního designu, responzivního layoutu, formulářů, navigace a dalších interaktivních prvků. Je vhodný pro vývojáře všech úrovní a umožňuje rychlou a konzistentní tvorbu profesionálních webových stránek. 

Mě úplně k srdci nepřirostl a pokud si nechcete psát vlastní CSS sami, tak bych doporučil spíš kombinaci výše uvedeného Tailwind CSS + Formkit na formulářové prvky. Ale mnoho vývojářů je na něj zvyklých a Nuxt samozřejmě nebrání, aby ho mohli nadále používat.

### Integrace do Nuxt 3

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-bootstrap @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-bootstrap)

## Icônes

[Icônes](https://icones.js.org/) je projekt zaměřený na poskytování rozsáhlé sbírky ikon pro webové stránky a aplikace. Nabízí široký výběr vektorových ikon ve formátu SVG, které jsou snadno použitelné a přizpůsobitelné. Icônes tak usnadňuje integraci ikon do projektů a přispívá k vizuálnímu zlepšení uživatelských rozhraní.

Pokud se mě zeptáte na ikony, tak jednoznačně doporučím Icônes. Snadný způsob definice z SVG, který je volně přenositelný do různých prostředí, žádná potřeba nových závislostí a obrovský výběr definic ikon zdarma. V Nuxtu, resp. přímo v samotném Vue lze každou ikonu zavést jako samostatnou komponentu.

### Integrace do Nuxt 3

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-icones @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-icones)

### Univerzální komponenta ikony

V jiném projektu mám [komponentu](https://github.com/AloisSeckar/ELRHistory/blob/main/components/BaseIcon.vue), která zobrazuje ikonu z palety Icônes obecně na základě definice z [datového souboru](https://github.com/AloisSeckar/ELRHistory/blob/main/assets/icones.json). Mým cílem bylo zamezit vzniku většího množství komponent s de-facto stejným obsahem, který se liší pouze maličko v definici SVG path.

## FontAwesome

[FontAwesome](https://fontawesome.com/) je populární knihovna ikon pro webové stránky a aplikace. Poskytuje široký výběr vektorových ikon ve formátu SVG a fontových souborech, které lze snadno použít prostřednictvím CSS. FontAwesome umožňuje jednoduchou manipulaci s ikonami, změnu velikosti, barvy a další úpravy.

"FA" je podobně jako Boostrap evergreenem ve světě webdesignu a používá jej kde kdo. Integrace do Nuxtu je pochopitelně možná, ale znamená to několik nových závislostí na JS modulech a celkově mi to přijde těžkopádnější než Icônes. Ale opět - kdo je zvyklý a sype názvy FontAwesome ikon z rukávu, může jej používat i nadále.

### Integrace do Nuxt 3

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-fa @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-fa)

## Shrnutí

Toto rozhodně nebyl žádný vyčerpávající seznam možností, které máte, když si chcete usnadnit tvorbu uživatelského rozhraní. Pro inspiraci však myslím solidní začátek. Osobně jsem spokojený s Tailwind CSS a Icônes. Bootstrap se mi zdál příliš svazující a integrace FontAwesome vyžaduje větší množství závislostí. Na druhou stranu leckdo na ně může být z dřívějších webových projektů zvyklý. Volba je na vás.

Pokud máte nějaký svůj oblíbený CSS framework či UI knihovnu a chybí vám návod na zprovoznění v Nuxtu, napište mi, zkusíme to nějak vymyslet a tento článek rozšířit.
