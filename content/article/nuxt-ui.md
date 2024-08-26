V [minulém díle tutoriálu](/article/nuxt-gui) jsme si představili různé možnosti integrace CSS a&nbsp;UI knihoven třetích stran do Nuxt projektu. Když jsem s&nbsp;tvorbou webů v Nuxtu začínal, byl to skvělý způsob, jak pracovat s&nbsp;vzhledem aplikace. Vývojový tým však mezitím postoupil ještě o&nbsp;něco dál a&nbsp;přišel s&nbsp;[oficiálním modulem Nuxt&nbsp;UI](https://ui.nuxt.com/).

## Popis modulu

Nuxt UI je knihovna, která kombinuje nabídku univerzálních formulářových prvků tvořených v&nbsp;[Headless&nbsp;UI](https://headlessui.com/) s&nbsp;jejich stylováním pomocí [Tailwind&nbsp;CSS](https://tailwindcss.com/). Pokud se rozhodnete po ni sáhnout, máte navíc díky instalaci jediné závislosti a&nbsp;jediného modulu k&nbsp;dispozici celou řadu dalších užitečných funkcí -&nbsp;Tailwind styly samotné, přepínač mezi light/dark módem, modul pro načítání ikon či knihovnu utilit [VueUse](https://github.com/vueuse/vueuse).

Kromě základní verze zdarma, která mi zatím plně vyhovuje, existuje i&nbsp;[placená nadstavba](https://ui.nuxt.com/pro/getting-started) s&nbsp;více profesionálně předpřipravenými komponentami.

Nuxt UI mi rychle přirostlo k&nbsp;srdci. Pro jednodušší weby bez specifických požadavků na vzhled je okamžitě ready-to-use. Zároveň je hodně flexibilní. V&nbsp;práci nyní pro jeden projekt stavíme svou vlastní UI knihovnu, kde je Nuxt&nbsp;UI použito jako základ. Povedlo se nám ho krásně nastylovat, že výsledek vypadá prakticky stejně, jako aplikace vyvinuté dříve v&nbsp;Java frameworku Vaadin. Zákazník tedy v&nbsp;podstatě ani nepozná, že dostal na pozadí úplně jinou technologii.

## Případová studie

Jeden z mých menších projektů je "Kalkučka TQB". Hodnota TQB se používá na baseballových a&nbsp;softballových turnajích WBSC pro určení pořadí v&nbsp;případě, že se více týmů sejde v&nbsp;kolečku vzájemných zápasů. Je to trochu složitější vzorec, který zjednodušeně vyjadřuje, kdo skóroval více bodů než jich obdržel. Protože jsme to letos na turnajích několikrát počítali ručně, a&nbsp;protože se mě jeden z&nbsp;trenérů zeptal, proč to WBSC nemá na svém webu automatizované, napadlo mě takový web vytvořit.

Technicky to není nic složitého. Prostě jen dosadit body a&nbsp;počty odehraných směn z&nbsp;jednotlivých zápasů do předepsaného vzorce. Nejdůležitější grafická část jsou vstupní pole pro zadání hodnot. A&nbsp;přesně tam se skvěle uplatnil modul Nuxt&nbsp;UI -&nbsp;předstylovaná textová pole a&nbsp;tlačítka v&nbsp;kombinaci s&nbsp;dostupnými Tailwind&nbsp;CSS styly pro poskládání do jednoduchého responzivního layoutu plně dostačují. Proč dělat věci složitě, když to jde jednoduše?

Výsledek si můžete prohlédnout zde: https://wbsc-tqb.netlify.app/

A zdrojové kódy zde: https://github.com/AloisSeckar/WBSC-TQB-Calculator

## Demo projekt

Zdrojový kód ukázkové implementace Nuxt UI naleznete zde:
[nuxt-ui @ GitHub](https://github.com/AloisSeckar/demos-nuxt/tree/main/nuxt-ui)

Projekt obsahuje balíček Nuxt UI jako závislost v&nbsp;`package.json` a&nbsp;v&nbsp;sekci `modules` konfiguračního `nuxt.config.ts` definuje příslušný modul. Tím je všechno nastaveno a&nbsp;automaticky nataženo.

V souboru `app.vue` je vytovřen přehled se základními ukázkami použití.

## Shrnutí

Ekosystém frameworku Nuxt se neustále rozvíjí a&nbsp;obohacuje s&nbsp;cílem maximálně odlehčit vývojářům práci a&nbsp;odstínit je od opakující se rutiny. Nuxt&nbsp;UI patří mezi výsledky této snahy a&nbsp;nabízí připravenou knihovnu UI a&nbsp;formulářových prvků, které můžete začít používat jednoduchou instalací jediné závislosti. Pro menší projekty bez speciálních požadavků je to skvělá volba s&nbsp;minimem úsilí.

Samozřejmě mohou přijít i&nbsp;složitější scénáře. Například když je potřeba sestavit větší a&nbsp;složitější formulář a&nbsp;nějak elegantně řešit jeho validaci a&nbsp;odesílání. V&nbsp;příštím díle si proto povíme o&nbsp;[knihovně FormKit](/article/nuxt-forms), která toto umí a&nbsp;také se do Nuxtu velmi snadno zavádí.
