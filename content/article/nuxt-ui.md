---
file: 'nuxt-ui'
cat: 'web'
title: 'Nuxt Tutorial 8 - Nuxt UI'
dscr: 'Nuxt - práce s modulem Nuxt UI dedikovaným pro práci s uživatelským rozhraním'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tutorial', 'UI', 'CSS']
date: '2024-08-26'
created: '26.08.2024'
---

V [minulém díle tutoriálu](/article/nuxt-gui) jsme si představili různé možnosti integrace CSS a UI knihoven třetích stran do Nuxt projektu. Když jsem s tvorbou webů v Nuxtu začínal, byl to skvělý způsob, jak pracovat s vzhledem aplikace. Vývojový tým však mezitím postoupil ještě o něco dál a přišel s [oficiálním modulem Nuxt UI](https://ui.nuxt.com/).

## Popis modulu

Nuxt UI je knihovna, která kombinuje nabídku univerzálních formulářových prvků tvořených v [Headless UI](https://headlessui.com/) s jejich stylováním pomocí [Tailwind CSS](https://tailwindcss.com/). Pokud se rozhodnete po ni sáhnout, máte navíc díky instalaci jediné závislosti a jediného modulu k dispozici celou řadu dalších užitečných funkcí - Tailwind styly samotné, přepínač mezi light/dark módem, modul pro načítání ikon či knihovnu utilit [VueUse](https://github.com/vueuse/vueuse).

Kromě základní verze zdarma, která mi zatím plně vyhovuje, existuje i [placená nadstavba](https://ui.nuxt.com/pro/getting-started) s více profesionálně předpřipravenými komponentami.

Nuxt UI mi rychle přirostlo k srdci. Pro jednodušší weby bez specifických požadavků na vzhled je okamžitě ready-to-use. Zároveň je hodně flexibilní. V práci nyní pro jeden projekt stavíme svou vlastní UI knihovnu, kde je Nuxt UI použito jako základ. Povedlo se nám ho krásně nastylovat, že výsledek vypadá prakticky stejně, jako aplikace vyvinuté dříve v Java frameworku Vaadin. Zákazník tedy v podstatě ani nepozná, že dostal na pozadí úplně jinou technologii.

## Případová studie

Jeden z mých menších projektů je "Kalkučka TQB". Hodnota TQB se používá na baseballových a softballových turnajích WBSC pro určení pořadí v případě, že se více týmů sejde v kolečku vzájemných zápasů. Je to trochu složitější vzorec, který zjednodušeně vyjadřuje, kdo skóroval více bodů než jich obdržel. Protože jsme to letos na turnajích několikrát počítali ručně, a protože se mě jeden z trenérů zeptal, proč to WBSC nemá na svém webu automatizované, napadlo mě takový web vytvořit.

Technicky to není nic složitého. Prostě jen dosadit body a počty odehraných směn z jednotlivých zápasů do předepsaného vzorce. Nejdůležitější grafická část jsou vstupní pole pro zadání hodnot. A přesně tam se skvěle uplatnil modul Nuxt UI - předstylovaná textová pole a tlačítka v kombinaci s dostupnými Tailwind CSS styly pro poskládání do jednoduchého responzivního layoutu plně dostačují. Proč dělat věci složitě, když to jde jednoduše?

Výsledek si můžete prohlédnout zde: https://wbsc-tqb.netlify.app/

A zdrojové kódy zde: https://github.com/AloisSeckar/WBSC-TQB-Calculator

## Demo projekt

Zdrojový kód ukázkové implementace Nuxt UI naleznete zde:
[nuxt-ui @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-ui)

Projekt obsahuje balíček Nuxt UI jako závislost v `package.json` a v sekci `modules` konfiguračního `nuxt.config.ts` definuje příslušný modul. Tím je všechno nastaveno a automaticky nataženo.

V souboru `app.vue` je vytvovřen přehled se základními ukázkami použití.

## Shrnutí

Ekosystém frameworku Nuxt se neustále rozvíjí a obohacuje s cílem maximálně odlehčit vývojářům práci a odstínit je od opakující se rutiny. Nuxt UI patří mezi výsledky této snahy a nabízí připravenou knihovnu UI a formulářových prvků, které můžete začít používat jednoduchou instalací jediné závislosti. Pro menší projekty bez speciálních požadavků je to skvělá volba s minimem úsilí.

Samozřejmě mohou přijít i složitější scénáře. Například když je potřeba sestavit větší a složitější formulář a nějak elegantně řešit jeho validaci a odesílání. V příštím díle si proto povíme o [knihovně FormKit](/article/nuxt-forms), která toto umí a také se do Nuxtu velmi snadno zavádí.
