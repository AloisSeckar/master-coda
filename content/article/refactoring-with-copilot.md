---
file: 'refactoring-with-copilot'
cat: 'web'
title: 'AI jako lék na prokrastinaci'
dscr: 'Jak se mnou Copilot vyřešil dlouho odkládaný refaktoring na mém webu'
tags: ['refactoring','Nuxt','AI','Copilot']
date: '2026-01-17'
created: '17.01.2026'
english: 'https://dev.to/aloisseckar/ai-the-way-out-of-doubt-2fbg'
---

Když jde o umělou inteligenci, považuji se za _racionálního pesimistu_. Nástroje založené na AI používám, ale nevidím v nich druhý příchod Ježíše, který by nám programátorům vzal práci a beze zbytku nás nahradil. Je to dosti užitečný nástroj, ale pořád jen nástroj. To je pravděpodobně důvod, proč jsem vždy trochu pozadu za nejnovějšími trendy a možnostmi, které se prakticky každý týden objevují.

Na druhou stranu nejsem vůči AI ani odmítavý. Nemyslím si, že by mi škodilo nepsat všechno ručně a raději se soustředit na širší kontext místo skládání veškerého boilerplate kódu. Nejtěžší mi připadá najít správné úkoly, na které se AI zeptat nebo je rovnou delegovat agentovi. Cítím se omezován _přílišným přemýšlením_.

Ačkoliv opačný extrém - nepřemýšlet vůbec a jen tak „vibe codovat“ celou aplikaci a poslat ji do produkce bez jakýchkoli kontrol příčetnosti a bezpečnosti řešení - je patrně ještě horší, nevytvořit nic, protože se nemůžete rozhodnout, jak to vlastně chcete poskládat, také není ideálním výsledkem. Kdykoli se mi podaří z toho kruhu vymanit a něco s AI zkusit, pozitivní výsledky mě vždy překvapí. Tento článek jsem se rozhodl napsat, abych se podělil o svůj poslední malý úspěch dosažený pomocí AI. Možná to inspiruje i vás.

## Scéna

Mám vlastní webovou stránku, kde od roku 2013 uchovávám všechny své běžecké výsledky - kde jsem běžel, kolik metrů a v jakém čase. Jsem jen rekreační běžec, ale začíná to být pěkný soubor — téměř 2000 záznamů a blížím se 12 tisícům kilometrů. A vše lze dohledat až k 11. březnu 2013, kdy jsem začal prvními 1825 metry za 9 minut a 15 sekund.

Web nabízí zobrazení a filtrování záznamů a jednoduchý admin formulář, takže mohu přidat nový záznam hned po doběhnutí z mého telefonu. Postupně se to vyvíjelo z custom PHP kódu uvnitř HTML stránky až do součásti Nuxt aplikace, kde používám svůj vlastní [nuxt-neon modul](https://github.com/AloisSeckar/nuxt-neon) pro připojení k databázi.

Měl jeden velký nedostatek — pro jednoduchost jsem umístil logiku na frontend a nikdy jsem se nezabýval přesunutím databázových operací na server. Protože o mé běžecké údaje patrně nikdo nestojí, nebyla potřeba to změnit. Vždycky jsem si říkal _"jo, měl bych to udělat"_, a pak vždy také _"ale ne dnes"_.

## Děj

Minulá středa byla další takový den.

Produktivní já: _Měl bych to udělat teď. Stejně potřebuji nějaký úkol pro svou sérii denních GitHub commitů._

Líný já: _Ale jsem unavený z celodenního kódování v práci. A určitě se objeví nějaké problémy, které budu muset řešit a spát půjdu po půlnoci. Ne, pojďme si raději hrát videohry._

Pak mi ale znenadání jako v kreslených filmech naskočila malá žárovka nad hlavou: **Co kdybych zkusil požádat Copilota, aby mi kód refaktoroval? Uvidíme co se stane.**

Vzápětí jsem téměř spadl do pasti _Jak napsat dost dobrý prompt?_, ale tentokrát jsem se nenechal rozptýlit. Rozhodl jsem se přistoupit na princip **KISS** a prostě to zkusit jednoduše.

Můj první prompt byl tedy dost přímočarý (ponechávám jej v originálním anglickém znění):

```
Refactor "getTracks" and "getRuns" methods by moving them to Nuxt 
server and expose as API routes under /server/routes/tracks.get.ts 
and /server/routes/runs.post.ts. Preserve the 'filter' as POST input
```

Před pár měsíci byl můj newsfeed plný článků na téma `prompt engineering` nebo dokonce `context engineering` jako o nové nezbytné vývojářské dovednosti. Ale skokem do současnosti - kontext je váš zdrojový kód a i obyčejný Copilot (pravda, s předplatným Pro) už jenom z něj dokáže jednoduché prompty uchopit dostatečně dobře, aby dodal očekávané výsledky. V poslední době používám nejvíc model `Claude Sonet 4.5`, ale s jinými modely jsem to vlastně nesrovnával.

Šelmostroj chvíli přemýšlel a pracoval, a pak mi dodal požadovaný refaktoring. Vědom si zásad [The AI Manifesto](https://ai-manifesto.dev/) jsem to, co mi vygeneroval, nepřijal bez důkladného přezkoumání. Všechny změny jsem pečlivě prošel.

To je velká výhoda pro nás, zkušené vývojáře — můžeme výsledky **ověřit**, protože  dostatečně dobře rozumíme kódu. I když AI používám ke zkoumání nových _jak udělat XY_ otázek, dokážu do určité míry sledovat, co se děje, a udělat si základní představu. A části, kterým skutečně nerozumím, mohu dále zkoumat otázkami jako _Co to dělá?_ nebo _Proč jsi to tam dal?_.

Tentokrát byla kontrola kódu snazší, protože _vím_, jak napsat novou Nitro route. Jen jsem si tentokrát dovolil využít, že mám teď kapesního juniora, který to může udělat za mě. Nebudu vás obtěžovat implementačními detaily, ale pokud byste měli zájem. upozorním na mou [sérii Nuxt tutoriálů](/article/nuxt-simple), kde se můžete dozvědět více (konkrétně ve 4. díle).

Výsledek nakonec předčil očekávání. Dodaný kód byl v pořádku. Jediný problém, který ovšem Copilot nemohl předvídat (leda bych pro můj `nuxt-neon` začal dodávat MCP server, což možná jednou udělám, _ale ne dnes), byl ten, že jsem nedávno rozdělil composable pro server a klienta, takže bylo potřeba importovat `useNeonServer` místo `useNeonClient`.

To jsem opravil ručně. Měl jsem tak k Copilotovi jen jednu malou připomínku:

```
Do we need "useAsyncData"? Shouldn't we be fine with "useFetch"?
```

Byla to spíš kosmetická záležitost, jednodušší způsob dosažení stejného výsledku - načíst data z backendu do frontendu. A upřímně, byla to moje chyba, protože v kódu jsem sám roky používal `useAsyncData` a důvěřivý Copilot to prostě zkopíroval. Ale na výzvu rychle dodal zjednodušující úpravu.

Čtení dat tedy bylo zabezpečeno na backendu. Dál jsem potřeboval udělat totéž pro přidávání nových běhů. Můj třetí prompt proto byl:

```
Going further. Lets also move "submitRun" method from client side 
Form.vue to new server side /server/routes/runs-add.post.ts and 
redirect client Vueform component to it.
```

Bylo to rychlé a AI zachytilo i změnu na `useNeonServer` a správně ji napodobilo. Stejně tak pochopilo, jak funguje VueForm a jak mu předat url endpointu, kam má posílat svá data. Vznikl ale technický problém - protože data z formuláře jsou posílána jako `multipart/form-data`, nelze pro parsování příchozího požadavku na serveru použít standardní Nitro metodu `readBody`. Správná metoda pro tuto situaci je `readFormData`. Copilot mi a základě jednoduchého console logu rychle pomohl debugovat a chybu sám opravil.

Poslední částí byla migrace funkce pro mazání chybných záznamů:

```
Last refactor. Move "deleteRun" from Table.vue to backend to 
/server/run-delete.delete.ts
```

Byla by to už úplná hračka, kdybych neomylem neklikl na "undo" místo "keep" a všechny změny zase nesmazal 🙈 Naštěstí AI nesoudí a úpravu obratem znovu vytvořilo.

Strávil jsem ještě nějaký čas testováním (a vymýšlením dalších nápadů na refaktoring), ale práce, které jsem se tak dlouho bál pustit, byla hotová.

## Závěr

Jeden večer, méně než hodina, a migrace ze zranitelného Nuxt frontendu na bezpečnější Nitro backend byla dokončena. Většinu času jsem neprogramoval, jen jsem četl a ověřoval, co vytvořil Copilot.

Úkol, který jsem nechtěl začít, byl hotový dřív, než můj unavený mozek mohl začít obtěžovat. Bylo to zábavné, užitečné a posunulo mě to. Jen by mě zajímalo, kolik dalších takových úkolů v mých zásobnících nápadů ještě čeká. Brzy to půjdu zjistit.
