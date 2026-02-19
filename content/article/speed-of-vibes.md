---
file: 'speed-of-vibes'
cat: 'misc'
title: 'Speed of Vibes'
dscr: 'Důkaz, že nápady z koupelny lze dnes proměnit ve výsledek během několika minut'
tags: ['produktivita', 'Nuxt', 'AI', 'Copilot']
date: '2026-02-14'
created: '14.02.2026'
english: 'https://dev.to/aloisseckar/speed-of-vibes-we-can-turn-bathroom-ideas-into-features-within-minutes-now-3dko'
unchecked: true
---

Před měsícem jsem [napsal](https://dev.to/aloisseckar/ai-the-way-out-of-doubt-2fbg), že jsem ohledně AI _**racionální pesimista**_. Včerejší spor s kolegou o zbytečnou složitost AI-naplněného _Korn shell_ skriptu dodaného naším dalším kolegou mi připomněl, že jsou mezi námi i _**radikální pesimisté**_. Nicméně pokaždé, když se odvážím jít dál do nejisté divočiny nedokonalých promptů následovaných nedeterministickými a _ne-vždy-správnými_ odpověďmi, vidím pokrok, nové příležitosti a nové způsoby, jak dělat věci lépe.

Dnes mám další úspěšný příběh ke sdílení.

Začalo to jednoho večera po pracovním dni nedávno. Vrátil jsem se ze svého každodenního vývojářského zaměstnání a šel běhat, abych kompenzoval hodiny sezení před obrazovkou. Po běhání jsem byl ve sprše a najednou mě napadl skvělý nápad pro můj vedlejší projekt.

Říkal jsem si, že by bylo fajn poskytnout mým budoucím uživatelům pohodlný způsob hlášení chyb. Ale zároveň to udělat pohodlné i pro mě. Byl bych nejšťastnější, kdyby se hlášení objevovala jako GitHub issues. Ale učit BFU přihlašovat se na GitHub a vytvářet nové issues konzistentním způsobem? Hodně štěstí. Co kdybych prostě poskytl jednoduchý formulář na svém webu a napojil ho na backendovou službu, která sebere vstup a automaticky vytvoří issue?

Znělo to jako plán. Ale představte si všechnu tu práci, kterou musíte udělat. Sestavit formulář, napsat backendovou službu, zjistit, jak přesně funguje GitHub API, abyste ho mohli zavolat... Prostě si ten nápad uložme do vnitřní paměti hluboko vzadu v mozku a určitě se na to podíváme. _Jednou. Ne dnes..._ Můj vnitřní démon prokrastinace skoro zase vyhrál.

Ale v poslední době se časy změnily. Teď jsem ozbrojený a nebezpečný s neúnavnými AI společníky. Navzdory všem oprávněným stížnostem na to, že kódovací agenti nedělají svou práci tak dobře, jak byste doufali, a zdaleka ne tak skvěle, jak vám AI-řízené firmy slibují, na začátku roku 2026 vaše oblíbené výmluvy _„Nevím, jak začít"_ nebo _„Tento úkol je příliš velký na to, abych ho dnes začal"_ už neplatí. Vždy můžete prostě začít jednoduchým promptem v přirozeném jazyce a uvidíte, jak to půjde. Dokonce i loňská pravda, že prompt musí být dobře navržený (a tedy „nemůžete" začít, protože _„Neumím napsat správný prompt"_), pomalu bledne.

Než půjdu dál, rád bych učinil prohlášení. To **neznamená**, že vás povzbuzuji, abyste prostě odpálili nejednoznačný prompt a YOLO-nasadili první iteraci rovnou do produkce. [AI Manifesto](https://ai-manifesto.dev/) stále platí a **měli byste vždy ověřovat výsledky**, přemýšlet o kódu a všemu rozumět, než se pohnete dál. Pro mě jako seniora je to jednodušší, ale pokud jste začátečník, je to o to důležitější, než se ztratíte a stanete se rukojmím strojové mysli. Na druhou stranu byste se neměli příliš brzdit. AI je tu pro vás. Používejte ho. Těžte z něj. 💪🦾

Než jsem se dokoupal, navečeřel a pobavil s rodinou, bylo už poměrně pozdě. Ale cítil jsem se šťastně a chtěl to zkusit.

Tady je prompt pro můj (placený) Copilot, který jsem rychle sestavil:

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

Jen tohle. Žádný context engineering, žádné MCP servery, žádné skills ani cokoliv jiného. Jen můj codebase, internetové připojení a hrubý popis úkolu v přirozeném jazyce s pár instrukcemi a omezeními. Včetně překlepů a gramatických chyb.

Možná jedna věc. Pokud jste AI-nadšenec, mohli jste si všimnout, že nedávno vyšel nový model [Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6). Já si toho všiml a rozhodl jsem se, že to je perfektní příležitost otestovat ho v akci. A nebyl jsem zklamaný.

Strávil jsem dvě, možná tři minuty psaním promptu (zatímco jsem ho měl víceméně hotový v hlavě). Copilot s Claudem potřeboval asi 4 minuty na doručení výsledku. Překvapivé bylo – kód byl téměř dokonalý!

Snažil jsem se, ale nedokázal jsem najít žádné zásadní chyby. Vytvořil slušný frontendový formulář, přidal Zod validaci schématu, vytvořil backendový endpoint, zpracoval a zvalidoval příchozí data, sestavil volání GitHub API a propojil odpověď zpět do klienta. Dokonce si všiml, že ještě neexistuje `<NuxtPage />`, a provedl odpovídající úpravy pro podporu nové stránky `/report` vedle existujícího (implicitního) `/index`. Jo, možná později provedu nějaký refaktoring a leštění, protože zpětně se mi zdá, že kód by mohl být kompaktnější a méně ukecaný. Ale celkově to nebylo _slepené dohromady nějak, dokud to náhodou nezačalo fungovat_. Byla to slušná práce. Nemyslím si, že bych pro první iteraci udělal o moc víc.

Moje vítězství nebylo tak bezchybné, protože pak jsem strávil přinejmenším dalších 30 minut konfigurováním nového GitHub servisního účtu a získáváním správného přístupového tokenu (opět s podporou AI). Ale celkově to bylo méně než hodinu od prvního stisku klávesy po testovací issue úspěšně vytvořené v mém repozitáři. Wow! :eyes:

Bylo několik bodů úspěchu, které pomohly:

1. Věděl jsem, co a jak chci udělat, a znám [Nuxt](https://nuxt.com/) dostatečně dobře na to, abych požadoval obecnou architekturu alespoň se základní úrovní zabezpečení (tj. token musí zůstat na straně serveru a nesmí být vystaven jako veřejná konfigurace).
2. Copilot nestavěl od nuly, ale uvnitř již existujícího repozitáře s nakonfigurovaným Nuxt UI a existujícími server routes, ze kterých mohl kopírovat.
3. Lidé z ekosystému Nuxt tvrdě pracují na vytváření AI-přátelských řešení, takže je pro agenty mnohem snazší získat relevantní aktuální informace.

Doufal jsem v dobrý výsledek, ale tohle mě opravdu ohromilo. Připomnělo mi to, že úzkým hrdlem jsem už já. Moje váhání, moje neochota a moje neschopnost delegovat úkoly, které by měly být delegovány, aniž bych ztratil kontrolu. Přestože se stále nebojím o svou samotnou existenci, jak se zdá někteří kolegové vývojáři, utvrdil jsem se v tom, že bych to měl umět mnohem lépe. A budu se o to dál snažit.

A co vy? Jaké jsou vaše nedávné zkušenosti s AI? Neváhejte sdílet své příběhy, otázky, námitky a obavy v komentářích níže 👇