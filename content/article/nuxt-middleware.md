Tento díl Nuxt tutoriálu je věnován middleware, což jsou obslužné metody, které je možné automaticky volat před každým vykreslením určité stránky na [frontendu](/article/nuxt-pages) nebo před zpracováním dat v [serverové části](/article/nuxt-pages).

## /middleware

Soubory middleware na straně klienta se umisťují do složky `/middleware`, odkud si je Nuxt automaticky načítá. 

Middleware se spouští v okamžiku, kdy probíhá přesměrování (routing). Aby byl detekován jako middleware, musí soubor obsahovat default export metody `defineNuxtRouteMiddleware`, která jako parametr přijímá callback s parametry `to` (kam) a `from` (odkud) probíhá přesměrování. Syntaxe vypadá takto:

```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // logika
})
```

Datový typ (resp. interface) parametrů `from` a `to` je převzatý z Vue Routeru a jmenuje se [`RouteLocation`](https://router.vuejs.org/api/interfaces/RouteLocation.html). Skrz tyto objekty máte přístup ke všem postatným informacím o navigaci - URL, get parametry (za `?` v url), hash (za `#` v url), aj. Dále je možné uvnitř funkce volat libovolné [composables a util funkce](/article/nuxt-utils).

### Spouštění middleware

Když máme obslužnou funkci, musíme ještě frameworku říct, pro kterou stránku se má metoda spustit. To se dělá v sekci `<setup>` příslušného souboru stránky ve struktuře `/pages` pomocí funkce `definePageMeta`:

```ts
definePageMeta({
  middleware: 'foo'
})
```

Toto byl případ, kdy přesměrování na stránku vyvolá pouze jednu middleware funkci. Lze jich mít i více, pokud se místo jednoduchého řetězce použije pole:

```ts
definePageMeta({
  middleware: ['foo1','foo2']
})
```

Dokonce je možné místo odkazu na název souboru ve složce `/middleware` možné definovat "inline" middleware přímo uvnitř definice v `definePageMeta`, ale to mi připadá zbytečně zamlžující, protože si budete muset pamatovat, že ho tam máte.

Protože se často stává, že nepotřebujeme metodu pouštět pouze na jedné či n stránkách, ale úplně na všech, takže by nutnost neustálého vypisování `definePageMeta` začala být brzy otravná, existuje také jednoduchý způsob, jak Nuxtu říct, že jde o "globální" middleware, který má spouštět pokaždé. Na to stačí specifická "přípona" názvu souboru - zatímco spuštění `/middleware/foo.ts` musíme na stránce explicitně vyžádat, `/middleware/foo.global.ts` se samo od sebe vykoná vždy, když nastane událost přesměrování (routing) na stránku `/foo`.

### Příklad použití

Takže to umíme, ale čemu je to vlastně celé dobré? Typické použití je kontrola, zda má aktuální uživatel oprávnění danou stránku vidět a pokud náhodou ne, tak přesměrovat na login. K tomu se používá pomocná Nuxt funkce `navigateTo` (její návratovou hodnotu vždy vracejte pomocí `return`):

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

**Na závěr poznámka k pořadí:** Nejprve se spouští globální middleware (v abecedním pořadí), potom teprve soubory specifické pro konkrétní stránky (v pořadí, v jakém jsou pro stránku definovány). To je potřeba mít na paměti, pokud na pořadí operací záleží.

[Oficiální dokumentace](https://nuxt.com/docs/guide/directory-structure/middleware)

## /server/middleware

Na straně Nuxt [serveru](/article/nuxt-api) existuje obdobný mechanismus. Zde se soubory umisťují do složky `/server/middleware` a opět jsou automaticky registrovány a spouštěny.

Jelikož zde nedávají smysl parametry `from` a `to`, je definice serverového middleware trochu odlišná:

```ts
export default defineEventHandler((event) => {
  // logika
})
```

Parametr `event` obsahuje veškeré informace o běhovém prostředí JS serveru a data příchozího HTTP requestu (`event.node.req`).

Na rozdíl od middleware na straně klienta, tyto soubory se spouští před **všemi** API požadavky. Vykonají se vždy předtím, než s příchozím requestem začnou manipulovat API cesty. Neměly by vracet hodnotu a příchozí request by měly maximálně rozšiřovat, nikoliv měnit původní data.

[Oficiální dokumentace](https://nuxt.com/docs/guide/directory-structure/server#server-middleware)

## Případová studie

Na projektu, který programujeme v práci, je klientské middleware například následujícím způsobem:
- kontroluje se přihlášení, pokud není uživatel přihlášen, je přesměrován na login stránku
- dle aktuální URL se vybírá titulek okna (šlo by to řešit i jinak, ale je to jedna z možností)

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-middleware @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-middleware)

Definovány jsou 3 middleware funkce:
- `/middleware/allRoutes.global.ts` - vykoná se před každým přesměrováním, vypíše do konzole odkud a kam se přepíná
- `/middleware/onlySecond.ts` - vykoná se pouze před načtením stránky `/second`, vypíše do konzole vysvětlení funkčnosti
- `/server/middleware/server.ts` - vykoná se před zpracováním každého API požadavku, vypíše do konzole URL

Jednoduchá implementace klienta umožňuje přepínat mezi odkazy a pozorovat, co se přitom děje. Volání API se realizuje kliknutím na tlačítko na stránce `/first` nebo `/second`.

## Shrnutí

Middleware se hodí na snadnou implementaci funkcí, které chceme volat **PŘEDTÍM**, než je zahájeno zpracování API požadavku na serveru nebo vykreslování stránky klienta. Klientské middleware metody mohou být vázány na konkrétní stránky nebo být spouštěné globálně před načtením libovolné z nich. Middleware na serveru se vykoná před každým API voláním.

V tuto chvíli jsme pokryli dostatečně velkou část funkcionality, kterou Nuxt nabízí, abyste mohli pomalu začít tvořit plnohodnotné aplikace. Dělat si všechno od nuly sami by však mohlo být zbytečně zdlouhavé. Proto se v dalším díle tutoriálu ukážeme, jak je možné [integrovat prvky vybraných UI knihoven](/article/nuxt-ui). 
