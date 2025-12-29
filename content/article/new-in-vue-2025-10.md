---
file: 'new-in-vue-2025-10'
cat: 'web'
title: 'New in Vue - Říjen 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za říjen 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-10-25'
created: '25.10.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-october-2025-6i7'
---

Po dalším měsíci plném dění je zde moje reflexe nejnovějších zpráv a událostí ze stále se vyvíjejícího světa **Vue**, **Nuxt**, **Vite** a jejich úžasných open-source ekosystémů.

::vue-newsletter
::

V [zářijovém čísle](/article/new-in-vue-2025-09) jsem označil nadcházející [ViteConf v Amsterdamu](https://viteconf.amsterdam/) jako jistý zdroj zajímavých novinek. A tím rozhodně byla! Největším oznámením, které tam zaznělo z úst samotného Evana You, bylo **[Vite+](https://voidzero.dev/posts/announcing-vite-plus)**. Je to nový all-in-one nástroj pro vývoj webu postavený okolo [Vite](https://vite.dev/) a nového [Oxc](https://oxc.rs/) toolchainu. Budování nových aplikací bude ještě jednodušší a rychlejší než dříve.

Nejedno obočí se zvedlo kvůli oznámenému cenovému modelu, protože Vite+ má být placený nástroj pro firmy, což obvykle vyvolává v open-source komunitách obavy a nelibost. Odmítám se cítit uražen. Z mého pohledu: Všechny základní stavební kameny **ZŮSTANOU** open-source, jak jsme zvyklí, a dokonce i Vite+ bude zdarma, pokud ho neplánujete používat pro větší komerční zisk. Což vidím jako zcela spravedlivé. Drsná realita je, že vývoj open source často znamená dávat ostatním všechno a zpět nedostat skoro nic (kromě spousty hejtů). Tým ve **void(0)** už pro nás udělal tolik, že i kdyby open source úplně přestali vyvíjet, měli bychom být pořád vděční. Místo toho dávají komunitě stále více a více a ustanovení stabilního zdroje příjmů jim jen pomůže dělat to lépe. Mimochodem, mezitím organizace [darovala téměř 50 tisíc dolarů](https://voidzero.dev/posts/oss-pledge-2025) jiným open-source projektům. Takže tam opravdu nevidím problém a těším se na budoucnost projektu. Vite+ by měl být hotový příští rok a zajímá mě, jaký bude výsledek.

Co se týče aktualizací, jeden z nových (a bleskově rychlých) nástrojů z rodiny **Oxc.rs**, nový Rust linter [Oxlint](https://oxc.rs/docs/guide/usage/linter), nyní dostává podporu pro JavaScript pluginy. To je důležitější, než se může zdát, protože to v důsledku znamená, že většina současných nástrojů okolo ESLintu bude prostě dál fungovat, i když přejdete na Oxlint. Úsilí potřebné k přechodu by mělo být zanedbatelné. A výsledkem budou ušetřené hodiny, protože nové lintování postavené na Rustu je mnohem rychlejší. Abych byl k vám úplně upřímný, práce ještě není zcela hotová, ale cesta byla nastavena a nástroj se už bude jen zlepšovat.

Také se zlepšuje řešení pro testování vašich webových aplikací. Po sérii 19 beta verzí rozložených od 20. června je [konečně venku **Vitest 4.0**](https://voidzero.dev/posts/announcing-vitest-4). Klíčové novinky zahrnují dokončený [browser mód](https://vitest.dev/guide/browser/), vestavěné [vizuální regresní testování](https://vitest.dev/guide/browser/visual-regression-testing.html), lepší podporu pro debugging nebo pár nových API metod.

Mimochodem 5. října měl [narozeniny **Tailwind CSS**](https://tailwindweekly.com/issue-200/)! Je to už (nebo „teprve“?) 10 let, co tento projekt začal. Pamatuji si, že tehdy byl Bootstrap „Cestou“ pro tvorbu webových stránek. Ten se mi nikdy moc nelíbil. Ve skutečnosti se mi nelíbil ani Tailwind, když jsem ho viděl poprvé. Ale trvalo mi to asi den. A od té doby nechci používat nic jiného. Přestože se snažím sledovat vývoj a nové možnosti, nejsem zkušený CSS vývojář schopný zvládnout všechnu responzivitu a jiné zvláštnosti sám. Ale s Tailwind CSS toho zvládnu udělat velmi rychle velmi mnoho a bez příliš velkého úsilí. A to je úžasné.

V neposlední řadě byla dnes vydána nová verze Nuxtu - ve [4.2.0](https://github.com/nuxt/nuxt/releases/tag/v4.2.0) Nuxt tým dodává lepší kontrolu nad rušením asynchronního načítání dat s novým `AbortController` nebo vylepšené DevEx prostřednictvím podrobnějších informací o chybách ve vývojovém režimu. A samozřejmě spousta dalších vylepšení a oprav jako vždycky.

---

Jsem si celkem dost jistý, že jsem několik dalších zajímavých novinek a vydaných verzí propásl. Ale myslím, že jsem pro dnešek natrhal čerstvého ovoce z kvetoucí Vu.js zahrádky dostatek. Uvidíme se příští měsíc s další dávkou.
