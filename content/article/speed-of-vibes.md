---
file: 'speed-of-vibes'
cat: 'misc'
title: 'Speed of Vibes'
dscr: 'Důkaz, že nápady z koupelny lze dnes proměnit ve výsledek během několika minut'
tags: ['produktivita', 'Nuxt', 'AI', 'Copilot']
date: '2026-02-14'
created: '14.02.2026'
english: 'https://dev.to/aloisseckar/speed-of-vibes-we-can-turn-bathroom-ideas-into-features-within-minutes-now-3dko'
---

Před měsícem jsem [napsal](/article/refactoring-with-copilot), že jsem ohledně AI _**racionální pesimista**_. Včerejší spor s kolegou o zbytečnou složitost AI-spoluvytvářemného _Korn shell_ skriptu dodaného naším dalším kolegou mi připomněl, že jsou mezi námi i _**radikální pesimisté**_. Nicméně pokaždé, když se odvážím jít hlouběji do strašidelné divočiny nedokonalých promptů následovaných nedeterministickými a _ne-vždy-správnými_ odpověďmi, vidím pokrok, nové příležitosti a nové způsoby, jak věci dělat lépe.

Dnes mám ke sdílení historku o dalším úspěchu.

Začalo to jednoho nedávného večera po pracovním dni. Vrátil jsem se ze svého každodenního zaměstnání programátora a šel si zaběhat, abych kompenzoval hodiny sezení před obrazovkou. Po běhání jsem si dával sprchu a najednou mě napadlo skvělé vylepšení pro můj vedlejší projekt.

Říkal jsem si, že by bylo fajn poskytnout mým budoucím uživatelům pohodlný způsob hlášení chyb. Ale zároveň to udělat pohodlné i pro mě. Byl bych nejšťastnější, kdyby se hlášení rovnou objevovala jako GitHub issues. Ale učit BFU přihlašovat se na GitHub a vytvářet nové issues konzistentním způsobem? Hodně štěstí. Tak co kdybych jim prostě poskytl jednoduchý formulář přímo na svém webu a napojil ho na backendovou službu, která sebere vstup a issue automaticky vytvoří?

Znělo to jako plán. Ale představte si všechnu tu práci, kterou musíte udělat. Sestavit formulář, napsat backendovou službu, zjistit, jak přesně funguje GitHub API, abyste ho mohli zavolat... Prostě si ten nápad pro dnešek jen uložme do vnitřní paměti hluboko vzadu v mozku a určitě se na to někdy podíváme. _Jednou. Ne dnes..._ Můj vnitřní démon prokrastinace zase skoro vyhrál.

Ale časy se poslední dobou změnily. Teď jsem ozbrojený a nebezpečný mými neúnavnými AI společníky. Navzdory všem oprávněným stížnostem na to, že kódovací agenti nedělají svou práci tak dobře, jak byste doufali, a zdaleka ne tak skvěle, jak vám AI-řízené firmy slibují, na začátku roku 2026 vaše oblíbené výmluvy _„Nevím, jak začít"_ nebo _„Tento úkol je příliš velký na to, abych ho začal dnes"_ už neplatí. Vždy můžete prostě něco vykopnout jednoduchým promptem v přirozeném jazyce a uvidíte, jak to půjde. Dokonce i loňská pravda, že prompt musí být dobře navržený (a vy tedy „nemůžete" začít, protože _„Neumím napsat ten správný prompt"_), pomalu bledne.

Než půjdu dál, rád bych učinil menší prohlášení. Opravdu to **neznamená**, že vás povzbuzuji, abyste prostě odpálili první náhodný prompt a vesele nasadili první iteraci rovnou do produkce. [AI Manifesto](https://ai-manifesto.dev/) stále platí a **výsledky byste měli vždy ověřovat**, o vytvořeném kódu přemýšlet a všemu dobře rozumět, než se pohnete dál. Pro mě jako seniora je to jednodušší, ale pokud jste začátečník, je to o to důležitější. Jinak se brzy ztratíte a stanete se rukojmím nemyslícího stroje. Ovšem na druhou stranu byste se neměli ani příliš krotit. AI je tu pro vás. Používejte ho. Těžte z něj. 💪🦾

Než jsem se umyl, navečeřel a chvíli pobavil s rodiči, bylo už poměrně pozdě. Pomalu čas jít do postele. Ale cítil jsem, že to chci přece jen zkusit ještě dnes.

Tady je prompt pro můj (placený) Copilot, který jsem rychle sestavil. Ponechávám jej v originále (angličtina se jako ve všem v IT hodí, protože jí pochopitelně AI rozumí lépe):

```
I want a new feature in this Nuxt 4 project. I need a new client page 
"/report" with a Nuxt UI form entitled "Report problem" that will include 
text field for "gameLink", radio switching between "report false positive" 
and "report false negative", text field for "issue" and text area 
"description" for describing the issue to be reported. All fields will be 
mandatory. The filled form will be send to backend API route where it is 
validated and then a GitHub issue in <<REPO>> repository is created from 
given contents. Issue will be named by "issue" field and contain both 
"gameLink" and "description". Selected radio value will result into 
corresponding label (that will be prepared in the repositry). The report 
form is annonymous, there will be dedicated service account with access 
token to create the issues configurable via Nuxt runtime config (server-
side, so NOT public).
```

Jen tohle. Žádný context engineering, žádné MCP servery, žádné skills ani cokoliv jiného. Jen můj kód, internetové připojení a hrubý popis úkolu v přirozeném jazyce s pár instrukcemi a omezeními. Včetně překlepů a gramatických chyb.

Možná jedna věc: Pokud jste AI-nadšenec, mohli jste si všimnout, že nedávno vyšel nový model [Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6). Já si toho všiml a rozhodl jsem se, že to je perfektní příležitost otestovat ho v akci. A nebyl jsem zklamaný.

Strávil jsem dvě, možná tři minuty psaním promptu výše (přičemž jsem ho měl už víceméně hotový v hlavě). Copilot s Claudem potřeboval **asi 4 minuty** na doručení výsledku. Překvapivé bylo - ten kód byl téměř dokonalý!

Snažil jsem se, ale nedokázal jsem najít žádné zásadní chyby. Vytvořil dobře vypadající frontendový formulář, přidal validaci schématu knihovnou `Zod`, vytvořil backendový endpoint, zpracoval a zvalidoval příchozí data, sestavil volání GitHub API a propojil odpověď zpět do klienta. Dokonce si všiml, že v mém demo projektu ještě neexistuje `<NuxtPage />`, a provedl odpovídající úpravy pro podporu nové stránky `/report` vedle existujícího (implicitního) `/index`. Jo, možná později provedu nějaký ten refaktoring a zkrášlení kódu, protože se mi zpětně zdá, že by mohl být kompaktnější a méně ukecaný. Ale celkově to nebylo _nějak slepované dohromady, až to náhodou nezačalo fungovat_. Byla to solidní práce. Nemyslím si, že bych první iteraci udělal o moc líp.

Moje vítězství nebylo tak bezchybné, protože pak jsem strávil přinejmenším dalších 30 minut konfigurováním nového servisního GitHub účtu a získáváním správného přístupového tokenu (opět s podporou AI). Ale celkově to zabralo méně než hodinu od prvního stisku klávesy po úspěšně vytvořené testovací issue v mém repozitáři. Wow! 👀

Bylo několik klíčových bodů, které tomu pomohly:

1. Věděl jsem, co a jak chci udělat, a znám [Nuxt](https://nuxt.com/) dostatečně dobře na to, abych požadoval řešení s alespoň základní úrovní zabezpečení (tj. token musí zůstat na straně serveru a nesmí být vystaven jako veřejná konfigurace).
2. Copilot nestavěl od nuly, ale uvnitř již existujícího repozitáře s nakonfigurovaným Nuxt UI a existujícími server routes, ze kterých mohl kopírovat.
3. Lidé z Nuxt ekosystému tvrdě pracují na vytváření AI-friendly řešení, takže je pro agenty mnohem snazší získat relevantní aktuální informace.

Doufal jsem v dobrý výsledek, ale tohle mě i tak opravdu ohromilo. Připomnělo mi to, že úzkým hrdlem jsem už spíš já. Moje váhání, moje neochota a moje neschopnost delegovat úkoly, které by delegovány být mohly, aniž bych tím ztratil kontrolu nad výsledkem. Přestože se stále nebojím o svou vlastní vývojářskou existenci, jak se zdá někteří kolegové programátoři, utvrdil jsem se v tom, že bych práci s AI nástroji měl umět mnohem lépe. A budu se o to dál snažit.

A co vy? Jaké jsou vaše nedávné zkušenosti s AI? Napište mi, pokud budete chtít.
