Už umíme Nuxt aplikaci rozhýbat a používat různé stavební prvky, ze kterých ji lze poskládat. Teď je na čase dát našim stránkám trochu důstojný vzhled. To už si teoreticky můžeme zařídit sami - s pomocí CSS stylů definovaných v rámci sekcí `<style>` jednotlivých komponent. Kdo si na to věří a umí to, může mít zanedlouho krásný web.

Většinou ale spíše nechceme dělat vše od začátku sami znovu. V tomto článku si proto ukážeme nejprve, jak snadno importovat celé připravené CSS soubory, a poté i několik integrací s projekty, které tvorbu uživatelského rozhraní výrazně usnadňují. Konkrétně budu zmiňovat Vuetify, Tailwind CSS, Bootstrap, Icônes a FontAwesome.

## Import CSS

Jak importovat soubory stylů ze složky `/assets`?

## Vuetify

[Vuetify] je knihovna UI komponent přímo pro Vue.js. Chtěl jsem ji tu zmínit, protože se s ní v rámci ekosystému mohou mnozí potkat, ale přiznám se, že jsem po ni zatím na žádném svém projektu nesáhl a že mi chybí praktická zkušenost. Nemám zatím připraveno ani implementační demo, ale celkem pěkný návod je [ZDE](https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html).

## Tailwind CSS

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-tailwind @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-tailwind)

## Bootstrap

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-bootstrap @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-bootstrap)

## Icônes

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-icones @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-icones)
## FontAwesome

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-fa @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-fa)

## Shrnutí

Toto rozhodně nebyl žádný vyčerpávající seznam možností, které máte, když si chcete usnadnit tvorbu uživatelského rozhraní. Pro inspiraci však myslím solidní začátek. Osobně jsem spokojený s Tailwind CSS a Icônes. Bootstrap se mi zdál příliš svazující a integrace FontAwesome vyžaduje větší množství závislostí. Na druhou stranu leckdo na ně může být z dřívějších webových projektů zvyklý. Volba je na vás.

Pokud máte nějaký svůj oblíbený CSS framework či UI knihovnu a chybí vám návod na zprovoznění v Nuxtu, napište mi, zkusíme to nějak vymyslet a tento článek rozšířit.
