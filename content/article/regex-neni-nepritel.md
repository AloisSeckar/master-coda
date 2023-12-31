Jedním z vděčných námětů IT vtipů jsou regulární výrazy coby „magie“, kterou nikdo nedokáže pochopit. Souhlasím, že řada vývojářů tyhle _„divné shluky znaků“_ nemá v lásce, a pokud mohou, tak se jim vyhýbají. Přitom je to škoda, protože jsou velmi užitečné.

Můj dnešní use-case je ryze praktický – tvořím novou verzi svého webu a lehce jsem přitom pozměnil datový model. Ze staré verze je nyní potřeba přemigrovat desítky historických záznamů.

Data (novinky na webu) jsou k dispozici ve formě SQL exportu, kde záznamy vypadají např. takto:

```sql
INSERT INTO "main"."web_news" ("date_created", "content", "author_id", "news_id") VALUES ('2012-11-29', 'Přesun na nový hosting firmy WEDOS Internet, a.s.', '1', '1');
```

Tabulka nového webu má navíc sloupec `date_edited`, tedy je třeba tuto hodnotu přidat, a do sloupce `news_id`, který je primárním klíčem s auto-generovanou hodnotou se v PostgreSQL nesmí ručně vkládat, tedy je třeba tuto hodnotu naopak vynechat.

Jistě by to šlo projít a příslušné úpravy provést ručně. U „desítek“ záznamů se to ještě snese. Pokud člověk honem neví, kudy do toho, tak je přímá manipulace pravděpodobně nejrychlejší. Skutečně není dobré trávit hodinu automatizací něčeho, co lze přímočaře zvládnout za pár minut. Ale ještě lepší je vědět, jak si to skutečně ulehčit.

Jiná varianta je zavolat na zdrojové databázi upravené SQL a vytáhnout si data v lepší podobě. Problém chybějícího sloupce jde např. vyřešit jednoduše takto: `SELECT date_created, date_created AS date_edited FROM web_news`{lang="sql"} – prostě data vybereme dvakrát, jednou pod jiným aliasem. Ale dejme tomu, že k databázi nemáme přístup a máme jen už hotový SQL dump.

Takže už nezbývá než zapojit regulární výrazy. Chce to nějaký textový editor, který pomocí nich umí „Hledat“ a „Nahradit“ – například [Notepad++](https://notepad-plus-plus.org/) (pro Windows people jako jsem já - zkratka `Ctrl+H`).

<div>
<article-image src="regex-neni-nepritel/notepad-search.jpg" alt="Funkce 'Nahradit' v Notepad++" />
</div>

Jednodušší úprava je odmazat `news_id` na konci každého INSERTu. Regulární výrazy pracují tak, že prostřednictvím kombinace skutečných znaků a speciálních metaznaků hledají nad zdrojovým textem shodu (**match** – odtud nečeské, ale v tomto kontextu odpovídající slovo _„matchnout“_). Alfou a omegou je sestavit kombinaci správně. Pojďme na to.

**Hledaný výraz bude:** `, '\d+'\)`

Začátek řetězce je jednoduchý – čárka, mezera, apostrof – to nejsou žádné speciální znaky, ty v textu vyhledají přesně to, co je psáno. Teoreticky bychom mohli mezeru nahradit za regulární výraz `\s` (metaznak pro „bílý znak“), ale to má spíš význam, když si člověk není předem jistý, jestli tam bude mezera nebo třeba tabulátor. Následuje metaznak `\d` – ten říká, aby se hledalo číslo, tj. znaky z rozsahu `0-9`. Kdybychom chtěli, můžeme použít i zápis `[0-9]` (do hranatých závorek se uzavírá skupina možných znaků), ale `\d` je kratší a pohodlnější. Metaznak `+` říká, že předchozí (číslo) se má najít alespoň jednou, ale klidně i vícekrát (_„1-n-krát“_). Tím vyřešíme dvou a víceciferné hodnoty `news_id`. Regex je z principu „žravý“, takže se při vyhodnocování nabere všechno, co jde, až do následujícího znaku z výrazu, což je ukončovací apostrof. Nakonec, abychom si byli jisti, že bereme číslo, které je na konci, a ne to předchozí (`author_id`), potřebujeme ještě _matchnout_ uzavírací kulatou závorku. Protože ale kulaté závorky jsou metaznaky (význam uvidíme vzápětí u druhé transformace), je třeba použít zpětné lomítko pro její „escapování“.

Kdo nevěří, ať si to nejprve zkusí pouze v režimu vyhledávání (`Ctrl+F`). Což mimochodem nikdy není od věci. Napřed si vyzkoušejte, co zadaný regulární výraz skutečně nachází, než ho pustíte natvrdo na celý zdrojový text.

**Necháme nahradit za:** `\)`

Toto už je snadné – kus textu, který jsme nalezli, a který obsahuje `news_id`, prostě necháme nahradit znakem ukončující kulaté závorky (opět nuceně escapované zpětným lomítkem).

Pak už stačí jen potvrdit příkaz „Nahradit“ a během okamžiku je hotovo, co bychom jinak dělali ručně několik minut.

Výsledkem je:
```sql
… VALUES ('2012-11-29', 'Přesun na nový hosting firmy WEDOS Internet, a.s.', '1');
```

Pojďme teď na druhou úpravu – přidání nového sloupce `date_edited`.

Dává logický smysl, aby ve výchozím stavu bylo datum editace stejné, jako datum původního založení. Pokud na záznam časem někdo sáhne a změní ho, pak se samozřejmě datum editace změní, ale to se s velkou pravděpodobností ani nikdy nestane. Jak tedy vzít hodnotu `date_created` a nakopírovat ji?

K tomu pomůže funkcionalita kulatých závorek v regulárních výrazech, které slouží k čemusi, co se dá připodobnit k vytváření proměnných. _Matchnutý_ kus skutečného textu, který je obalen do kulatých závorek, se uloží stranou, a jde ho použít v následujícím kroku nahrazení, kde se na něj odkáže pomocí zpětného lomítka a čísla, přičemž číslo odpovídá pořadí dvojice závorek (může jich být v jednom výrazu více). Toto je skutečná síla dřímající v regulárních výrazech, protože s ní můžete nejen data duplikovat, jako to za chvíli uděláme my, ale i různě přesouvat, což jsem už mnohokrát využil namísto ubíjejícího a na chyby náchylného ručního `Ctrl+X` a `Ctrl-V`.

**Hledaný výraz bude:** `\('(\d{4}-\d{2}-\d{2})',`

Toto už je pořádná „obluda“, ale pojďme si ji rozebrat, aby přestala být tak děsivá. Na začátku máme escapovanou úvodní kulatou závorku – to abychom se správně zacílili v rámci řádku. Následuje apostrof, který otevírá hodnotu. Za ním je kulatá závorka, ovšem všimněte si, že tentokrát bez zpětného lomítka. To znamená, že plní svou funkci metaznaku a otevírá sekvenci, kterou si regex parser zaznamená. Pak následuje už známý znak `\d` a zatím nepředstavená konstrukce `{4}` – složené závorky udávají konkrétní počet opakovaní. Zde je jediná hodnota 4, tedy chceme číslo _"„4x za sebou“_ (= rok). Je možný i zápis `{m,n}`, což potom znamená rozsah _„m-krát až n-krát“_. To naštěstí nepotřebujeme, naše datum má pevný formát. Následuje spojovník, který není metaznakem a tedy jde o doslovnou hodnotu. Další části výrazu matchují měsíce a dny v datumu. Když máme celou část, můžeme uzavřít kulatou závorku. Tím bychom možná mohli končit, ale pro jistotu ještě ukončovací apostrof a čárka, abychom se vyhnuli (nepravděpodobné, ale možné) situaci, že datum bude náhodně uvedeno i někde v datech `content`, což je volný text, o kterém nelze nic pevně předpokládat. Obecně doporučuji při konstrukci regulárních výrazů brát na svá zdrojová data zřetel a snažit se minimalizovat možnost „falešně pozitivních“ shod, protože ty pak mohou pěkně zavařit a pozitivní efekt regex transformace vynulovat.

**Necháme nahradit za:** `\('\1', '\1',`

Zde je klíčová sekvence `\1` – to je totiž odkaz na _matchnutý výraz_ ve formátu `DDDD-YY-MM`, který vytvořil regex pro vyhledávání. Tímto ho zopakujeme 2x za sebou, ostatní znaky jsou už jenom pro doplnění správné SQL struktury (kulatá závorka musí být zase escapovaná, aby se vložila doslovně, bez toho by ji parser prostě vyignoroval).

Ani jsme nemrkli a už máme, co jsme potřebovali:
```sql
… VALUES ('2012-11-29', '2012-11-29', 'Přesun na nový hosting firmy WEDOS Internet, a.s.', '1');
```

Čím více záznamů je třeba řešit, tím větší výhodou je dát si chvilku práci s konstrukcí regulárního výrazu, který repetitivní práci vyřeší za vás. A skutečně to mohou být hodiny práce.

Účastním se jako zapisovatel mezinárodních turnajů baseballu a softballu. Donedávna bylo před každým turnajem nutno zadat do starší verze systému pro online zápis soupisky hráčů jednotlivých týmů. Program si data zapisoval do textových souborů, takže nebylo nezbytně nutné používat jeho interface a vše skutečně otrocky přepisovat. Akorát zdrojová data o hráčích sice byla v elektronické podobě (strojově čitelné PDF), ale pořadí hodnot neodpovídalo tomu, jak to potřeboval program. To však díky regulárním výrazům nebyl velký problém. Stačilo se jednou rozhodnout, že už to prostě do dvou do rána ručně datlovat nebudu, a podařilo se mi potřebný čas stáhnout z hodin na desítky minut.

Možná namítnete, že v dnešní době stačí zadat problém [ChatGPT](/tag/ChatGPT) nebo jinému nástroji umělé inteligence, ať se s konstrukcí správného regexu moří samy. Při práci s generativní AI však platí dvě pravidla - musíte tušit, co je možné udělat, abyste na to mohli napsali prompt, a také byste měli danou problematiku sami trochu ovládat, abyste zvládli verifikovat výstup a potvrdit, že není výplodem ["halucinací"](https://www.ibm.com/topics/ai-hallucinations).

Pokud jsem vás přesvědčil, že to s regulárními výrazy stojí za to zkusit, zde je materiál na další samostudium:
- V češtině existuje povedená stránka https://www.regularnivyrazy.info/, z níž jsem se sám kdysi učil
- Dále je tu ultimátní web https://regex101.com/, kde si můžete výrazy psát interaktivně a web rovnou automaticky ověřuje, zda fungují, a poskytuje detailní rozbor, co bylo vlastně zadáno. V praxi neocenitelný pomcník, ke kterému se můžete vždy vrátit.

<a href="https://regex101.com/" title="regex101.com">
<article-image src="regex-neni-nepritel/regex101.jpg" alt="Analýza regulárního výrazu na regex101.com" />
</a>
