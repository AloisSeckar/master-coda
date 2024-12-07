Pěkný web se dá poskládat i s využitím “standardních” a na webu (většinou) dostupných druhů písma (viz [ZDE](https://www.w3schools.com/cssref/css_websafe_fonts.asp) a [ZDE](https://www.w3schools.com/cssref/css_fonts_fallbacks.asp). Variantou, která dále dramaticky rozšiřuje možnosti, je použití [Google Fonts](https://fonts.google.com/), kdy si můžete soubory písem nechat dotáhnout z ověřeného zdroje `fonts.googleapis.com`. Jsou jich tam volně k dispozici stovky. Vzniká vám ale závislost na třetí straně, i když je to Google _(nebo možná právě proto?)_, a při každém requestu na váš web se budou klientovi stahovat data odjinud. Ne, že by na dnešním webu nebyl běžný stav. Jde to ale i jinak.

Soubor písma je možné uložit, nahrát na FTP a následně načítat přímo na vašem webu. V CSS definujete globální direktivu:

```css
@font-face {
  font-family: "nazevFontu";
  src: url("<<cesta-k-souboru-pisma>>");
}
```

A ve stylu, kde chcete font použít, následně doplníte vlastnost:

```css
font-family: "nazevFontu";
```

Tak jsem to například s fontem `KaushanScript` udělal já, abych mohl mít netradiční font ve jméně na mém osobním webu:

:article-image{src="redukce-velikosti-fontu/homepage.jpg" alt="www.alois-seckar.cz" link="http://www.alois-seckar.cz"}

Nelíbila se mi na tom jen jedna věc. Font chci mít jen tady v nadpisu v podobě mého jména, takže reálně potřebuju pouze 11 znaků. Ale soubor `KaushanScript-Regular.ttf` jich samozřejmě definuje mnohem víc. Velikost má **183 972 bytů**. Tolik dat by se muselo tahat při každém zobrazení stránky kvůli 11 písmenům.

Jistě, při dnešních rychlostech připojení se nad necelými 0.2 Mb nestihne nikdo ani pozastavit, ale tady jde o princip - na větších webech s větší zátěží se to nasčítává, a i když to možná nebude trápit návštěvníky webu, tak třeba v Cloudu kde platíte za objem přenesených dat, to může brzy začít lézt do peněz. Vypěstovat si návyk redukovat velikost potřebných zdrojů se vám dřív nebo později určitě vyplatí.

Co kdybychom tedy dokázali z definice fontu vypárat subset právě jen těch potřebných jedenácti znaků?

Uhodli jste, jde to!

## Redukce pomocí pyftsubset

Způsob, který zde ukážu, vyžaduje [nainstalovat Python](https://www.python.org/downloads), což se mi napřed nechtělo, ale trvá to chvilku a následná pohodlnost a rychlost celého řešení je skoro až ohromující. Nejspíš to jde i jinak, ale už mi nestálo za to alternativy hledat.

Jakmile `Python` máme, jednoduše nainstalujeme přes jeho integrovaného správce balíčků `pip` nástroj [fontTools](https://github.com/fonttools/fonttools):

```
pip install fonttools
```

Ten nabízí daleko víc funkcí, které jsem ještě ani nezkoumal, ale pro náš účel využijeme příkaz `pyftsubset`, který dělá právě to, co potřebujeme - ze zadaného souboru písma vybere požadovaný soubor znaků a uloží do nového redukovaného souboru. Tím pak nahradíme svou definici `@font-face` a máme hotovo.

Vstupní soubor je první argument, znaky specifikujeme uvnitř volby `--unicodes=""`, kde může být buďto výčet `Unicode` znaků oddělený čárkami, nebo rozsah daný _spojovníkem_ (např. `U+0020-007F` jsou velké a malé znaky anglické abecedy).
 
 Unicode kódy znaků lze zjistit například z [tabulky na Wikipedii](https://en.wikipedia.org/wiki/List_of_Unicode_characters) (jak vidíte, jsou případy, kdy je Wikipedia vhodný zdroj). Na zápis mého jména a příjmení je potřeba:

```
A = U+0041
l = U+006C
o = U+006F
i = U+0069
s = U+0073

S = U+0053
e = U+0065
č = U+010D
k = U+006B
á = U+00E1
r = U+0072
```

Ve výchozím nastavení `pyftsubset` vezme původní název souboru písma a před příponu doplní `.subset`. Když budu chtít nějaké hezčí jméno, lze to udělat volbou `--output-file="jmeno"`.

Celý příkaz tedy bude v mém případě vypadat:

```
pyftsubset KaushanScript-Regular.ttf
 --unicodes="U+0041,U+006C,U+006F,U+0069,U+0073,U+0053,U+0065,U+010D,U+006B,U+00E1,U+0072"
 --output-file="KaushanScript-AS.ttf"
```

Výsledný soubor má pouze **6 668 bytů**, je tedy více než **27x** menší. A přitom se nadpis zobrazuje pořád stejně. Dobré, ne?. Teď si představte, že fontů používáte víc a z každého jen několik málo znaků. Nebo by vám stačila anglická abeceda a nepotřebujete pokrýt další stovky znaků z národních abeced. Řešení = `pyftsubset`.

## .woff2 formát

Všem úsporám ještě nemusí být konec. Velikost jde dále redukovat převodem na [Web Open Font Format](https://www.lifewire.com/what-is-woff-web-open-font-format-4800761) (`woff`, resp. `woff2`), což je moderní způsob, jak definovat písma na webu s lepší kompresí a optimalizovaným načítáním v CSS. Je třeba dát si pozor na starší prohlížeče, které by to ještě nemusely umět, ale obecně už je podpora dost dobrá.

Dobrá zpráva je, že i to umí `pyftsubset`. Jen k tomu potřebuje zapnout volbu `--flavor="woff2"` a doinstalovat Python modul kompresního Google nástroje `brotli`, což je ale s pomocí `pip` také hračka - jednoduše:

```
pip install brotli
```

Potom je možné zadat:

```
pyftsubset KaushanScript-Regular.ttf
 --unicodes="U+0041,U+006C,U+006F,U+0069,U+0073,U+0053,U+0065,U+010D,U+006B,U+00E1,U+0072"
 --flavor="woff2" --output-file="KaushanScript-AS.woff2"
```

A výsledný soubor je zase ještě skoro o další polovinu menší - **3 632 bytů**.

:article-image{src="redukce-velikosti-fontu/fonts.jpg" alt="Srovnání velikostí souborů" width="w-[500px]"}

Pro dnešek máme hotovo, návštěvníci mého webu při každé návštěvě ušetří 180 kilobytů zbytečných dat. Kolik těm svým zvládnete ušetřit vy?
