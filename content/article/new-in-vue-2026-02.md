---
file: 'new-in-vue-2026-02'
cat: 'web'
title: 'New in Vue - Únor 2026'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za únor 2026'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2026-02-07'
created: '07.02.2026'
english: 'https://dev.to/aloisseckar/new-in-vue-february-2025-2kac'
---

Jak jste si asi ani nevšimli, lednové číslo mého kvazi-měsíčního newsletteru jsem přeskočil. Řešil jsem v práci nějaké deadliny a v roce 2026 už jsem napsal 3 další články. Rozhodl jsem se tedy minulou sobotu nepublikovat narychlo něco jen napůl hotového a raději vydání odložit. Dnes cestuji vlakem z Prahy do Ostravy, což je vždy dobrá příležitost pro tvůrčí práci. Tak tady to máte.

::vue-newsletter
::

Nuxt zahájil rok 2026 [novou minor verzí `4.3`](https://nuxt.com/blog/v4-3). Kromě řady aktualizací a vylepšení je nyní možné se prostřednictvím nastavení přihlásit k připravovaným funkcím **v5**. Chystaný Nuxt v5 by neměl být revoluční aktualizací s velkými změnami API a chování, ale přinese kompletně přepracovaný serverový engine [Nitro v3](https://v3.nitro.build/), což slibuje rychlejší a efektivnější fungování s řadou nových možností.

_**Edit:** Jen pár hodin poté, co jsem dokončil svůj přehled, přistála opravná patch verze [4.3.1](https://github.com/nuxt/nuxt/releases/tag/v4.3.1)._

Správci větších projektů se také dočkali dobré zprávy o prodloužení oficiální podpory Nuxtu v3 o 6 měsíců - z konce ledna na **31. července 2026**. To dává všem více času na migraci. Někteří si stěžují, že období podpory by mělo být ještě delší, protože produkční týmy zkrátka potřebují větší stabilitu, ale pamatujte, že Nuxt je open-source projekt. Přestože je nyní pár členů týmu placeno Vercelem, kapacita pro řešení problémů je stále omezená. A já bych raději viděl nový vývoj než nekončící údržbu legacy kódu pro (často neplatící) uživatele.

Na obzoru jsou dva nové oficiální moduly pro Nuxt. [Nuxt Accessibility](https://nuxt.com/modules/a11y) se zaměří na vylepšení přístupností webů tím, že poskytne způsoby testování a upozní na problémy během vývoje. [Nuxt Hints] půjde možná ještě dál a měl by nabídnout přehledy o _výkonu, přístupnosti a bezpečnosti vašich aplikací_. Oba moduly jsou nyní ve fázi alpha a směřují k vydání v1, které se dá brzy očekávat.

Dříve placený prémiový projekt [Nuxt Studio](https://content.nuxt.com/blog/studio-oss) se stal bezplatným a plně open-source. Tranziční proces začal poté, co [Vercel minulé léto převzal NuxtLabs](https://vercel.com/blog/nuxtlabs-joins-vercel), a byl dokončen na počátku roku 2026. Nuxt Studio bývalo způsobem, jak vydělávat peníze na stabilní vývoj Nuxtu. Protože to už není nutné, máte nyní toto pokročilé CMS řešení volně k dispozici.

Adam Berecz oznámil svůj [Vueform 2.0](https://vueform.com/news/20260108-announcing-vueform-2-0). O Vueformu jsem se dozvěděl před 11 měsíci z jeho vystoupení na konferenci a hned se mi zalíbil. Nyní to vypadá, že dojde k posunu paradigmatu od více přepřipraveného a v něčem omezujícího řešení pro práci s formuláři k headless jádru, které umožní hladké rozšíření téměř jakoukoliv UI knihovnou. Těším se na výsledek. Formuláře jsou velké (a poněkud bolestivé) téma a obávám se, že jsem si svůj vysněný setup ještě nevybral. Dalším hráčem na scéně může být [Formisch](https://formisch.dev/), na kterém od minulého léta pracuje Fabian Hiller, autor validační knihovny Valibot. Ale protože [Nuxt UI](https://ui.nuxt.com/) také uvolnilo své dříve placené komponenty, možná je jejich [Form](https://ui.nuxt.com/docs/components/form) vše, co Nuxt vývojář dnes potřebuje? Plánuji si s touto teorií trochu zaexperimentovat...

Nezapomínejme ani na širší ekosystém Vite. Jak jste možná slyšeli, jednou ze základních součástí probíhajících snah o vylepšení je **Rolldown**. Bundler napsaný v Rustu, navržený tak, aby byl bláznivě rychlý a efektivní při sestavování moderních webových aplikací. Vite verze 8, která je [již od prosince](https://voidzero.dev/posts/announcing-vite-8-beta) v beta fázi, bude již poháněn výhradně Rolldownem. Brzy bude i samostatný release Rolldownu, už máme [release kandidáty](https://voidzero.dev/posts/announcing-rolldown-rc). A děje se toho ještě mnohem víc, jak můžete vidět v [čerstvém měsíčním shrnutí](https://voidzero.dev/posts/whats-new-jan-2026) od Alexe Lichtera.

Poslední věc, která mě v poslední době zaujala, je [npmx](https://github.com/npmx-dev/npmx.dev) - alternativní frontend k registru NPM balíčků. Jedná se o další open-source projekt, momentálně v aktivním vývoji, který slibuje lepší DevEx při procházení NPM balíčků. Není to konkurenční repozitář a vlastní ekosystém, jen alternativní frontend s doplňkovými funkcemi. Byl jsem s klasickým [https://www.npmjs.com/](https://www.npmjs.com/) spokojený, ale tohle vypadá jako jedna z těch aktualizací, o kterých nevíte, že je potřebujete, dokud je nedostanete. Budu to sledovat.

Březnové číslo plánuju vydat po [konferenci VueJS Amsterdam](https://vuejs.amsterdam/). Letos se tam osobně nechystám, ale budu sledovat novinky a jsem si jistý, že bude o čem psát. Do té doby se mějte!
