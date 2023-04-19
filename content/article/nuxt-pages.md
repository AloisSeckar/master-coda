Základy Vue.js aplikací se staví pomocí **_komponent_**. Komponenta Vue.js je textový soubor s příponou `.vue`, která se obvykle skládá ze tří možných části:
- `<template>` - šablona definující předpis pro vykreslení (rendering) a za běhu se převádí na skutečné HTML+CSS
- `<script>` - prostor pro JavaScript (TypeScript) definici speciální funkcionality komponenty
- `<style>` - možnost definice grafických CSS stylů

Poměrně často chybí sekce `<style>`, protože komoponenta buď žádné "svoje" styly nepotřebuje definovat, nebo se stylování řeší klasickým centralizovaným způsobem pomocí importu .css (nebo .scss, aj.) souborů. Setkáváme se také s komponentami bez sekce `<script>`, které definují pouze statický vzhled, nebo jednoduché JS výrazy používají inline přímo v `<template>`. Komponenta bez `<template>` je validní (musí však v takovém případě obsahovat `<script>` sekci), ale zatím jsem se nesetkal s praktickým použitím. Pro obslužný kód bez grafického výstupu je lépe použít jiné metody, o kterých si něco řekneme v dalších částech tutorialu.

Aby bylo možné komponenty používat na jiných místech Vue.js aplikace, je třeba je **_registrovat_** - buďto v jiné komponentě, kde je chceme použít, nebo to lze i globálně pro celou aplikaci. Ve vanilla Vue.js se to ale každopádně musí dělat ručně.

Aby mohla mít Vue.js aplikace více stránek než pouze úvodní obsah na úrovni domény, je třeba použít nástroj **Vue router** a nadefinovat URL cesty (routes) ke komponentám, které se mají pro tu kterou URL zadanou v prohlížeči zobrazit. Opět se to musí dělat ručně.

Nuxt programátory od obou těchto činností umí efektivně odstínit prostřednictvím speciálních adresářů `/components` a `/pages`, které si nyní představíme.

## /components

Nuxt předpokládá, že v projektovém podadresáři `/components` nalezne námi definované komponenty. Je schopen poznat, že jde o definiční soubor komponenty, a provést automatickou globální registraci. Pokud tedy napíšeme komponentu `/components/MojeKomponenta.vue`, aniž bychom se museli starat o cokoliv dalšího, můžeme v šablonách jiných komponent použít tag `<MojeKomponenta>`, jenž v příslušném místě vykreslí její obsah.

Kromě toho dokáže Nuxt sám cestovat i do vnořených podadresářů, přičemž název výsledné komponenty složí z celé relativní cesty + názvu souboru `.vue`. Komponenta `/components/moje/komponenta.vue` bude rovněž k dispozici jako `<MojeKomponenta>`. Ani v tomto případě se nemusíme o nic starat.

Je ovšem diskutabilní, nakolik tuto schopnost používat. Její existence dohromady s Vue.js konvencí, že se názvy komponent mají skládat "od nejobecnějšího ke konkrétnímu", svádí k tomu vyrobit hodně podadresářů s mnoha jednoslovně pojmenovanými `.vue` soubory na nejnižší úrovni (toto není v rozporu s konvencí o víceslovných názvech Vue.js komponent, protože výsledný název je složený z cesty + názvu souboru). Zní to jako dobrý nápad, ale na druhou stranu to později ve větších aplikacích může znamenat problémy s orientací v hromadě různě zanořených souborů. Soubory v různých cestách se navíc mohou jmenovat stejně a navzájem se plést. Proto existují i doporučení, aby se spíše všechny komponenty pojmenovávaly plným názvem a umisťovaly přímo do kořenového adresáře `/components`. 

Nemám na to zatím zcela vyhraněný názor. Je pravda, že ve větším projektu, kde jsem jemné členění zavedl, už celkem narážím na to, že se ten který soubor hůře hledá. Na druhou stranu od určitého počtu zřejmě není ani jeden adresář až tak přehledný...

Důležité každopádně je, že Nuxt sám od sebe podporuje obě možnosti a od nás k tomu krom samotných souborů nic víc nepotřebuje. Dokonce se můžeme rozhodnout po čase strukturu změnit a nemusíme pak nikde nic upravovat. Protože jsou registrace automatické, nemusíme nikde ve skriptech definovat cesty a tudíž je pak ani nemusíme měnit. Nuxt si svoje linkovací `.d.ts` soubory generuje sám, takže si je i sám přepracuje. V nejhorším nás čeká krátký restart dev serveru.

## /pages

Díky složce `/components` už máme způsob, jak si všude v Nuxt aplikaci zpřístupnit námi definované komponenty. Druhá speciální složka `/pages` obsahuje rovněž soubory, které jsou technicky Vue.js komponentami, také je automaticky procesuje, ale dělá s nimi trochu něco jiného. Obsažené podadresáře a soubory komponent převádí na aplikační cesty (routes). Pokud odpovídající URL zadáte do prohlížeče, vykreslí se obsah příslušné komponenty.

Základem je typicky soubor `/pages/index.vue`, který obsauje to, co se zobrazí po první návštěvě domény - v testovacím případě `http://localhost:3000`. Pokud máme skutečně "jednostránkovou" aplikaci, lze tento krok přeskočit a všechno mít už přímo v `app.vue`. Jakmile ale začneme přidávat další stránky, už se bez této stránky moc neobejdeme, protože Nuxt by pak měl problém určit, co má ve výchozím stavu zobrazit.

Přidáme-li soubor `/pages/first.vue`, aplikace bude schopná zobrazit odpovídající obsah při návštěvě `http://localhost:3000/first`. Pokud přidáme podadresáře, je struktura respektována. Obsah `/pages/first/second.vue` bude zobrazen na `http://localhost:3000/first/second`. Pokud Nuxt žádnou odpovídající stránku nenajde, vyhodí chybu 404. To všechno se stejně jako u registrace komponent děje "samo". My prostě jen přidáváme nové stránky a Nuxt tvoří nové URL.

To ale ještě není všechno. Nuxt zvládá i tzv. "dynamické" stránky. Pokud název souboru či adresáře obalíme do hranatých závorek, začne Nuxt zachytávat "cokoliv", co nebylo možné namapovat na více specifickou cestu. Tzn. pokud založíme `/pages/[page].vue` a nic dalšího, bude nám do této komponenty padat úplně vše (tedy neplatí tak docela, že _vždy_ potřebujeme `/pages/index.vue`). Pokud k tomu založíme `/pages/first.vue`, tak `http://localhost:3000/first` povede na obsah stránky `first` a cokoliv jiného na obsah stránky `[page]`.

Části v hranatých závorkách se říká "slug" a většinou slouží k identifikaci unikáního datového obsahu, který se ale v obecné rovině zobrazuje stejně. Typicky můžeme mít například stránku pro detail produktu v obchodě `/pages/product/[id].vue`, která bude v rámci společné šablony zobrazovat konkrétní data na základě zachyceného `id`. 

Parametry získané z URL cesty jsou k dispozici ve `<script>` části komponenty stránky pomocí `useRoute().params` - například tedy `useRoute().params.id` nebo `useRoute().params.page` podle toho, jak jsme pojmenovali náš "slug". S tím pak můžeme ve skriptu pracovat a získat správná data pro zobrazení.

Druhou variantou použití jsou tzv. "catch-all" cesty, kterýmí zobrazíme defaultní stránku pro "cokoliv jiného, než pro co máme dedikovanou stránku", a vyhneme se nutnosti ošetřovat chybu 404.

Chtěl bych ještě zmínit dvě vychytávky:
- lze kombinovat statickou a dynamickou část - tj. například mít soubory `/pages/product-[id].vue` a `/pages/cagtegory-[id].vue`
- nebo je možné mít více "slugs" v jedné cestě - `/pages/[category]/[product].vue`

Jak je vidět, systém je nesmírně flexibilní a sám od sebe dovoluje různá "kouzla". A kdyby defaultní chování Nuxtu nestačilo a potřebovali jsme do výchozího chování aplikace sáhnout ještě více, není problém. Pořád je k dispozici přístup přímo k Vue Routeru, který pod tím vším žije a se vším ve skutečnosti hýbe. Nuxt odvede práci, co ve většině případů stačí, ale možnost plné kontroly je stále na programátorovi.

### Případová studie

Tento blog se zobrazuje díky souboru `/pages/article/[article].vue`. Základ (hlavička s názvem, daty a tagy + patička s odkazy na GitHub) je společný pro všechny články a je realizován pomocí dvou komponent - `/components/ArticleHeader.vue` a `/components/ArticleFooter.vue`. Na základě konkrétní URL (zde `/article/nuxt-pages`) se vybere potřebný obsah článku, který odpovídá unikátnímu výrazu `nuxt-pages`.

**Pozn.:** Princip platí, ale způsob práce se získanou hodnotou je přeci jen trochu odlišný. Více se dozvíte v [Nuxt tutorialu číslo 6](/article/nuxt-content).

## Demo projekt

Zdrojový kód ukázkové implementace naleznete zde:
[nuxt-pages @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-pages)

Projekt definuje celkem 3 stránky v adresáři `/pages`
- `index.vue` - výchozí dostupná v cestě `/` nebo `/index`
- `first.vue` - zobrazí se po zadání `/first`
- `second.vue` - zobrazí se po zadání `/second`

Dále jsou zde 2 komponenty v adresáři `/components`
- `TheMenu.vue` - definuje odkazy na jednotlivé stránky a je vložena do společného layoutu v `app.vue`
- `TextBox.vue` - obsahuje `<div>`, který zobrazí text převzatý z vlastnosti (prop), použita na každé stránce s jiným textem

## Shrnutí

Nuxt usnadňuje práci s Vue.js komponentami tím, že automaticky skenuje dedikované adresáře `/components` a `/pages` a provádí automatickou globální registraci komponent do aplikace. Nad adresářovou a souborovou strukturou v rámci `/pages` navíc automaticky vytvoří routing pro navigaci pomocí URL odkazů.
