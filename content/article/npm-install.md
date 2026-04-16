---
file: 'npm-install'
cat: 'web'
title: 'Co jsem si to právě nainstaloval?'
dscr: 'Jak fungují supply chain útoky v NPM ekosystému a jak se jim bránit'
tags: ['web', 'security', 'hacker', 'npm', 'pnpm', 'javascript', 'nodejs']
date: '2026-04-08'
created: '08.04.2026'
english: 'https://dev.to/aloisseckar/dafuq-did-i-just-installed-3bch'
unchecked: true
---

Během nedávného [útoku na dodavatelský řetězec Axios](https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html) jsem náhodou sledoval několik vývojářů, kteří zjišťovali, zda by se měli o své projekty obávat. Všiml jsem si jedné zajímavé věci - úroveň porozumění tomu, co se vlastně děje, jaká je podstata tohoto typu exploitu a jak se spolehlivě chránit před budoucími, je nižší, než by měla být. Proto jsem se rozhodl dát dohromady několik odstavců, které by měly pomoci.

Rozhodně nejsem guru na bezpečnost Node.js, přesto věřím, že jsem se na své vývojářské cestě pár věcí naučil. Pokud trváte na setkání se skutečným odborníkem, dovolte mi představit vám [Lirana Tala](https://lirantal.com/) a zejména jeho repo [Awesome npm Security Best Practices](https://github.com/lirantal/npm-security-best-practices) s obrovským seznamem toho, co dělat a nedělat při práci s NPM balíčky. Pro méně akademickou verzi můžete pokračovat v mém článku.

## Co se stalo?

Tento typ kyberútoku nastává, když hackeři získají přístupové údaje, které jim umožní publikovat škodlivé verze existujících a legitimních balíčků. V tomto případě byl k jejich krádeži přímo od jednoho z vývojářů použit [sofistikovaný sociální inženýring](https://thehackernews.com/2026/04/unc1069-social-engineering-of-axios.html). Běžnějšími způsoby jsou náhodný únik (vibecodeři, víte, co váš AI asistent pro kódování commituje do veřejného Git repozitáře?) nebo exfiltrace dat prostřednictvím předchozích virových infekcí.

Obvykle netrvá dlouho, než je malware objeven automatickými kontrolami, správci jsou upozorněni a infikované balíčky jsou staženy z NPM. Ale během tohoto časového okna může být napáchána škoda.

Škodlivý kód se typicky skrývá v takzvaném _postinstall skriptu_. Jedná se o kód, který je automaticky spuštěn po instalaci balíčku. I když existuje mnoho legitimních případů použití, může se stát také otevřenými dveřmi do vašeho systému. A hackeři to vědí (zatímco mnozí JS vývojáři ne).

## Proč se to děje?

Přestože je poměrně snadné zneužít výchozí chování `npm`, není tak těžké vybudovat dobrou obranu, která zabrání většině běžných vektorů útoku.

Nejprve tedy vysvětlím, proč se to může stát, a pak vás vyzbrojím solidními způsoby, jak se tomuto útoku bránit.

### Rozlišování NPM balíčků

Jeden z prvních příkazů, které při práci s JavaScriptem použijete, je `npm install`. Pravděpodobně víte, že _stahuje závislosti uvedené ve vašem souboru `package.json` do lokálního adresáře `node_modules`_. Celý proces je ale složitější.

Při prvním spuštění pročte `package.json` a vyřeší uvedené balíčky spolu s jejich verzemi. Verze může být specifikována jako přesná, ale můžete vidět i verze se stříškou (`^`) nebo vlnovkou (`~`). Ty umožňují `npm` použít _nejnovější dostupnou verzi_ v daném rozsahu.

### Přesné vs. volné verze

Předpokládám, že jste obeznámeni se [sémantickým verzováním](https://docs.npmjs.com/about-semantic-versioning), nebo si teď dáte pauzu a zjistíte to. Důležitý závěr je: **Je prakticky nemožné předpovědět přesný výsledek čerstvého `npm install`.**

Tedy ano, můžete _připnout_ všechny **své** (přímé) závislosti, ale:

1. V budoucnu budete mít těžší udržování bezpečnostních aktualizací
2. První externí knihovna, kterou si přitáhnete, bude pravděpodobně obsahovat nějaké volné závislosti a vy nebudete schopni kontrolovat všechny (pokud nepoužijete [overrides](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) pro každou jednu - a nedostanete #1 na druhou)

Původně jsem si myslel, že připnout vše by měl být můj cíl, nyní jsem o tom mnohem méně přesvědčen. Zejména pokud vyvíjíte knihovnu, nechcete své budoucí uživatele činit závislými na vás. Protože pokud striktně připnete své závislosti, pokaždé když je odhalena zranitelnost (což je tak párkrát denně), museli byste aktualizovat `package.json` a vydat novou patch verzi své knihovny. S volnými závislostmi budou nástroje jako `npm audit --fix` schopny aktualizovat požadovanou verzi přímo v lockfile spotřebitele. Nejen, že je to pohodlnější, ale je to i rychlejší, protože předpokládám, že nejste vždy online, abyste mohli posloužit.

### Automatizovaná zranitelnost

Ale to má svou cenu. Pokud v době běhu instalačního procesu existuje škodlivá verze balíčku a je v povoleném rozsahu, bude stažena, nainstalována, a pokud obsahuje extra skripty, budou spuštěny.

S čistým `npm install` je těžké, ne-li nemožné něco rozumně dělat. Proces je deterministický, ale jeho rozsah je téměř vždy příliš velký, protože reálné projekty obsahují mnoho závislostí, které samy závisí na něčem dalším. Vzali byste si čas a kontrolovali vše? Přiznejte si to - prostě věříte systému.

A nedávné události (nebo [útok Shai-Hulud](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) z loňského roku) nám ukázaly, že slepá důvěra může být nebezpečná.

## Co s tím?

Někdo by řekl, že instalační proces JavaScriptu je ze své podstaty nebezpečný a raději byste měli utéct. Ale než to uděláte, zde jsou tři věci, které můžete snadno udělat pro zmírnění většiny rizik.

### Zakažte postinstall skripty ve výchozím nastavení

Na školeních o kybernetické bezpečnosti vás učí neklikat na podezřelé odkazy. Přesto `npm` radostně spouští jakýkoli _podezřelý_ skript, který dostane. Pokud mu neřeknete, aby to nedělal.

Příkaz je jednoduchý. Stačí použít `npm install --ignore-scripts` místo prostého install. Rázem nebudou spuštěny žádné skripty třetích stran.

Je to však dvousečná zbraň, protože mohou existovat legitimní balíčky, které se spoléhají na automatický _postinstall_ skript, a skončíte v rozbitém stavu, pokud nepodniknete další manuální akce (jako `npm rebuild <package>`).

Nebo můžete tento problém vyřešit mnohem elegantnějším způsobem přechodem na [`pnpm`](https://pnpm.io/) (což byste rozhodně měli udělat i z řady dalších důvodů). Když `pnpm` spustí příkaz `install`, ve výchozím nastavení nikdy nepovolí žádné skripty a pouze whitelistuje ty, které povolíte přes [`pnpm approve-builds`](https://pnpm.io/cli/approve-builds) ručně nebo specifikujete přes nastavení [`onlyBuiltDependencies`](https://pnpm.io/settings#onlybuiltdependencies).

Ať tak či onak, rozhodně byste měli omezit, co se spouští, a nevydávat se na milost tvůrcům balíčků třetích stran.

### Commitujte své lockfile

Vzpomínám si na rozhovor s jedním z mých bývalých kolegů: _"Ale ty necommituješ `package-lock.json` do Git repozitáře. Je velký, pořád se mění a lidé neustále vytvářejí konflikty tím, že (náhodně) mění tento soubor."_ Já jsem byl tehdy učen jinak a trval jsem na svém: _"Můj projekt bude mít lockfile commitnutý."_ Po pár letech jsem si nyní celkem jistý, že jsem měl pravdu.

Takzvaný _"lockfile"_ se vytváří, když správce balíčků poprvé spustí `install`, a aktualizuje se, když:

1. se od poslední instalace změnila nějaká (přímá) závislost v `package.json` (nejběžnější a očekávaný způsob)
2. spustíte `npm install <package>` nebo `npm uninstall <package>` (v podstatě totéž jako #1)
3. spustíte `npm update` (přeřeší volné stříškové/vlnkové závislosti) nebo `npm audit --fix` (automaticky opraví známé zranitelné balíčky, pokud to předepsané rozsahy verzí dovolí)
4. verze správce balíčků je jiná (nechtěný zdroj zmatků a konfliktů v dev týmech)

Jinak skončíte se zaručeným "soupisem materiálů", který se mezi buildy nemění. Nejen, že to pomáhá redukovat nechvalně známé bugy _"na mém stroji to funguje"_, ale také to zcela zabraňuje náhlým změnám v dodavatelském řetězci.

Pokud lockfile nezahrnete do svého repozitáře, pokaždé když je repo staženo (ručně nebo uvnitř automatizované pipeline), spustí se nový čerstvý `npm install` a aktuální závislosti se přeřeší. Výsledný build bude téměř vždy jiný než předchozí.

Pro ještě větší bezpečnost (zejména v pipeline) můžete přejít z `npm install` na `npm ci` (aka "continuous integration") - příkaz, který funguje v podstatě stejně, ale plně respektuje existující lockfile a nikdy se ho nesnaží měnit.

### Instalujte s prodlevou

Výše uvedené je fajn, ale pokud budete mít smůlu, vytvoříte/aktualizujete lockfile přesně během probíhající krize dodavatelského řetězce.

Naštěstí jsou takové útoky obvykle krátkodobé. V nejnovějším případu Axios trvalo jen [asi 6 minut](https://snyk.io/blog/axios-npm-package-compromised-supply-chain-attack-delivers-cross-platform/#timeline), než byla kompromitovaná verze balíčku objevena, a celkem 3 a půl hodiny, než byla stažena. Je velmi nepravděpodobné, že by nějaký škodlivý balíček přežil déle než řekněme týden. Pokud dokážeme stanovit pravidlo, že každá verze balíčku, kterou instalujeme, musí být alespoň týden stará, snadno předejdeme 99,9 % takových incidentů.

Dobrá zpráva pro všechny! S `npm` je to možné. Jsou tu však ale.

Pokud jste již aktualizovali na nejnovější `v11`, dostali jste dárek v podobě příznaku [`minimum-release-age`](https://docs.npmjs.com/cli/v11/using-npm/config#min-release-age). Ten vám umožňuje specifikovat minimální počet dní, které musely uplynout mezi datem vydání balíčku a dneškem. Novější verze budou odmítnuty (tiše, pokud existuje starší záložní verze povolená omezeními verzí, a s chybou, pokud je požadována nějaká přesná verze).

Verze `v10` a starší se musely spoléhat na o něco méně ideální [`before`](https://docs.npmjs.com/cli/v10/using-npm/config#before), kde se předává datový řetězec `YYYY-MM-DD`. To může být komplikované pro klouzavá data a museli jste použít trochu [skriptovací magie](https://github.com/lirantal/npm-security-best-practices?tab=readme-ov-file#2-install-with-cooldown), abyste toho dosáhli.

Opět, toto vás ochrání před nově publikovaným malwarem, ale také vás to odřízne od žádoucích aktualizací (jako jsou urgentní bezpečnostní záplaty).

A opět nemohu než doporučit přejít na `pnpm`, protože přirozeně kombinuje [`minimumReleaseAge`](https://pnpm.io/settings#minimumreleaseage) s [`minimumReleaseAgeExclude`](https://pnpm.io/settings#minimumreleaseageexclude) přesně pro řešení tohoto problému.

## Shrnutí

Neslibuji, že dodržování výše uvedených rad vás vždy udrží v bezpečí. Téma bezpečnosti Node.js je komplexní a hackeři jsou kreativní. Ale mnoho exploitů se děje jen proto, že někdo byl nevědomý/líný/ukvapený a nechal prostý `npm install` bez alespoň minimální opatrnosti.

Ano. Pokud je to pro vás nové, může vám to připadat matoucí a zahlcující. Fungující pipeline se najednou rozbila. Dychtivě jste zkusili použít `pnpm`, ale kontejnerový image, který používáte pro buildy, ho nezná (`RUN npm install -g pnpm` na záchranu). Zavedli jste prodlevy a instalační log explodoval chybami. Zakázali jste post-install skripty a teď se vaše aplikace nespustí. Ale všechny tyto problémy se dají vyřešit a odměnou vám bude lepší spánek s vědomím, že nemusíte panikařit pokaždé, když je ohlášen nový kyberútok.

Pokud máte dotazy a připomínky, neváhejte se podělit o své myšlenky v sekci komentářů níže. Možná víte něco, co já ne, a já budu více než rád, když se to dozvím 👀