---
file: 'new-in-vue-2025-12'
cat: 'web'
title: 'New in Vue - Prosinec 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za prosinec 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-12-27'
created: '27.12.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-december-2025-1hk0'
---

Zdravím všechny, toto bude můj 24. a zároveň poslední článek v roce 2025. Přeju vám skvělý start do nadcházejícího roku 2026 a než to nastane, pojďme si ještě jednou dát rychlý přehled toho nejnovějšího z **Vue** / **Nuxt** / **Vite** světa.

::vue-newsletter
::

Samotné **Vue.js** nejspíš zakončí rok 2025 v poslední maintenance verzi **3.5.26**. Vue **v3.5** [vyšlo](https://blog.vuejs.org/posts/vue-3-5) už před více než rokem, takže můžeme říct, že základ našeho ekosystému je teď dost pevný a stabilní. Opravují se chyby, záplatují závislosti a čas od času se objeví drobné změny, ale celkově je kódová báze usazená a můžeme vyvíjet bez obav, že budeme muset každých pár měsíců všechno předělávat.

Upřímně ani nevím o žádných opravdu přelomových změnách, které by se teď vyvíjely, s výjimkou dlouho očekávaného **Vapor mode** - nové strategie pro rychlejší vykreslování komponent. To by mělo přistát ve **Vue 3.6**, jehož beta release se [objevil těsně před Vánoci](https://github.com/vuejs/core/releases/tag/v3.6.0-beta.1). Pokud chcete vědět víc, je k tomu [článek](https://vueschool.io/articles/news/vn-talk-evan-you-preview-of-vue-3-6-vapor-mode/) přímo od Evana You. Vyšel ale už v březnu, takže je vidět, že si to žádá svůj čas.

Řekl bych, že se slušná porce úsilí vývojářů v poslední době přesunula k **Vite** - build nástroji původně navrženému pro **Vue**, který ale dávno přerostl ve skutečný základ moderního JavaScript vývoje. A roste dál, což můžete sledovat skrze novinky na [Void(0) blogu](https://voidzero.dev/blog). Samotné **Vite** je teď dostupné ve verzi **7.3** a chystaná **v8** se přes dílčí bety [posouvá](https://github.com/vitejs/vite/blob/v8.0.0-beta.5/packages/vite/CHANGELOG.md) směrem k finálnímu vydání. Vše, co potřebujete o Vite v8 vědět, najdete [tady](https://vite.dev/blog/announcing-vite8-beta).

A konečně **Nuxt** - release cyklus v posledních týdnech poněkud zpomalil. Nedávné **v4.2** je s námi už [2 měsíce](https://nuxt.com/blog/v4-2) a druhý patch release **4.2.2** je aktuálně poslední dostupná verze. Předchozí v3 se stále udržuje přes backportované verze vydávané společně s v4 (nejnovější je **3.20.2**), ale plánované EOL datum (31.01.2026) se [nezadržitelně blíží](https://github.com/nuxt/nuxt/discussions/33918). Tahle relativní stabilita je dobrá zpráva, protože to znamená, že ostatní části ekosystému, hlavně nejrůznější moduly, mají šanci doběhnout a stabilizovat se kolem posledních verzí. Mezitím je někde v dálce další velká verze Nuxt 5 - nejspíš blíž, než se bojíte, ale dál, než doufáte. Nebo naopak, pokud se zrovna znovu migrovat nechcete (i když je slibováno, že to bude snadné a přímočaré). Každopádně uvidíme, co rok 2026 přinese.

Kromě samotného frameworku nabízí Nuxt spoustu skvělých modulů pro rozšíření základní funkcionality. Jedním z nejvýraznějších oficiálních je **Nuxt UI**, UI toolkit. Knihovna se dál vyvíjí - nejnovější verze [4.3](https://github.com/nuxt/ui/releases/tag/v4.3.0) vyšla 17. prosince. Pokud si ji vyberete pro další projekt, může se hodit tento [praktický návod](https://vueschool.io/articles/vuejs-tutorials/setting-up-your-ide-for-nuxt-ui-a-complete-guide/) na nastavení IDE. A mezi námi, článek stojí za přečtení i tak, protože spousta tipů se hodí pro Vue/Nuxt vývoj obecně. Přičemž můžu potvrdit, že většinu zmíněných rozšíření už sám používám. Jsou užitečná a praxí ověřená.

Jestli chcete dostávat novinky z ekosystému častěji než jednou měsíčně, existuje [Weekly Vue News](https://weekly-vue.news/), což je emailový newsletter, který chodí každé pondělí. Určitě doporučuju se přihlásit, čerpám z něj spoustu inspirace.

Na závěr bych ještě rád vypíchl [přehled bezpečnostních praktik pro NPM](https://snyk.io/articles/npm-security-best-practices-shai-hulud-attack/) od experta na cybersecurity Lirana Tala. V návaznosti na nedávnou vlnu vážných supply-chain útoků je vždycky dobré si připomenout a zrevidovat strategie, které pomáhají držet projekty bezpečnější.

Dejte pozor na hackery, užijte si zbytek roku 2025 a mějte úspěšný start do 2026. Uvidíme se zase v novém roce! 🫡
