---
file: 'nuxt-ignis-reforged'
cat: 'web'
title: 'Nuxt Ignis Reforged'
dscr: 'Nuxt - jak snadno integrovat knihovny UI prvků'
tags: ['web', 'JavaScript', 'Nuxt', 'opensource', 'projekt', 'novinka']
date: '2026-06-09'
created: '09.06.2026'
english: 'https://dev.to/aloisseckar/nuxt-ignis-reforged-5f9m'
---

**Dev.to** má pravidelnou diskuzi _„What was your win this week?“_ (Jaký byl tento týden tvůj úspěch?). Pro mě to tentokrát bylo jednoznačně _„Dokončil a vydal jsem novou verzi svého open-source Nuxt projektu“_. Nyní mi dovolte vám ho představit.

## O co jde a proč by vás to mělo zajímat?

Zamiloval jsem si [Nuxt](https://nuxt.com/). Je to nejlepší framework pro tvorbu moderních webů, jaký znám, a práce s ním je tak naplňující, že odmítám trávit čas hledáním alternativ. Takže ano, můžete se mnou polemizovat a obhajovat svá oblíbená řešení, ale nejspíš vás nevyslechnu. Pokud chcete Nuxt sami poznat lépe, mám [rozpracovanou sérii tutoriálů](https://dev.to/aloisseckar/nuxt-tutorial-0-introduction-4mli).

Jedna věc mě ale trápila. Jádro Nuxtu je (záměrně) malé a mnoho běžných úloh vyžaduje externí nástroje a knihovny. Autoři Nuxtu sice maximálně usnadnili jejich vzájemnou integraci, ale stejně to vždy musíte udělat sami. Teď si představte, že máte více projektů, každý s tuctem nebo více závislostmi. Vaši [dependaboti neustále křičí o nutnosti aktualizací](https://dev.to/aloisseckar/keeping-dependencies-in-your-github-projects-up-to-date-with-dependabot-16bg) a vy je musíte pořád spravovat. Ne jednou, ale několikrát. A přes noc se objeví nová zranitelnost a zítra to celé začne nanovo...

Když mě tohle už dost otravovalo, začal jsem přemýšlet o optimalizaci.

Co kdybyste mohli záviset jen na jednom npm balíčku a mít přístup ke všemu, co potřebujete? Konektor k databázi, UI knihovna, formuláře, validace, co si jen vzpomenete...

Nechtěl jsem ale vytvořit tzv. _opinionated_ řešení, které by každého uzamklo do jednoho způsobu práce. Místo toho má být Nuxt Ignis **optionated** (existuje vůbec takové slovo?). Měl by poskytovat rozumné výchozí hodnoty založené na známých a osvědčených postupech a trendech, ale neměl by uživatelům bránit v tvorbě vlastních kombinací.

Tak jak na to?

## Jak jsem začal a jak jsem málem selhal

Většina znovupoužitelných integrací s Nuxtem se dělá pomocí featury zvané [moduly](https://nuxt.com/modules). Nuxt moduly jsou sjednocené API adaptéry, které rozšiřují základní Nuxt aplikaci o nástroje třetích stran. A vy v podstatě jen musíte v srdci celé konfigurace, [v souboru `nuxt.config.ts`](https://nuxt.com/docs/4.x/directory-structure/nuxt-config), říct, které moduly chcete zapnout.

Takže pokud by mohl být seznam modulů dynamický a založený na konfiguraci, aplikace by se mohla stát dynamickým obalem kolem 0-n integrací. Má to ale jeden háček. Obsah `nuxt.config.ts` musí být v okamžiku buildu statický. Vite sestaví Nuxt aplikaci podle vašich představ, ale nemůže ji poté sestavit znovu. A jéje!

Po určitém experimentování jsem přišel na to, jak to obejít. Prohlásil jsem Nuxt Ignis za [vrstvu (layer)](https://nuxt.com/docs/4.x/getting-started/layers), což je další skvělá funkce Nuxtu, která vám poskytuje chování podobné dědičnosti. Váš projekt bude **rozšiřovat** `nuxt-ignis`, znovupoužije to, co je tam deklarováno, build však proběhne na vašem stroji (nebo v produkci) až ve chvíli, kdy si řeknete. Zůstala jediná otázka - jak můžete ovlivnit `nuxt.config.ts`, aniž byste museli vše psát ručně sami?

I to jsem vyřešil. Pomocná funkce `defineNuxtConfig` uvnitř `nuxt.config.ts` přijímá jako argument objekt. Obvykle ho do ní zapíšete přímo (inline) a všechny hodnoty jsou čistě statické. Nic vám ale ve skutečnosti nebrání předat výsledek funkce. A tato funkce se spustí automaticky, když build Nuxtu provádí `defineNuxtConfig` a potřebuje zpracovat její argument. A protože jsme v Node.js (nebo jiném JS runtime prostředí), máme přístup k `process.env`. A tak můžeme číst [poskytnuté proměnné prostředí](https://nuxt.com/docs/4.x/directory-structure/env) a sestavit statický konfigurační objekt dostatečně dynamicky.

Napsal jsem funkci nazvanou jednoduše `setFeatures`. Takhle vypadala poslední verze: [features.ts v Nuxt Ignis](https://github.com/AloisSeckar/nuxt-ignis/blob/v0.5.3/core/features.ts) (v0.5.3)

Svou práci dělala perfektně. Když jsem chtěl Nuxt UI, dala mi Nuxt UI. Když jsem chtěl Supabase, dostal jsem ho. Když jsem nechtěl nic, dostal jsem (téměř) základní Nuxt. Když jsem chtěl všechno...

No, tady brzy začaly problémy. Řešení, které vypadalo tak slibně, se začalo poměrně rychle dusit samo sebou. Množství závislostí vytvořilo chaos, velikost výsledného balíčku rostla, časy buildu se prodlužovaly a čekání na nastartování dev serveru bylo brzy zatraceně dlouhé. A přitom to bylo „jen“ asi 25 integrací. Rozhodně jsem plánoval víc.

## Zpátky k rýsovacímu prknu

Měl jsem šest webů, které na Nuxt Ignis `v0.5.3` běžely bez zjevných problémů. Pro představu si můžete [tři z nich prohlédnout zde](https://nuxt-ignis.com/1-3-showcase.html). Nebyl jsem ale vůbec spokojený s výkonem. Když _developer experience_ trápila mě, jistě by trápila i kteréhokoli potenciálního uživatele. Nějakou dobu jsem nevěděl, co mám dělat. Vlastně jsem zvažoval, že projekt opustím jako neživotaschopný. Pěkný myšlenkový experiment, ale v praxi slepá ulička.

Pak jsem na loňské [konferenci PragVue](https://pragvue.com/) potkal jednoho člověka (mimochodem, ročník 2026 se chystá a budeme moc rádi, když se k nám připojíte). Zabrnkal na tu správnou strunu kdesi v hloubi mé mysli, když navrhl použít pro pohodlnější konfiguraci Nuxt moduly.

Trvalo pár týdnů, než jsem hrubou myšlenku přetavil v nějaký uskutečnitelný plán. Pak jsem začal znovu experimentovat a implementovat, vše rozbil a rozebral na kusy a pomalu zase skládal dohromady.

Malá poznámka - AI (Copilot) mi v této fázi hodně pomohla. Věděl jsem, kam chci dojít, ale byl to Copilot používající model Claude Opus, kdo se prohrabal většinou dokumentace a zdrojových kódů a odvedl tu nejtěžší práci. Ctil jsem ovšem [The AI Manifesto](https://dev.to/aloisseckar/the-brink-of-new-ai-standard-1a1i) a vždy dbal na to, abych rozuměl všemu, co se v mém zdrojovém kódu dělo. Někdy jsme postupovali rychle, jindy pomaleji. Někdy jsme zabloudili. Někdy jsem musel zasáhnout a vyžádat si zásadní refaktoring, které AI sama neviděla. Možná o tomto procesu jednou napíšu samostatný článek. Prozatím vám stačí vědět, že jsme se nakonec dopracovali k cíli. Bylo to inspirativní a zábavné. A co je nejdůležitější - fungovalo to!

## Nové modulární řešení

Klíčovou strukturální změnou „nového“ Nuxt Ignis je rozbití jednoho zamotaného balíčku na samostatné moduly rozdělené podle logických domén. Centrální balíček `nuxt-ignis` je stále Nuxt vrstvou, ale místo toho, aby měl vše napěchované uvnitř sebe sama, využívá kompoziční sílu Nuxt modulů.

Zatím jsem identifikoval 7 rozlišitelných oblastí (i když to nemusí být konečné číslo). Každý modul je nyní samostatný npm balíček s prefixem `@nuxt-ignis/*` a je zabalen jako plnohodnotný Nuxt modul. Bylo to možné, protože Nuxt moduly mohou samy záviset na jiných modulech. Mohou deklarovat moduly, které potřebují pro svůj běh, uvnitř `moduleDependencies` v rámci funkce `defineNuxtModule`. Je to přitom víc než jen prostý nákupní seznam názvů modulů; umožňuje to také předávat do nich konfiguraci. Díky tomu může Nuxt Ignis poskytovat výchozí hodnoty. A umožňuje to budoucím uživatelům je v případě potřeby přepsat. A protože jde o spustitelnou funkci, může obsahovat dynamickou JS logiku a vracet různé seznamy modulů na základě hodnot uživatelské konfigurace. Když Nuxt vyhodnocuje své moduly, rekurzivně vyřeší všechny deklarované závislosti modulů a aktivuje ty, které byly vyžádány. Buď žádné, nebo některé, nebo všechny.

Takto bylo sestavování delegováno z centrálního balíčku `nuxt-ignis` do samostatných submodulů. Původní custom funkce `setFeatures` úplně zanikla. Nuxt je v načítání modulů docela efektivní a rozhodně to běží rychleji než dřív, přičemž si řešení zachovává stejnou míru flexibility. Jádrová vrstva a sedm interních modulů jsou nyní spíše jen malé obálky kolem tranzitivních závislostí. Váš package manager sice stále stáhne vše do vašich node_modules (nevidím způsob, jak se tomu vyhnout), ale vývojové a produkční buildy pracují pouze s tím, co bylo vámi skutečně vyžádáno. Buildy jsou mnohem rychlejší a výsledné balíčky menší.

Cíloví uživatelé stále závisí výhradně na `nuxt-ignis`. A získali jednu zajímavou výhodu - nyní lze uvnitř `nuxt.config.ts` použít konfigurační klíč `ignis` a máte typově bezpečný způsob konfigurace výsledku i s nápovědou (IntelliSense). Stačí poprvé spustit příkaz `nuxt dev`, aby se vytvořily deklarační soubory `.d.ts`. Je to mnohem pohodlnější než spoléhat se na proměnné prostředí, ve kterých se snadněji dělaly překlepy a hůře se ladily. Ale pokud je preferujete nebo pokud potřebujete různé konfigurace v různých prostředích bez nutnosti znovu sestavovat projekt, proměnné prostředí stále fungují (a mají vyšší prioritu).

Novou verzi jsem zatím otestoval na všech mých šesti webech běžících na Nuxt Ignis. Vše funguje, jak má a jako dřív.

**Proto oficiálně prohlašuji [nuxt-ignis@0.6.0](https://npmx.dev/package/nuxt-ignis/v/0.6.0) za vydaný a připravený k použití.**

Budu rád za jakoukoli zpětnou vazbu, komentáře nebo i stížnosti.

## Co bude dál?

Mám už řadu nápadů, které by stály za realizaci. Zejména další integrace s dalšími užitečnými Nuxt moduly a knihovnami třetích stran. To buď prokáže, že nová modulární architektura funguje dobře, nebo to tu myšlenku zase pohřbí.

Pak je tu jedna velká a důležitá otázka, ke které zatím nemám jasno.

**Měl by se Nuxt Ignis opravdu snažit slepit dohromady tak nějak „každou“ možnou variantu?**

Tím myslím, že někdo používá Nuxt UI, někdo by preferoval PrimeVue, jiní něco dalšího. Existuje Vueform, Formkit, Formish, Formwerk a kdoví co. Validovat můžete pomocí Zod, Valibot, VeeValidate...

Takže? Desítky (více či méně) rovnocenných integrací? Nebo by se měl Nuxt Ignis nakonec přeci jen stát více **opinionated** a vybrat pro každou doménu jen jedno řešení a „jen“ nechat uživatele rozhodnout, zda ho použít, nebo ne?

Upřímně, nevím. Oba přístupy mají svá pro a proti.

Co bych teď opravdu potřeboval, je zpětná vazba od skutečných uživatelů (za předpokladu, že nějací jsou a není to jen má osobní oblíbená hračka). Doufám tedy, že se tohle dostane k někomu, kdo to bude považovat za užitečné a bude chtít sdílet svůj názor. Těším se na vaše ohlasy.
