---
file: 'skryte-znaky'
cat: 'debugging'
title: 'Skryté (pa)znaky'
dscr: 'Fonty nejsou tím, čím se zdají být'
tags: ['debugging', 'fonty']
date: '2023-01-11'
created: '11.01.2023'
edited: '11.01.2023'
---

Hlavní databáze našeho projektu je IBM Informix. Kódování má nastavené ISO 8859-2, takže občas narážíme na problémy s nepodporovanými UTF-8 znaky, které se do ní nedaří uložit. Nejčastěji k tomu dochází při kopírování textů z Wordu či odjinud. Spolehlivým řešením by byla migrace textů, u kterých to hrozí, do jiné databáze (postupně zavádíme MongoDB), ale to je běh na dlouhou trať. Snažíme se to tedy řešit alespoň automatizovaným nahrazováním problémových znaků, se kterými se opakovaně setkáváme. Ovšem stále nás něco překvapuje.

Naposledy to byl zdánlivě nevinný text:

_„Anamnéza rihinitidy 22 let, v histologii s kulatobuněčnými inﬁltráty s příměsí eozinoﬁlních granulocytů, pro které cca 10x PES +PE (5x).“_

(Klient je zdravotní pojišťovna, nechtěje vědět, co to znamená, sám to nevím.)

Zmíněný problém s nepovolenými znaky je obvykle na první pohled vidět. Tady ovšem ne, takže to byl chvíli boj. Zákazníkovi se zdálo, že to není možné a problém musí být v něčem jiném. Ale nebyl.

Nebudu vás napínat - zakopaný pes je ve slovech **„inﬁltráty“** a **„eozinoﬁlních“**. Když si je totiž vypíšete monspaced fontem (např. `Courier New`), uvidíte následující:

```
inﬁltráty … eozinoﬁlních
```

Naštěstí mě po chvilkovém dumání napadlo přenést text do Notepad++ (kde to je vidět lépe než zde na webu). Nečekal jsem sice zrovna tohle, ale řešení bylo rázem na stole. Za všechno může podivuhodný znak `ﬁ`, který z nějakého důvodu v textu nahrazuje sekvenci dvou písmen „fi“. Zřejmě se tam dostal při OCR vytěžování PDF, případně byl do strojově zpracovatelného PDF už takto zapsán. Přijde mi fascinující, že ho Word (minimálně má Office 365 verze) uznává a sám pro sebe správně interpretuje, pročež nehlásí nic o špatném spellingu. Stálo mě to pěkných pár minut přemýšlení.

::wise-words
Není znak jako znak.
::
