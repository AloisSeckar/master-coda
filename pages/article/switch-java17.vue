<template>
    <div>
        <ArticleHeader />
        <div class="article">
            <p>
                Nedávno jsem to psal do jedné FB diskuse a&nbsp;několika uživatelům se to líbilo. Pak ale autor 
                vlákna celou diskusi najednou smazal. Tak jsem rozhodl sepsat to rovnou jako trvalý článek.
            </p>
            <p>
                Java se postupně mění a&nbsp;podle mě se většinou mění k&nbsp;lepšímu. Jedním z&nbsp;příkladů 
                vývoje v&nbsp;nejnovější LTS verzi Java&nbsp;17 ze září 2021 evoluce příkazu 
                <span class="code">switch</span>. Jako ukázkový příklad mám jednoduchý úkol - vezmi náhodné číslo 
                1-7 a&nbsp;vypiš počet písmen v&nbsp;anglickém názvu příslušného dne v&nbsp;týdnu.
            </p>
            <p>
                Ve "staré" verzi <span class="code">switch</span> by to hlavní vypadalo třeba takto:
            </p>
            <div class="code">
                <span class="j-key">int</span> numLetters = <span class="j-val">-1</span>;<br />
                <span class="j-key">switch</span> (day) {<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">MONDAY</span>:<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">FRIDAY</span>:<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">SUNDAY</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = <span class="j-val">6</span>;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-key">break</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">TUESDAY</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = <span class="j-val">7</span>;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-key">break</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">THURSDAY</span>:<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">SATURDAY</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = <span class="j-val">8</span>;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-key">break</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">WEDNESDAY</span>:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = <span class="j-val">9</span>;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-key">break</span>;<br />
                }<br />
                System.<span class="j-var">out</span>.println(<span class="j-lit">"Result is: "</span> + numLetters);
            </div>

            <p>
                Vylepšený <span class="code">switch</span> umí dvě věci - spojit větve se stejnou obsluhou na jeden řádek 
                s&nbsp;využtím nového symbolu <span class="code">-></span> a&nbsp;tím ušetřit místo. Tedy např.:
            </p>
            <div class="code">
                <span class="j-key">case</span> <span class="j-var">MONDAY</span>, <span class="j-var">FRIDAY</span>, <span class="j-var">SUNDAY</span> -> System.<span class="j-var">out</span>.println(<span class="j-val">6</span>);
            </div>
            <p>
                Za <span class="code">-></span> může následovat buďto jediný příkaz nebo blok kódu.
                Zároveň už není třeba psát klíčové slovo <span class="code">break</span>, aby kód nepropadl 
                do další větve pod tím.
            </p>

            <p>
                Druhá vymoženost je ještě zajímavější - <span class="code">switch</span> teď umí jako celek přímo 
                vracet nějakou hodnotu. Kompileru se to sdělí tak, že začneme psát 
                <span class="code"><span class="j-key">var</span> variable = <span class="j-key">switch</span> {<span class="j-com">…</span>}</span>. Je třeba myslet 
                na tři věci:
                <ul class="list-decimal">
                    <li>Je-li kód větve v&nbsp;bloku, návratová hodnota se uvozuje kličovým slovem <span class="code">yield</span></li>
                    <li>Návratové typy všech větví musí být všechny stejné</li>
                    <li>Musí být pokryty všechny varianty vstupu (většinou řešitelné přes <span class="code">default</span>)</li>
                </ul>
            </p>

            <p>
                Spojíme-li to vše dohromady, výsledkem je:
            </p>
            <div class="code">
                <span class="j-key">int</span> numLetters = <span class="j-key">switch</span> (day) {<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">MONDAY</span>, <span class="j-var">FRIDAY</span>, <span class="j-var">SUNDAY</span> -> <span class="j-val">6</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">TUESDAY</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> <span class="j-val">7</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">THURSDAY</span>, <span class="j-var">SATURDAY</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> <span class="j-val">8</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> <span class="j-var">WEDNESDAY</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> <span class="j-val">9</span>;<br />
                &nbsp;&nbsp;<span class="j-key">case</span> -> {<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;System.<span class="j-var">out</span>.println(<span class="j-lit">"Default vetev (ukazka s blokem kodu + yield)"</span>);<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="j-key">yield</span> <span class="j-val">-1</span>;  <br />
                &nbsp;&nbsp;}<br />
                };<br />
                System.<span class="j-var">out</span>.println(<span class="j-lit">"Result is: "</span> + numLetters);<br />
            </div>
            <p>
                Za mě mnohem kratší, kompatknější a&nbsp;hezčí.
            </p>
            <p></p>
            <p>
                <NuxtLink to="https://github.com/AloisSeckar/demos-java/blob/master/src/main/java/cz/aloisseckar/java/javademos/java17/newswitch/SwitchDemo.java" :external="true">
                    Demo kód
                </NuxtLink>
                v&nbsp;rámci mého projektu
                <NuxtLink to="https://github.com/AloisSeckar/demos-java" :external="true">
                    Java Demos
                </NuxtLink>
            </p>

        </div>
        <ArticleFooter />
    </div>
</template>