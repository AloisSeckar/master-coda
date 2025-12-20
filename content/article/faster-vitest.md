---
file: 'faster-vitest'
cat: 'web'
title: '10x rychlejší Vitest testy v mé Nuxt aplikaci'
dscr: 'Úkol zněl jasně - zrychlit běh mé tesotvací sady. Jak jsem to dokázal a jak mi na cestě (ne)pomohla AI.'
tags: ['web', 'JavaScript', 'Vitest', 'Nuxt', 'Vue.js',  'tests', 'optimization', 'AI']
date: '2025-12-20'
created: '20.12.2025'
english: 'https://dev.to/aloisseckar/i-made-my-vitest-suite-in-nuxt-run-ten-times-faster-6j7'
---

Dřív jsem musel čekat **cca 3 minuty**, než mi na projektu doběhnou testy — teď ta samá sada končí **za méně než 20 sekund**. Pojďme se podívat, kde byl problém a jak jsem _vibe kódoval_ redesign řešení. **Spoiler:** Bylo to bolestivé běhání v kruzích a i když mi AI dala pár cenných postřehů, nakonec jsem musel být _„Deus ex Machina“_ sám.

Asi nemusím vysvětlovat, proč jsou automatizované testy důležité: chrání aplikace před zavlečením zbytečných chyb. Nikdy to není 100%, ale jak plyne čas, testovací sady se zvětšují, pokrývají více situací a hlavně brání tomu, aby se bugy **vracely**. Obávám se, že vytvořit si zvyk psát testy pravidelně, je docela těžké — zvlášť u osobních projektů — ale dnešní tooling se snaží věci maximálně zjednodušit a zpříjemnit. Nastavit [Vitest](https://vitest.dev/) pro [testování Nuxt aplikací](https://nuxt.com/docs/4.x/getting-started/testing) je rychlovka a můžete začít.

Vyvinete novou funkcionalitu, napíšete k ní testy a spustíte sadu, abyste ověřili, že:

1. Nové testy prochází — nová funkcionalita funguje podle očekávání
2. Staré testy **pořád prochází** — nerozbili jste omylem něco zdánlivě nesouvisejícího

Pak můžete commitovat s mnohem větší sebedůvěrou.

Má to ale háček: s více testy pomalu roste doba běhu a dřívější sekundy se mohou časem protáhnout na minuty. Takže čekáte, odskočíte se jinam, vrátíte se a zjistíte, že testy spadly. Opravíte chybu, spustíte testy znovu… a zase čekáte minuty. Uděláte to párkrát a najednou se vám celá ta myšlenka už tolik nelíbí.

## Vymezení problému

Testovací sada pro můj Nuxt modul na připojení k databázi [Neon](https://neon.com/) se dostala na dobu běhu přes 180 sekund. Už mi to nepřišlo v pořádku. Testy sice testovaly, ale neefektivita tvrdě dopadla na moji vývojářskou zkušenost. Byl to moment, kdy se z _předčasné optimalizace_ stala optimalizace **nutná**.

Protože je rok 2025, přizval jsem AI, aby situaci zhodnotila a pomohla s brainstormingem nápadů na řešení.

Copilot mě rychle upozornil, že pro každý testovací soubor používám separátní instanci Nuxt aplikace. Na první pohled to vypadalo jako dobré rozdělení zodpovědností — SELECTy testovat v jedné aplikaci, INSERTy v jiné. Mělo to pomoct udržet soubory malé a přehledné. Jenže start nové instance něco stojí a všechny testy musí čekat, než se jejich aplikace nabootuje.

Aby toho nebylo málo, testy jsem pouštěl sekvenčně. Protože když se něco rozbije a modul se třeba ani nepřipojí do databáze, proč se měl snažit testovat funkce? Nebo když SELECTy padají kvůli chybě při skládání SQL dotazu, proč zkoušet INSERTy, které by stejně nevyhnutelně selhaly? Tím se čekání sčítalo. A i když nakonec všechno fungovalo, skončil jsem u těch tří minut.

## První iterace - dvojnásobná rychlost

Řešení bylo nasnadě: sloučit separátní testovací aplikace do jedné. Šlo to celkem snadno, protože jsem testy navrhl tak, že každý má svou dedikovanou Nuxt stránku (tedy vlastní URL), kde se připojí, provede SQL akci navázanou na tlačítko a pak ověří výsledné HTML proti očekávaným hodnotám. Takže jsem v praxi jen „srazil“ několik adresářů `/app/pages` do jednoho a udělal pár drobných úprav v `app.vue`.

Jenže to nestačilo. Protože soubory E2E testů pořád dělaly:

```ts
await setup({
  rootDir: fileURLToPath(
    new URL('./neon-test-app', import.meta.url)),
})
```

přes funkci z balíčku `@nuxt/test-utils/e2e`. Tím se stále vytváří a připojuje nová instance Nuxt aplikace pro **každý** testovací soubor. A to pořád stojí hodně času.

Upřímně, zrychlení bylo už tak vidět. Tipuju, že se začal využívat caching některých částí a mountovat stejnou aplikaci pětkrát tak bylo zhruba dvakrát rychlejší než mountovat pět různých aplikací. Ale pořád to bylo dost neefektivní.

Ve skutečnosti jsem potřeboval, aby když kterýkoli test udělá:

```ts
const page = await createPage()
```

tak aby se připojil pokaždé ke **stejné** instanci demo aplikace. Ta by se spustila jen jednou a pak by ji všechny testy dokázaly použít „lusknutím prstu“.

## Druhá iterace - 10x rychlost, ale…

Jak toho dosáhnout? Nevěděl jsem. Tak jsem se zeptal svého chytřejšího/hloupějšího elektronického asistenta. Přišel s hodně neortodoxním řešením. Pokud si chcete projít detaily, výsledek je commitnutý [ZDE](https://github.com/AloisSeckar/nuxt-neon/commit/32bc4150adefaab175d56ffb2b4227bb505776d6). Teď shrnu jeho nejdůležitější části.

Do `vitest.config.ts` přibylo nové nastavení:

```ts
globalSetup: [
  './node_modules/@nuxt/test-utils/dist/runtime/global-setup.mjs'
],
```

Chvíli mi trvalo pochopit, k čemu to vůbec má být. Zpochybnil jsem Copilotovo uvažování a ověřoval si to ještě u webového ChatGPT 5.2 Plus. Ten mi tu myšlenku potvrdil. Přestože přiznal, že nenašel žádný zdrojový článek ani diskuzi, předsvědčivě tvrdil, že to z kódu _odvodil_ a že by to mělo fungovat. Zdůvodnění dávalo smysl. Neměl jsem co ztratit. Tak jsem tomu uvěřil.

Zkrátka: spuštění uvedeného souboru v `globalSetup` před tím, než Vitest začne s dalšími akcemi, by mi mělo „magicky“ zajistit existenci namountované aplikace v emulovaném prohlížeči. Abych mu řekl, kterou aplikaci má mountnout, musel jsem dodat proměnnou prostředí `NUXT_TEST_OPTIONS`, která se při procesu konzumuje:

```ts
const rootDir = resolve(fileURLToPath(
  new URL('.', import.meta.url)), 'test/neon-test-app')

// Used by @nuxt/test-utils/runtime/global-setup
process.env.NUXT_TEST_OPTIONS = JSON.stringify({
  // path to neon-test-app
  rootDir,
  // don't create a Playwright browser in globalSetup
  browser: false,
})
```

Druhá klíčová část byla `e2e.setup.ts` — soubor pro akce, které má Vitest spustit před každým testovacím souborem. V `beforeAll` měl vytvořit virtuální instanci prohlížeče — ale jen při prvním běhu, když ještě neexistuje:

```ts
const ctx = useTestContext()
if (!ctx.browser) {
  await createBrowser()
}
```

A takto by všechny testovací soubory získaly přístup ke sdílenému kontextu s připraveným virtuálním prohlížečem a namountovanou Nuxt testovací aplikací. A všechny testy by pak jen zavolaly:

```ts
const page = await createPage()
```

a mohly začít navigovat na požadované URL a testovat.

Snažil jsem se držet svého obvyklého skeptického přístupu k AI a aspoň zhruba pochopit záměry za vyplivnutým kódem. Nepobral jsem všechny detaily, ale jako celek to dávalo smysl. A když jsem to zkusil - **fungovalo to**!

No, ne na první dobrou. Museli jsme ještě pár věcí doladit, ale nakonec testovací sada běžela. A bylo to rychlé! Méně než 20 sekund a všechny testy byly zelené. Když jsem jeden test schválně rozbil, aby se ověřilo, že to opravdu něco spouští a kontroluje, začal selhávat přesně tak, jak měl. Hotovo. Commit, zavřít issue, jít spát s pocitem dobře odvedené práce.

Jenže tam byl jeden „malý“ detail, kterého jsem si tehdy nevšiml. Vitest sice proběhl v pohodě, ale jakmile se proces dokončil, výstup prostě zmizel z terminálu! Nebyla šance si výsledek zpětně přečíst. Pokud jste se zrovna nedívali, nebylo jak zjistit, jestli to vůbec prošlo. A pokud testy spadly, nebylo jak zjistit, co přesně se pokazilo.

Moje testy se tím staly v podstatě nepoužitelné :(

## Třetí iterace - do temnoty a zpět

Proč mi to při vlastní práci uniklo, je samo o sobě zajímavé:

Protože jsme během procesu tvorby s Copilotem zkoušeli různé věci, v jednu chvíli jsme do nastavení aktuálního terminálu přidali  `$env:DEBUG='@nuxt/test-utils*'`. Díky tomu program začal logovat jinak — hodně a bez přerušení. Všechny logy měly prefixy `[source]`, ale toho jsem si skoro nevšiml. Viděl jsem výstup z Vitestu a byl jsem spokojený.

Jenže výchozí chování s `globalSetup` je takové, že terminál je nejdřív „zabraný“ buildem testovací Nuxt aplikace a pak se automaticky přepne do nové _alternate screen_, která je v terminálu vidět jen po dobu, kdy běží související proces. Potom se prostě zahodí a nahradí původním (prázdným) terminálem.

Výše uvedené jsem netušil, dokud jsem nestrávil **HODINY** zbytečnými pokusy o přidávání konfigurací tu i onde. AI chrlila vymyšlené teorie a já se je snažil implementovat — a znovu a znovu to končilo stejným selháním.

Po čase jsme aspoň izolovali ten `DEBUG` jako možný workaround. Jenže ten zase přinášel extrémně ukecaný a zbytečným šumem zahlcený výstup. Filtrování bylo možné, ale bylo závislé na platformě (Windows vs. Linux vs. Mac). Nebo jsem mohl čekat 20 sekund ticha a pak dostat přefiltrovaný výsledek zpracovaný v rámci zřetězení příkazů. Taky nic moc.

Zkoušel jsem s AI různě smlouvat, až jsem nakonec — myslím, že poprvé — dotlačil ChatGPT k tomu, aby řekl: _„Ne, tohle není možné.“_ Nebo přesněji napsal doslova: _„This is the moment where I need to be very explicit and honest, because you’ve now hit a hard boundary, not a missing trick.“_ Teď mi to přijde vtipné, ale včera jsem se nesmál.

Ten večer mě zasáhla tvrdá realita. Proplýtval jsem hodiny honěním se vlastními stíny. A AI mi u toho spokojeně asistovalo a povzbuzovalo mě, ať pokračuju.

Mám rychlé, ale špatně pozorovatelné testy. Buď žádný výstup, nebo výstup zasypaný tunou nesouvisejících debug hlášek, nebo platformně závislé skriptovací příkazy, které to „nějak“ vyčistí.

## Čtvrtá iterace – deus ex homine

V [minulém článku](/article/mysterious-query) jsem se na to šel vyspat a s problémem mi to nepomohlo. Tentokrát ano. Když jsem se dnes ráno probudil - připravený dotáhnout ošklivé, ale jakž takž funkční řešení - najednou mi bleskla úplně „out-of-the-box“ myšlenka.

Co kdybych přestal Vitest zneužívat k něčemu, na co není navržený?

Co kdybych prostě agregoval testovací soubory do jedné velké sady?

Pak by stačilo testovací aplikaci sestavit a připojit jen jednou a potom by se to rozjelo rychle. Ano, mělo by to svou cenu - jeden velký testovací soubor s hromadou testovacích případů. Ale upřímně, z hlediska běhu testů to vlastně tolik nevadí. A zdrojový kód přeci můžu pořád udržet izolovaný tak, že budu mít separátní soubory s definicemi testů, které se budou dynamicky importovat do jednoho hlavního `e2e.test.ts` souboru — jediného, který Vitest skutečně vykoná.

A tak jsem většinu „chytrých hacků“ z řešení číslo 3 zahodil a přišel s něčím úplně jiným. Přestože mě AI asistenti včera zavedli do slepé uličky, použil jsem je i dnes — tentokrát už s jasným záměrem — a znovu mi dokázali dodat užitečné tipy a výstupy. Finální řešení je [ZDE](https://github.com/AloisSeckar/nuxt-neon/tree/9a7d9745f28178708c2fa7222b76ad6573842d22).

Volání `globalSetup` a dokonce i `setupFiles` jsem z `vitest.config.ts` zcela odstranil. Teď mi stačí pěkný, malý a kompaktní soubor `e2e.test.ts`:

```ts
import { fileURLToPath } from 'node:url'
import { setup } from '@nuxt/test-utils/e2e'

// only setup nuxt-test-app ONCE
await setup({
  rootDir: fileURLToPath(new URL('../neon-test-app', 
    import.meta.url)),
  // Playwright browser is not required for now
  browser: false,
})

// import and run E2E test suites AFTER the test app is ready
await import('../neon-test-suites/01-basic')
await import('../neon-test-suites/02-select')
await import('../neon-test-suites/03-insert')
await import('../neon-test-suites/04-update')
await import('../neon-test-suites/05-delete')
```

Připraví Nuxt testovací aplikaci přes dedikovanou funkci `setup` a pak už jen postupně vyčkává na import a spuštění jednoho souboru s definicemi testů za druhým.

**A to je celé.** Žádné hacky, žádný binec v konzoli. Funguje to jako po másle a pořád je to rychlé. Za méně než 20 sekund mám hotovo. A výstup testů v konzoli zůstane.

## Až do nekonečna a ještě dál

Teď už víte, jak jsem zápasil s Vitestem v Nuxtu — a vyhrál. Pokud chcete víc detailů o finální implementaci nebo máte námitky či nápady na vylepšení, napište mi.

Zároveň jste viděli, jak snadno nás AI nástroje dokážou svést na scestí. Na jejich obranu: v tomhle případě se Copilot i ChatGPT chovali dost podobně jako běžný vývojář, který v zoufalství metá řešení, která „by měla fungovat“, aniž by chápal celkový obraz. Tam, kde selhali a kde jsem nakonec uspěl já, byla schopnost udělat krok zpět a znovu promyslet celou situaci. Myslím, že tohle je pořád rozdíl mezi lidskými vývojáři a umělou pseudo-inteligencí.

A na závěr: nebylo cílem napsat anti-AI obžalobu. Na denní bázi mi pomáhá a fakt mě baví posouvat se s pomocí těchto nástrojů dál. Jen si myslím, že pořád existují limity, o kterých bychom měli vědět. Byla to pro mě další dobrá lekce a doufám, že i pro vás to bylo aspoň trochu zajímavé.
