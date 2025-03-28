---
file: 'hello-chatgpt-5'
cat: 'misc'
title: 'Páté rande s ChatGPT - obrázky z Wikipedie'
dscr: 'Pokus o automatizaci získávání URL na svg obrázky z Wikipedie'
tags: ['ChatGPT', 'AI', 'programování', 'help']
date: '2023-10-14'
created: '14.10.2023'
edited: '17.10.2023'
---

Umělá inteligence nás programátory prý brzy nahradí. Ale ještě to nejspíš nějakou chvíli potrvá. Alespoň při mém posledním pokusu mi ChatGPT život zas tak moc neusnadnil, i když cestu ke správnému řešení nakonec ukázal. Nebo jsem jen zatím dostatečně neovládl umění zadat mu ten správný vstup? Posuďte sami.

Přímotal jsem se k [projektu](https://github.com/ByMykel/spanish-cities), který se snaží vytvořit databázi informací o Španělských provinciích a městech v podobě `npm` balíčku. Něco jako náš RÚIAN, ale navíc s obrázky vlajek a znaků. Trochu obskurní téma, pravda. To se vám může stát, když vás napadne zúčastnit se [Hacktoberfestu](https://hacktoberfest.com/) (mimochodem zajímavá akce, která by zasloužila vlastní článek...snad brzy).

Projekt jsem potkal ve fázi, kdy už byla hotová základní logika, připraveny datové objekty a implementováno vyhledávání, ale chyběly odkazy na obrázky. Metodika byla využít Španělskou Wikipedii, kde jsou potřebné obrázky ve formátu `.svg` většinou k dispozici. Co JSON záznam, to jedna URL pro `flag` a jedna pro `coat_of_arms`. Trochu problém je, že se vlastní URL obrázku na Mediawiki standardně schovává až za stránkou s metadaty. Pokud to člověk chce dělat "hloupě", musí napřed kliknout na obrázek vložený do samotné stránky pro přechod na metadata a pak ještě jednou, než se konečně dostane k tomu, co potřebuje.
  
Pro jednotlivé Španělské provincie (51) jsem to ještě [zvládl ručně](https://github.com/ByMykel/spanish-cities/pull/77) (abych měl svůj první Hacktoberfest pull request ^_^). Pro více než 8 tisíc Španělských měst by to už ale byla docela fuška. Taková repetetivní práce bez velké přidané hodnoty se jeví jako typický úkol, který by AI mohla usnadnit a zrychlit. 
  
Tedy jsem se začal s mým **ChatGPT 4.0 Pro** dohadovat kudy do toho. Zapnul jsem k tomu i [BrowserOp plugin](https://www.whatplugin.ai/plugins/browserop), abych měl jistotu, že se bude pracovat s aktuálními daty a ne několik let starou verzí Wikipedie.

Napřed jsem se snažil zadefinovat posloupnost uživatelských kroků, kterými se k cílovému URL obrázku dostat. ChatGPT po chvíli zvládl rozparsovat stránku kategorie _"obrázky vlajek pro provincii XY"_, ale potřebnou sekvenci prokliků realizovat nedokázal. Když jsem se zeptal, co s tím, navrhl použít [Mediawiki API](https://www.mediawiki.org/wiki/API:Imageinfo). Za to mu patří pochvala - skutečně hned na první pokus vymyslel funkční řešení, na kterém šlo stavět.

S realizací to ovšem bylo o něco horší. Napřed mi přišlo rozumné, že mi rekapituluje, co se chystá udělat, a že se ujišťuje, zda má pokračovat. Jenže si nějak nedokázal nebo nechtěl zapamatovat můj pokyn, že už se ptát nemá a má pokračovat v tom, co dělá, dál a bez ptaní.

Proč je to problém? Protože u toho pak musí člověk sedět a každou chvíli proces extrakce URL posouvat dál. ChatGPT ani v placené verzi svůj výstup negeneruje nijak zvlášť rychle, BrowserOp plugin "přemýšlí" ještě déle, takže to ve finále bylo vlastně pomalejší než otrocké ruční klikání. Časem jsem dospěl alespoň ke kompromisu _"vezmi dalších 20 záznamů a pokračuj"_. Jenže to zas několikrát záhadně spadlo na neidentifikovatelnou chybu, nebo se z _"dalších 20"_ stalo _"znovu těch samých 20"_. Ke konci seance jsem už dokonce i překročil limit výpočetní kapacity a musel na další prompt několik minut počkat. Pro města z provincie `A Coruña` jsem z toho sice [nakonec commit uplácal](https://github.com/ByMykel/spanish-cities/pull/78), ale zabralo to celý večer a pocit ulehčení práce jsem z toho opravdu neměl.

Úplně zbytečné to ale nebylo. Navržený postup získávání URL obrázku z jeho jména pomocí API jsem využil a napsal si [svůj vlastní Java program](https://github.com/AloisSeckar/wiki-image-crawler), který to, oč se těžkopádně snažil ChatGPT, zvládne spolehlivě za pár vteřin. Takže svou existenci programátora jsem alespoň prozatím před umělou inteligencí obhájil.
