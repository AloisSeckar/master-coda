---
file: 'github-streak'
cat: 'misc'
title: 'Podváděl jsem na GitHubu a nelituji toho'
dscr: 'Co jsem se naučil nového o Gitu, když jsem potřeboval pokoutně změnit jeho historii'
tags: ['git', 'github', 'AI', 'help']
date: '2026-01-24'
created: '24.01.2026'
edited: '09.03.2026'
english: 'https://dev.to/aloisseckar/i-cheated-to-maintain-github-streak-and-i-dont-regret-it-39ka'
---

Od září 2022 se aktivně snažím udržovat GitHub streak - každý den alespoň jeden nový programátorský příspěvek (commit). A ano, zcela s vámi souhlasím, [je to úplný nesmysl](https://dev.to/sylwia-lask/your-github-contribution-graph-means-absolutely-nothing-and-heres-why-2kjc). Ale pro mě to smysl má. Chci to dělat a chci sérii udržet. I když některé dny má nový příspěvek malou nebo skoro žádnou hodnotu - třeba jen přidání nového článku, který jsem nedávno četl, do [jednoho z mých seznamů novinek](https://master-coda.cz/).

Ke zobrazení počtu po sobě jdoucích dní jsem na mém GitHub profilu  používal [tento widget](https://github.com/DenverCoder1/github-readme-streak-stats). Bylo to skvělé, dokud to před časem nepřestalo fungovat. Pravděpodobně nějaké změny v API, které autor nepromítl. Možná se projekt jednou vrátí, ale já jsem nechtěl čekat. Našel jsem proto [alternativu](https://github.com/pranesh-2005/github-readme-stats-fast), která funguje zde a teď.

Jenže nefunguje stejným způsobem jako ta předchozí a jako samotný GitHub commit graf. Počítá pouze "skutečné" commity, nerozpoznává code review.

A to odhalilo chybu v mém milovaném streaku. Jednoho dne, 1. června 2024, jsem nějak zapomněl něco skutečně commitnout. Ten den jsem udělal "pouze" dvě rychlé review pro své Dependabot aktualizace. Nevšiml jsem si toho, protože když jsem otevřel GitHub stránku, byl ten den zelený. Ale v novém zobrazení se má série rázem zkrátila o více než polovinu 🥹

Mohl jsem to prostě nechat být a kousnout do kyselého jablka reality. Ale nechtěl jsem. Druhý den jsem udělal čtyři commity! Co kdybych jen virtuálně cestoval zpět v čase a změnil jeden z nich, abych tu vyplnil mezeru? 💡

A tak jsem to udělal. A časová osa byla opravena. A můžu si užívat svůj 1236 dní dlouhý a rostoucí streak. Konec příběhu.

Ale tohle nemělo být jen přiznání. A nežádám o vykoupení. Titulek říká, že toho nelituji. Takže jsem chtěl vysvětlit, proč ne.

Protože díky tomuto "podvádění" jsem se naučil znát Git lépe než předtím.

Git je jedna z těch věcí, které si můžete osvojit za pár minut a pak strávit celý život snahou je opravdu pochopit. Mimochodem trvalo [jen 10 dní](https://www.zdnet.com/article/linus-torvalds-built-git-in-10-days-and-never-imagined-it-would-last-20-years/) tuto páteř moderního vývoje vytvořit. Příběhy jako tento mi stále připomínají, jak průměrný programátor vlastně jsem.

Abych mohl změnit rok a půl starou Git historii svého projektu, potřeboval jsem pochopit, jak pracovat s příkazem `git rebase`. Jak najít správný commit a jak ho změnit pomocí _interaktivního_ režimu. Největší Aha! moment bylo uvědomění, že jakmile to uděláte, ve skutečnosti tím **vymažete současnou historii** počínaje změněným commitem a dostanete novou. Změny a zprávy zůstanou stejné (kromě toho, co bylo změněno), ale **všechny commity se stanou novými s novými hashi**. Používal jsem `git rebase` i předtím, ale jen k opravě velmi nedávných problémů. Takže jsem tuto skutečnost úspěšně přehlédl. Teď jsem chytřejší.

Další 🤯 věc, kterou jsem se naučil, je, že při používání GitHubu existují dvě data commitu - původní `Author Date` (značící okamžik, kdy byl commit vytvořen) a `Commit Date` (měnící se, když je commit upraven - nebo rebasován). Naučil jsem se to pádem na virtuální ústa poté, co jsem _force-pushoval_ své změny na GitHub a náhle vzniklo 150 commitů 17. ledna 2026 😰

Tato nešťastná událost přímo vedla k mému třetímu objevu existence příkazu `git filter-branch` a (modernějšího) nástroje `git filter-repo`. Ty mohou být povolány do akce k provádění hromadných aktualizací nad commity. A pomoci napravit přehmaty jako ten můj. Takže žádné obavy, po další _trial-and-error_ session s Copilotem se mi podařilo mou chybnou Git historii opravit a nikdy byste to znovu nepoznali.

A tím už můj příběh končí. Pokud jste už všechno výše uvedené věděli, dobře pro vás. Mě to trvalo asi 8 let práce s Gitem, než jsem se dostal tak hluboko. Předpokládám, že člověk může jít ještě hlouběji, ale já si raději zase na chvíli odpočinu. Pokud máte svá vlastní přiznání nebo doplňující otázky k položení, ozvěte se. A těšte se na další článek z cyklu _Alois objevuje triviální věci_.

_**Upozornění:** Při manipulaci s vaší Git časovou osou a force-pushování něčeho do repozitáře byste měli být velmi opatrní. Pokud máte změny v jiných větvích nebo dokonce necommitnuté ve vašich lokálních checkoutech, můžete se rychle dostat do potíží. A pokud máte tým větší než jen vy samotní, potíže mohou být ještě větší. Já jsem si mohl dovolit tyto obavy ignorovat, protože to byl můj soukromý repozitář bez rozdělané práce. Ale vždy to není ten případ..._
