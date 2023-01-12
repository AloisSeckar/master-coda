<template>
    <div>
        <ArticleHeader />
        <div class="article">
            <h2>Vylepšený switch v Java 17
            </h2>
            <p>
                Nedávno jsem to psal do jedné FB diskuse a několika uživatelům se to líbilo. Pak ale autor vlákna
                celou diskusi najednou smazal. Tak jsem rozhodl sepsat to rovnou jako trvalý článek.
            </p>
            <p>
                Java se postupně mění a podle mě se většinou mění k lepšímu. Jedním z příkladů vývoje v nejnovější
                LTS verzi Java 17 ze září 2021 evoluce příkazu <span class="code">switch</span>. Jako ukázkový příklad
                mám jednoduchý úkol - vezmi náhodné číslo 1-7 a vypiš počet písmen v anglickém názvu příslušného dne v týdnu.
            </p>
            <p>
                Ve "staré" verzi <span class="code">switch</span> by to hlavní vypadalo třeba takto:
            </p>
            <div class="code">
                int numLetters = -1;<br />
                switch (day) {<br />
                &nbsp;&nbsp;case MONDAY:<br />
                &nbsp;&nbsp;case FRIDAY:<br />
                &nbsp;&nbsp;case SUNDAY:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = 6;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
                &nbsp;&nbsp;case TUESDAY:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = 7;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
                &nbsp;&nbsp;case THURSDAY:<br />
                &nbsp;&nbsp;case SATURDAY:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = 8;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
                &nbsp;&nbsp;case WEDNESDAY:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;numLetters = 9;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;break;<br />
                }<br />
                System.out.println("Result is: " + numLetters);
            </div>

            <p>
                Vylepšený <span class="code">switch</span> umí dvě věci - spojit větve se stejnou obsluhou na jeden řádek s využtím 
                nového symbolu <span class="code">-></span> a tím ušetřit místo. Tedy např.:
            </p>
            <div class="code">
                case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
            </div>
            <p>
                Za <span class="code">-></span> může následovat buďto jediný příkaz nebo blok kódu.
                Zároveň už není třeba psát klíčové slovo <span class="code">break</span>, aby kód nepropadl 
                do další větve pod tím.
            </p>

            <p>
                Druhá vymoženost je ještě zajímavější - <span class="code">switch</span> teď umí jako celek přímo 
                vracet nějakou hodnotu. Kompileru se to sdělí tak, že začneme psát 
                <span class="code">var variable = switch {<span class="j-com">…</span>}</span>. Je třeba myslet 
                na tři věci:
                <ul class="list-decimal">
                    <li>Je-li kód větve v bloku, návratová hodnota se uvozuje kličovým slovem <span class="code">yield</span></li>
                    <li>Návratové typy všech větví musí být všechny stejné</li>
                    <li>Musí být pokryty všechny varianty vstupu (většinou řešitelné přes <span class="code">default</span>)</li>
                </ul>
            </p>

            <p>
                Spojíme-li to vše dohromady, výsledkem je:
            </p>
            <div class="code">
                int numLetters = switch (day) {<br />
                &nbsp;&nbsp;case MONDAY, FRIDAY, SUNDAY -> 6;<br />
                &nbsp;&nbsp;case TUESDAY                -> 7;<br />
                &nbsp;&nbsp;case THURSDAY, SATURDAY     -> 8;<br />
                &nbsp;&nbsp;case WEDNESDAY              -> 9;<br />
                &nbsp;&nbsp;default -> {<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Default vetev (ukazka s yield)");<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;yield -1;  <br />
                &nbsp;&nbsp;}<br />
                };<br />
                System.out.println("Result is: " + numLetters);<br />
            </div>
            <p>
                Za mě mnohem kratší, kompatknější a hezčí.
            </p>
            <p></p>
            <p>
                <NuxtLink to="https://github.com/AloisSeckar/demos-java/blob/master/src/main/java/cz/aloisseckar/java/javademos/java17/newswitch/SwitchDemo.java" :external="true">
                    Demo kód
                </NuxtLink>
                v rámci mého projektu
                <NuxtLink to="https://github.com/AloisSeckar/demos-java" :external="true">
                    Java Demos
                </NuxtLink>
            </p>

        </div>
        <ArticleFooter />
    </div>
</template>