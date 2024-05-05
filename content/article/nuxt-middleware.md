Tento díl Nuxt tutoriálu je věnován middleware, což jsou obslužné metody, které je možné automaticky volat před každým vykreslením určité stránky na [frontendu](/article/nuxt-pages) nebo před zpracováním dat v&nbsp;[serverové části](/article/nuxt-api).

## /middleware

Soubory middleware na straně klienta se umisťují do složky `/middleware`, odkud si je Nuxt automaticky načítá. 

Middleware se spouští v&nbsp;okamžiku, kdy probíhá přesměrování (routing). Aby byl soubor detekován jako middleware, musí obsahovat `default export` metody `defineNuxtRouteMiddleware`. Metoda jako parametr přijímá callback s&nbsp;parametry `to` (kam) a&nbsp;`from` (odkud) probíhá přesměrování. Syntaxe vypadá takto:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // logika
})
```

Datový typ (resp. interface) parametrů `from` a&nbsp;`to` je převzatý z&nbsp;[Vue Routeru](https://router.vuejs.org/) a&nbsp;jmenuje se [`RouteLocation`](https://router.vuejs.org/api/interfaces/RouteLocation.html). Skrz tyto objekty máte přístup ke všem postatným informacím o&nbsp;navigaci - URL, get parametry (za `?` v&nbsp;url), hash (za `#` v&nbsp;url),&nbsp;aj. Dále je možné uvnitř funkce volat libovolné [composables a&nbsp;util funkce](/article/nuxt-utils).

### Spouštění middleware

Když máme obslužnou funkci, musíme ještě frameworku říct, pro kterou stránku se má metoda spustit. To se dělá nejčastěji v&nbsp;sekci `<setup>` příslušného souboru stránky ve struktuře `/pages` pomocí funkce `definePageMeta`:

```ts
definePageMeta({
  middleware: 'foo'
})
```

Toto byl případ, kdy přesměrování na stránku vyvolá pouze jednu middleware funkci. Lze jich mít i&nbsp;více, pokud se místo jednoduchého řetězce použije pole:

```ts
definePageMeta({
  middleware: ['foo1','foo2']
})
```

Dokonce je možné místo odkazu na název souboru ve složce `/middleware` definovat „inline“ middleware přímo uvnitř definice v&nbsp;`definePageMeta`, ale to mi připadá zbytečně zamlžující, protože si budete muset pamatovat, že ho tam máte.

Často se stává, že nepotřebujeme metodu pouštět pouze na jedné či n&nbsp;stránkách, ale úplně na všech, takže by nutnost neustálého vypisování `definePageMeta` začala být brzy otravná. Proto existuje také jednoduchý způsob, jak Nuxtu říct, že jde o&nbsp;„globální“ middleware, který má spouštět pokaždé. Na to stačí specifická „přípona“ názvu souboru -&nbsp;zatímco spuštění `/middleware/foo.ts` musíme na stránce explicitně vyžádat, handler `/middleware/foo.global.ts` se sám od sebe vykoná vždy, když nastane událost přesměrování (routing) na **libovolnou** stránku.

Od Nuxt verze **3.11** přibyla ještě možnost definovat middleware centrálně v&nbsp;souboru `nuxt.config.ts` v&nbsp;sekci `routeRules`.

### Příklad použití

Takže middleware už umíme přiřazovat, ale čemu je to vlastně celé dobré? Typické použití je kontrola, zda má aktuální uživatel oprávnění danou stránku vidět. Pokud náhodou ne, tak ho můžeme třeba přesměrovat na login. K&nbsp;tomu se používá pomocná Nuxt funkce `navigateTo` (její návratovou hodnotu vždy vracejte pomocí `return`):

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (!userCanView(to.path)) {
    return navigateTo(`/login`)
  }
})

function userCanView(page: string): boolean {
    // logika rizeni pristupu
}
```

Další variantou aplikace mohou být například nějaké auditní logy nebo nezbytná inicializace zdrojů používaných cílovou stránkou.

**Na závěr poznámka k&nbsp;pořadí:** Nejprve se spouští globální middleware (v&nbsp;abecedním pořadí), potom teprve soubory specifické pro konkrétní stránky (v&nbsp;pořadí, v&nbsp;jakém jsou pro stránku definovány). To je potřeba mít na paměti, pokud na pořadí operací záleží.

[Oficiální dokumentace](https://nuxt.com/docs/guide/directory-structure/middleware)

## /server/middleware

Na straně Nuxt [serveru](/article/nuxt-api) existuje obdobný mechanismus. Zde se soubory umisťují do složky `/server/middleware` a&nbsp;opět jsou automaticky registrovány a&nbsp;spouštěny.

Jelikož zde nedávají smysl parametry `from` a&nbsp;`to`, je definice serverového middleware trochu odlišná:

```ts
export default defineEventHandler((event) => {
  // logika
})
```

Parametr `event` obsahuje veškeré informace o&nbsp;běhovém prostředí JS serveru a&nbsp;data příchozího HTTP requestu (`event.node.req`).

Na rozdíl od middleware na straně klienta, tyto soubory se spouští před **všemi** API požadavky. Vykonají se vždy předtím, než s&nbsp;příchozím requestem začnou manipulovat API endpointy. Neměly by vracet hodnotu a&nbsp;příchozí request by měly maximálně rozšiřovat, nikoliv měnit původní data.

[Oficiální dokumentace](https://nuxt.com/docs/guide/directory-structure/server#server-middleware)

## Případová studie

Na projektu, který programujeme v&nbsp;práci, je klientské middleware použito například následujícím způsobem:
- kontroluje se přihlášení, pokud není uživatel přihlášen, je přesměrován na login stránku
- dle aktuální URL se vybírá titulek okna (šlo by to řešit i&nbsp;jinak, ale je to jedna z&nbsp;možností)

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-middleware @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-middleware)

Definovány jsou 4&nbsp;middleware funkce:
- `/middleware/allRoutes.global.ts` - vykoná se před každým přesměrováním, vypíše do konzole odkud a&nbsp;kam se přepíná
- `/middleware/onlySecond.ts` - vykoná se pouze před načtením stránky `/second`, vypíše do konzole vysvětlení funkčnosti
- `/middleware/onlyThird.ts` - vykoná se pouze před načtením stránky `/third`, vypíše do konzole vysvětlení funkčnosti, je nastaveno prostřednictvím konfigurace v&nbsp;`nuxt.config.ts` (možné až od verze 3.11)
- `/server/middleware/server.ts` - vykoná se před zpracováním každého API požadavku, vypíše do konzole URL

Jednoduchá implementace klienta umožňuje přepínat mezi odkazy a&nbsp;pozorovat, co se přitom děje v&nbsp;konzoli. Volání API se realizuje kliknutím na tlačítka na stránce `/first` nebo `/second`.

## Shrnutí

Middleware se hodí pro snadnou implementaci funkcí, které chceme volat **PŘEDTÍM**, než je zahájeno zpracování API požadavku na serveru nebo vykreslování stránky klienta. Klientské middleware metody mohou být vázány na konkrétní stránky nebo být spouštěné globálně před načtením libovolné z&nbsp;nich. Middleware na serveru se vykoná před každým API voláním.

V&nbsp;tuto chvíli jsme už pokryli značnou část základní Nuxt funkcionality. Prozatím jsem se ale - úmyslně - příliš nevěnoval tomu, jak vlastně funguje javascriptový framework [Vue.js](https://vuejs.org/), nad kterým je to celé postaveno. Mluvili jsme už trochu o&nbsp;[komponentách](/article/nuxt-pages#komponenty-obecně) a&nbsp;[composables](/article/nuxt-utils#composables), ale bez hlubšího přesahu. Přestože ani zdaleka nedosáhneme úrovně detailu, který nabízí [oficiální Vue.js dokumentace](https://vuejs.org/guide/introduction.html), alespoň částečně to v&nbsp;[následujícím Vue.js intermezzu napravíme](/article/nuxt-vue).
