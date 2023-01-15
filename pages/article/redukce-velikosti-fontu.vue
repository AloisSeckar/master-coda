<template>
    <div>
        <ArticleHeader />
        <div class="article">
            <p>
                Pěkný web se dá poskládat i&nbsp;s&nbsp;využitím “standardních” a&nbsp;na webu (většinou) 
                dostupných druhů písma (viz <a href="https://www.w3schools.com/cssref/css_websafe_fonts.asp">ZDE</a> 
                a&nbsp;<a href="https://www.w3schools.com/cssref/css_fonts_fallbacks.asp">ZDE</a>). 
                Variantou, která dále dramaticky rozšiřuje možnosti, je použití 
                <a href="https://fonts.google.com/">Google Fonts</a>, kdy si můžete soubory písem nechat 
                dotáhnout z&nbsp;ověřeného zdroje <span class="code">fonts.googleapis.com</span>.
                Jsou jich tam volně k&nbsp;dispozici stovky. Vzniká vám ale závislost na třetí straně, 
                i&nbsp;když je to Google <em>(nebo možná právě proto?)</em>, a&nbsp;při každém requestu 
                na váš web se budou klientovi stahovat data odjinud. Ne, že by na dnešním webu nebyl běžný stav. 
                Jde to ale i&nbsp;jinak.
            </p>

            <p>
                Soubor písma je možné uložit, nahrát na FTP a&nbsp;následně načítat přímo na vašem webu. 
                V&nbsp;CSS definujete globální direktivu:
            </p>
            <div class="code">
                <span class="j-var">@font-face</span> {<br />
                &nbsp;&nbsp;<span class="j-key">font-family</span>: <span class="j-lit">"nazevFontu"</span>;<br />
                &nbsp;&nbsp;<span class="j-key">src</span>: url(<span class="j-lit">"&lt;&lt;cesta-k-souboru-pisma&gt;&gt;"</span>);<br />
                }
            </div>
            <p>
                A ve stylu, kde chcete font použít, následně doplníte vlastnost:
            </p>
            <div class="code">
                <span class="j-key">font-family</span>: <span class="j-lit">"nazevFontu"</span>;
            </div>
            <p>
                Tak jsem to například s&nbsp;fontem <span class="code">KaushanScript</span> udělal já, abych mohl 
                mít netradiční font ve jméně na mém osobním webu:
            </p>
            <a href="www.alois-seckar.cz" title="www.alois-seckar.cz">
                <img src="/articles/redukce-velikosti-fontu/homepage.jpg" alt="www.alois-seckar.cz" />
            </a>

            <p>
                Nelíbila se mi na tom jen jedna věc. Font chci mít jen tady v&nbsp;nadpisu v&nbsp;podobě mého jména, 
                takže reálně potřebuju pouze 11 znaků. Ale soubor <span class="code">KaushanScript-Regular.ttf</span> 
                jich samozřejmě definuje mnohem víc. Velikost má <strong>183&nbsp;972 bytů</strong>. Tolik dat by se 
                muselo tahat při každém zobrazení stránky kvůli 11 písmenům.
            </p>
            <p>
                Jistě, při dnešních rychlostech připojení se nad necelými 0.2 Mb nestihne nikdo ani pozastavit, ale 
                tady jde o&nbsp;princip -&nbsp;na větších webech s&nbsp;větší zátěží se to nasčítává, a&nbsp;i&nbsp;
                když to možná nebude trápit návštěvníky webu, tak třeba v&nbsp;Cloudu kde platíte za objem přenesených 
                dat, to může brzy začít lézt do peněz. Vypěstovat si návyk redukovat velikost potřebných zdrojů se 
                vám dřív nebo později určitě vyplatí.
            </p>
            <p>
                Co kdybychom tedy dokázali z&nbsp;definice fontu vypárat subset právě jen těch potřebných jedenácti znaků? 
            </p>
            <p>
                Uhodli jste, jde to!
            </p>

            <h2>Redukce pomocí pyftsubset</h2>
            <p>
                Způsob, který zde ukážu, vyžaduje <a href="https://www.python.org/downloads">nainstalovat Python</a>, 
                což se mi napřed nechtělo, ale trvá to chvilku a&nbsp;následná pohodlnost a&nbsp;rychlost celého 
                řešení je skoro až ohromující. Nejspíš to jde i&nbsp;jinak, ale už mi nestálo za to alternativy hledat.
            </p>
            <p>
                Jakmile <span class="code">Python</span> máme, jednoduše nainstalujeme přes jeho integrovaného 
                správce balíčků <span class="code">pip</span> nástroj 
                <a href="https://github.com/fonttools/fonttools">fontTools</a>:
            </p>
            <div class="code">
                pip install fonttools
            </div>
            <p>
                Ten nabízí daleko víc funkcí, které jsem ještě ani nezkoumal, ale pro náš účel využijeme příkaz 
                <span class="code">pyftsubset</span>, který dělá právě to, co potřebujeme -&nbsp;ze zadaného 
                souboru písma vybere požadovaný soubor znaků a&nbsp;uloží do nového redukovaného souboru. 
                Tím pak nahradíme svou definici <span class="code">@font-face</span> a&nbsp;máme hotovo.
            </p>
            <p>
                Vstupní soubor je první argument, znaky specifikujeme uvnitř volby 
                <span class="code">--unicodes=""</span>, kde může být buďto výčet 
                <span class="code">Unicode</span> znaků oddělený čárkami, nebo rozsah daný <em>spojovníkem</em> 
                (např. <span class="code">U+0020-007F</span> jsou velké a&nbsp;malé znaky anglické abecedy).
            </p>
            <p>
                Unicode kódy znaků lze zjistit například z&nbsp;
                <a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters">tabulky na Wikipedii</a> 
                (jak vidíte, jsou případy, kdy je Wikipedia vhodný zdroj). Na zápis mého jména a&nbsp;příjmení 
                je potřeba:
            </p>
            <div class="code">
                A = U+0041<br />
                l = U+006C<br />
                o = U+006F<br />
                i = U+0069<br />
                s = U+0073<br />
                <br />
                S = U+0053<br />
                e = U+0065<br />
                č = U+010D<br />
                k = U+006B<br />
                á = U+00E1<br />
                r = U+0072<br />
            </div>

            <p>
                Ve výchozím nastavení <span class="code">pyftsubset</span> vezme původní název souboru písma ¨
                a&nbsp;před příponu doplní <span class="code">.subset</span>. 
                Když budu chtít nějaké hezčí jméno, lze to udělat volbou <span class="code">--output-file="jmeno"</span>.
            </p>
            <p>
                Celý příkaz tedy bude v&nbsp;mém případě vypadat:
            </p>
            <div class="code">
                pyftsubset KaushanScript-Regular.ttf 
                --unicodes="U+0041,U+006C,U+006F,U+0069,U+0073,U+0053,U+0065,U+010D,U+006B,U+00E1,U+0072" 
                --output-file="KaushanScript-AS.ttf"
            </div>
            <p>
                Výsledný soubor má pouze <strong>6&nbsp;668 bytů</strong>, je tedy více než <strong>27x</strong> menší. 
                A&nbsp;přitom se nadpis zobrazuje pořád stejně. Dobré, ne?. Teď si představte, že fontů používáte víc 
                a&nbsp;z&nbsp;každého jen několik málo znaků. Nebo by vám stačila anglická abeceda a&nbsp;nepotřebujete 
                pokrýt další stovky znaků z&nbsp;národních abeced. Řešení = <span class="code">pyftsubset</span>.
            </p>

            <h2>.woff2 formát</h2>
            <p>
                Všem úsporám ještě nemusí být konec. Velikost jde dále redukovat převodem na  
                <a href="https://www.lifewire.com/what-is-woff-web-open-font-format-4800761">Web Open Font Format</a> 
                (<span class="code">woff</span>, resp. <span class="code">woff2</span>), což je moderní způsob, 
                jak definovat písma na webu s&nbsp;lepší kompresí a&nbsp;optimalizovaným načítáním v&nbsp;CSS.
                Je třeba dát si pozor na starší prohlížeče, které by to ještě nemusely umět, ale obecně 
                už je podpora dost dobrá.
            </p>
            <p>
                Dobrá zpráva je, že i&nbsp;to umí <span class="code">pyftsubset</span>. Jen k&nbsp;tomu potřebuje 
                zapnout volbu <span class="code">--flavor="woff2"</span> a&nbsp;doinstalovat Python modul 
                kompresního Google nástroje <span class="code">brotli</span>, což je ale s&nbsp;pomocí 
                <span class="code">pip</span> také hračka - jednoduše:
            </p>
            <div class="code">
                pip install brotli
            </div>

            <p>
                Potom je možné zadat:
            </p>
            <div class="code">
                pyftsubset KaushanScript-Regular.ttf 
                --unicodes="U+0041,U+006C,U+006F,U+0069,U+0073,U+0053,U+0065,U+010D,U+006B,U+00E1,U+0072" 
                --flavor="woff2" --output-file="KaushanScript-AS.woff2"
            </div>
            <p>
                A výsledný soubor je zase ještě skoro o&nbsp;další polovinu menší -&nbsp;<strong>3&nbsp;632 bytů</strong>.
            </p>
            <img src="/articles/redukce-velikosti-fontu/fonts.jpg" alt="Srovnání velikostí souborů" />

            <p class="pt-6">
                Pro dnešek máme hotovo, návštěvníci mého webu při každé návštěvě ušetří 180 kilobytů zbytečných dat. 
                Kolik těm svým zvládnete ušetřit vy?
            </p>

        </div>
        <ArticleFooter />
    </div>
</template>

