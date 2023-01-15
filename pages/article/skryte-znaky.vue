<template>
    <div>
        <ArticleHeader />
        <div class="article">
            <p>
                Hlavní databáze našeho projektu je IBM Informix. Kódování má nastavené ISO 8859-2, takže občas narážíme 
                na problémy s&nbsp;nepodporovanými UTF-8 znaky, které se do ní nedaří uložit. Nejčastěji k&nbsp;tomu dochází při 
                kopírování textů z&nbsp;Wordu či odjinud. Spolehlivým řešením by byla migrace textů, u&nbsp;kterých to hrozí, 
                do jiné databáze (postupně zavádíme MongoDB), ale to je běh na dlouhou trať. Snažíme se to tedy řešit alespoň 
                automatizovaným nahrazováním problémových znaků, se kterými se opakovaně setkáváme. Ovšem stále nás něco 
                překvapuje.
            </p>
            <p>
                Naposledy to byl zdánlivě nevinný text:
            </p>
            <p class="font-italic">
                Anamnéza rihinitidy 22 let, v&nbsp;histologii s&nbsp;kulatobuněčnými inﬁltráty s&nbsp;příměsí eozinoﬁlních 
                granulocytů, pro které cca 10x PES +PE (5x).
            </p>
            <p>
                (Klient je zdravotní pojišťovna, nechtěje vědět, co to znamená, sám to nevím.)
            </p>
            <p>
                Zmíněný problém s&nbsp;nepovolenými znaky je obvykle na první pohled vidět. Tady ovšem ne, takže to byl 
                chvíli boj. Zákazníkovi se zdálo, že to není možné a&nbsp;problém musí být v&nbsp;něčem jiném. Ale nebyl.
            </p>
            <p>
                Nebudu vás napínat -&nbsp;zakopaný pes je ve slovech „inﬁltráty“ a&nbsp;„eozinoﬁlních“. Když si je 
                totiž vypíšete monspaced fontem (např. Courier New), uvidíte následující:
            </p>
            <div class="code">
                in<span class="code">ﬁ</span>ltráty … eozino<span class="code">ﬁ</span>lních
            </div>
            <p>
                Naštěstí mě po chvilkovém dumání napadlo přenést text do Notepad++ (kde to je vidět lépe než zde na webu).
                Nečekal jsem sice zrovna tohle, ale řešení bylo rázem na stole. Za všechno může podivuhodný znak „ﬁ“, 
                který z&nbsp;nějakého důvodu v&nbsp;textu nahrazuje sekvenci dvou písmen „fi“. Zřejmě se tam dostal 
                při OCR vytěžování PDF, případně byl do strojově zpracovatelného PDF už takto zapsán. Přijde mi fascinující, 
                že ho Word (minimálně má Office 365 verze) uznává a&nbsp;sám pro sebe správně interpretuje, pročež 
                nehlásí nic o&nbsp;špatném spellingu. Stálo mě to pěkných pár minut přemýšlení.
            </p>
            <p>
                <strong>Poučení</strong>: Není znak jako znak.
            </p>
        </div>
        <ArticleFooter />
    </div>
</template>

