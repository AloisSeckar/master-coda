---
file: 'github-streak'
cat: 'misc'
title: 'Podváděl jsem na GitHubu a nelituji toho'
dscr: 'Co jsem se naučil nového o Gitu, když jsem potřeboval pokoutně změnit jeho historii'
tags: ['git', 'github', 'AI', 'help']
date: '2026-01-24'
created: '24.01.2026'
english: 'https://dev.to/aloisseckar/i-cheated-to-maintain-github-streak-and-i-dont-regret-it-39ka'
unchecked: true
---

Od září 2022 se aktivně snažím udržovat GitHub streak - každý den alespoň jeden nový příspěvek. A ano, zcela s vámi souhlasím, [je to nesmyslné](https://dev.to/sylwia-lask/your-github-contribution-graph-means-absolutely-nothing-and-heres-why-2kjc). Ale pro mě to smysl má. Chci to dělat a chci to udržet. I když některé dny má příspěvek malou nebo žádnou hodnotu - třeba jen přidání nového článku, který jsem nedávno četl, do [jednoho z mých seznamů novinek](https://master-coda.cz/).

Používal jsem [tento widget](https://github.com/DenverCoder1/github-readme-streak-stats) k zobrazení počtu dní na mém GitHub profilu. Bylo to skvělé, dokud to před časem nepřestalo fungovat. Pravděpodobně nějaké změny v API. Možná se to jednou vrátí. Ale nechtěl jsem čekat. Našel jsem [alternativu](https://github.com/pranesh-2005/github-readme-stats-fast), která funguje zde a teď.

Jenže nefunguje stejným způsobem jako ta předchozí a jako samotný GitHub commit graf. Počítá pouze "skutečné" commity, nerozpoznává code review.

A to poukázalo na chybu v mém milovaném streaku. Jednoho dne, 1. června 2024, jsem nějak zapomněl skutečně něco commitnout. "Pouze" jsem udělal dvě review pro své Dependabot aktualizace. Nevšiml jsem si toho, protože když jsem otevřel GitHub stránku, ten den byl zelený. Ale můj streak náhle klesl o více než polovinu 🥹

Mohl jsem to jen nechat být a přijmout hořkost. Ale nechtěl jsem. Druhý den jsem udělal čtyři commity! Co kdybych jen virtuálně cestoval zpět v čase a změnil jeden z nich, abych vyplnil tu mezeru? 💡

A tak jsem to udělal. A časová osa byla opravena. A můžu si užívat svůj 1236 a rostoucí streak. Konec příběhu.

Ale tohle nemělo být jen přiznání. A nežádám o vykoupení. Titulek říká, že toho nelituji. Tady jsem chtěl vysvětlit proč ne.

Protože díky tomuto "podvádění" jsem se naučil znát Git lépe než předtím.

Git je jedna z těch věcí, které můžete osvojit za pár minut a pak strávit celý život snahou je opravdu pochopit. Mimochodem trvalo [jen 10 dní](https://www.zdnet.com/article/linus-torvalds-built-git-in-10-days-and-never-imagined-it-would-last-20-years/) vytvořit tuto páteř moderního vývoje. Příběhy jako tento mi stále připomínají, jak průměrný vlastně jsem.

Abych mohl změnit rok a půl starou Git historii svého projektu, potřeboval jsem pochopit, jak pracovat s příkazem `git rebase`. Jak najít správný commit a jak ho změnit pomocí _interaktivního_ režimu. Největší Aha! moment bylo uvědomění, že jakmile to uděláte, efektivně **vymažete současnou historii** počínaje změněným commitem a dostanete novou. Změny a zprávy zůstanou stejné (kromě toho, co bylo změněno), ale **všechny commity se stanou novými s novými hashy**. Používal jsem `git rebase` i předtím, ale jen k opravě velmi nedávných problémů. Takže jsem tuto skutečnost úspěšně přehlédl. Teď jsem chytřejší.

Další 🤯 věc, kterou jsem se naučil, je, že při používání GitHubu existují dvě data commitu - původní `Author Date` (značící okamžik, kdy byl commit vytvořen) a `Commit Date` (měnící se, když je commit upraven - nebo rebasován). Naučil jsem se to tvrdě poté, co jsem _force-pushoval_ své změny na GitHub a náhle bylo "uděláno" 150 commitů 17. ledna 2026 😰

Tato nešťastná událost přímo vede k mému třetímu objevu existence příkazu `git filter-branch` a (modernějšího) nástroje `git filter-repo`. Ty mohou být povolány do akce k provádění hromadných aktualizací přes commity. A pomoci napravit přehmaty jako ten můj. Takže žádné obavy, po další _trial-and-error_ session s Copilotem se mi podařilo opravit mou chybnou Git historii a nikdy byste to znovu nepoznali.

A tím končí můj příběh. Pokud jste už všechno výše uvedené věděli, to je pro vás dobře. Trvalo mi to asi 8 let práce s Gitem, než jsem se dostal tak hluboko. Předpokládám, že člověk může jít ještě hlouběji, ale já si na chvíli odpočinu. Pokud máte příběhy ke sdílení nebo otázky k položení, neváhejte je vyjádřit v komentářích níže. A zůstaňte naladěni na další článek _Alois objevuje triviální věci_.

_**Upozornění:** Měli byste být opatrní při manipulaci s vaší Git časovou osou a force-pushování něčeho do repozitáře. Pokud máte změny v jiných větvích nebo dokonce necommitnuté ve vašich lokálních checkoutech, můžete se dostat do potíží. Pokud je tým větší než jen vy, potíže mohou být ještě větší. Mohl jsem si dovolit ignorovat tyto obavy, protože to byl můj soukromý repozitář bez WIP. Ale to není vždy ten případ._
