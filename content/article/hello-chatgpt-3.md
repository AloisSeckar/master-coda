---
file: 'hello-chatgpt-3'
cat: 'misc'
title: 'Třetí rande s ChatGPT - barvy'
dscr: 'AI coby můj osobní designový poradce'
tags: ['ChatGPT', 'AI', 'programování', 'help']
date: '2023-06-07'
created: '07.06.2023'
edited: '08.09.2023'
---

ChatGPT se pomalu etabluje jako můj užitečný pomocník. O prvních zkušenostech jsem psal [ZDE](/article/hello-chatgpt-1) a [ZDE](/article/hello-chatgpt-2). Minulý týden jsem demonstroval jeho užitečnost při přednášce o základech tvorby webů pro žáky ZŠ a včera jsem ukazoval kolegovi z práce, jak by si díky němu rychle poradil s problémem, se kterým se potýkal "tradiční" Google metodou.

Dneska jsem se rozhodl vyzkoušet zase novou aplikaci a nechat si poradit s výběrem barev textu a grafiky přímo zde na webu. Toto je tedy jedna velice praktická case study jejíž výsledky máte doslova před očima.

## Výchozí stav

Grafika jde trošku mimo mě. Něco o principech vím a neskromně si myslím, že když sem tam něco tvořím, tak to není úplná zhůvěřilost. Cit pro barvy mi ale poněkud chybí. Když jsem tvořil tenhle blog, věděl jsem, že chci tmavé pozadí, a potom "podle chuti" hledal nějaké vhodné barvy. Přišlo mi rozumné mít nadpisy žluté/zlaté, hlavní text zelený a odkazy doplňkovou fialovou.

Abych to měl snazší, snažil jsem se držet [výchozí barevné palety TailwindCSS](https://tailwindcss.com/docs/customizing-colors). To mě samozřejmě samo o sobě limitovalo. Skončil jsem u této kombinace:

<div class="mx-2 w-16 h-8 bg-amber-300 inline-block"></div>
<div class="mx-2 w-16 h-8 bg-green-800 inline-block"></div>
<div class="mx-2 w-16 h-8 bg-fuchsia-600 inline-block"></div>

Moc spokojený jsem nebyl. Nadpisy vcelku ok, ale zelený text byl pro čtení dost tmavý a zvolená varianta fialové poněkud "šílená". Říkal jsem si, že to časem musím upravit. A napadlo mě, že bych zapojil umělou inteligenci.

## Tvůrčí proces

Pamětliv instrukce, že je dobré prompt nějakým způsobem zasetovat, aby AI neměla úplnou volnost ve výmýšlení odpovědi, informoval jsem ji o barvě mého pozadí (`slate-900` z TailwindCSS palety) a poprosil o vhodné barevné téma založené na mnou vybraných barvách - zelené, zlaté a fialové.

``I have a webpage with `#0f172a` background. Can you suggest reasonable theme colors based on green, gold and purple?`` (1)

Obratem jsem dostal trojici barev vč. popisu zvolených odstínů doplňujících komentářů.

<div class="mx-2 w-16 h-8 bg-[#C99A0C] inline-block"></div>
<div class="mx-2 w-16 h-8 bg-[#2C7A7B] inline-block"></div>
<div class="mx-2 w-16 h-8 bg-[#6B46C1] inline-block"></div>

Byly mi nabídnuty ještě další barvy - "light background color" a "light/dark font color", ale ty jsem se rozhodl ignorovat.

Už toto by byl na první pokus super výsledek. Po nasazení mi ale přišlo, že odstíny jsou přeci jen trochu tmavé. Řekl jsem si tedy napřed o světlejší písmo:

``Can you suggest a green color tone that would be somewhat lighter than `#2C7A7B` and being good visible on `#0f172a` background?``

A dostal barvu, kterou nyní čtete.

Pak jsem několik vstupů laboroval s fialovou. Dostali jsme se až k růžové a béžové, tak jsem se zase vrátil k jedné z prvních variant, kterou si sice nejsem úplně jistý, ale zatím je nejlepší. Lehce zesvětlit zlaté nadpisy už pak byla hračka.

Celé to trvalo dejme tomu půl hodiny. Včetně úpravy stylů tak, aby se definice barev sjednotila na jedno místo v `tailwind.config.ts`. Dalších dvacet minut píšu tenhle shrnující článek. Produktivní odpoledne ve vlaku z Brna.

## Výsledek

Výsledná kombinace byla:

<div class="mx-2 w-16 h-8 bg-[#38B2AC] inline-block"></div>
<div class="mx-2 w-16 h-8 bg-[#FFD700] inline-block"></div>
<div class="mx-2 w-16 h-8 bg-[#D6BCFA] inline-block"></div>

Nynější stav pokládám za mnohem lepší. Nechám si klidně dále poradit od živého grafika, ale svému ChatGPT tímto děkuji, protože mě opět posunul kupředu.


(1) **P.S.:** Díky ChatGPT, že mi obratem ukázal, jak v MarkDown syntaxi zapsat blok kódu s "backtickem" uvnitř ;)

(2) **P.P.S.:** Po několika dnech jsem přeci jen provedl ještě menší korekci odstínů žluté a fialové. Nyní tu je:

<div class="mx-2 w-16 h-8 bg-coda-green inline-block"></div>
<div class="mx-2 w-16 h-8 bg-coda-yellow inline-block"></div>
<div class="mx-2 w-16 h-8 bg-coda-purple inline-block"></div>
