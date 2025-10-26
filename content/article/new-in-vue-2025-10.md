---
file: 'new-in-vue-2025-10'
cat: 'web'
title: 'New in Vue – Říjen 2025'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za říjen 2025'
tags: ['Vue.js', 'Nuxt', 'Vite', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2025-10-25'
created: '25.10.2025'
english: 'https://dev.to/aloisseckar/new-in-vue-october-2025-6i7'
unchecked: true
---

Po dalším měsíci plném akcí zde je moje reflexe nejnovějších zpráv a událostí ze stále se vyvíjejícího světa **Vue**, **Nuxt**, **Vite** a jejich úžasných open-source ekosystémů.

![Nový Vue newsletter spuštěn](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/csywjp8b1lrbu95xywgi.png)

---

V [zářijovém čísle](https://dev.to/aloisseckar/new-in-vue-september-2025-4mef) jsem označil nadcházející [ViteConf v Amsterdamu](https://viteconf.amsterdam/) jako zdroj zajímavých novinek. A rozhodně byla! Největším oznámením, které tam zaznělo, samotným Evanem You, bylo **[Vite+](https://voidzero.dev/posts/announcing-vite-plus)**. Je to nový all-in-one nástroj pro vývoj webu postavený okolo [Vite](https://vite.dev/) a nového [Oxc](https://oxc.rs/) toolchainu. Budování nových aplikací bude ještě jednodušší a rychlejší než dříve.

Nejedno obočí se zvedlo kvůli oznámenému cenovému modelu, protože Vite+ má být placený nástroj pro podniky, což obvykle vyvolává obavy a nelibost v open‑source komunitě. Odmítám být uražen. Z mého pohledu – všechny základní stavební kameny **ZŮSTANOU** open‑source, jak jsme zvyklí, a dokonce i Vite+ bude zdarma, pokud z něj nechcete vydělávat velký komerční zisk. Což vidím jako zcela spravedlivé. Drsná realita je, že vývoj open source často znamená dávat ostatním všechno a nedostat skoro nic (kromě spousty nenávisti) zpět. Tým ve **void(0)** už pro nás udělal tolik, že i kdyby úplně přestali vyvíjet open source, měli bychom být vděční. Místo toho dávají komunitě stále více a více a ustanovení stabilního zdroje příjmů jim jen pomůže dělat to lépe. Mimochodem, mezitím organizace [darovala téměř 50 tisíc dolarů](https://voidzero.dev/posts/oss-pledge-2025) jiným open‑source projektům. Takže tam opravdu nevidím problém a těším se na budoucnost projektu. Vite+ by měl být hotový příští rok a zajímá mě, jaký bude výsledek.

Co se týče aktualizací, jeden z nových (a bleskově rychlých) nástrojů z rodiny Oxc.rs, nový Rust linter [Oxlint](https://oxc.rs/docs/guide/usage/linter), nyní získává podporu pro JavaScript pluginy. To je důležitější, než se může zdát, protože to vlastně znamená, že většina současných nástrojů okolo ESLintu bude prostě fungovat dál, i když přejdete na Oxlint. Úsilí potřebné k tomu by mělo být zanedbatelné. A výsledkem budou ušetřené hodiny, protože nové lintování postavené na Rustu je mnohem rychlejší. Abych byl k vám úplně upřímný, práce ještě není zcela hotová, ale cesta byla nastavena a nástroj se bude jen zlepšovat.

Také se zlepšuje řešení pro testování vašich webových aplikací. Po sérii 19 beta verzí rozložených od 20. června je **Vitest 4.0** [konečně venku](https://voidzero.dev/posts/announcing-vitest-4). Klíčové vrcholy nové hlavní verze zahrnují dokončený [režim prohlížeče](https://vitest.dev/guide/browser/), vestavěné [vizuální regresní testování](https://vitest.dev/guide/browser/visual-regression-testing.html), lepší podporu pro ladění nebo pár nových API metod.

Mimochodem měl **Tailwind CSS** [narozeniny 5. října](https://tailwindweekly.com/issue-200/)! Je to už (nebo „teprve“?) 10 let, co tento projekt začal. Pamatuji si, že tehdy byl Bootstrap „cestou“ pro tvorbu webových stránek. Moc se mi nelíbil. Ve skutečnosti se mi nelíbil ani Tailwind, když jsem ho poprvé viděl. Ale trvalo mi to asi den. A od té doby nechci používat nic jiného. Přestože se snažím sledovat události, nejsem zkušený CSS inženýr schopný zvládnout všechnu responzivitu a jiné zvláštnosti sám. Ale s Tailwind CSS toho zvládnu udělat velmi rychle hodně a bez příliš velkého úsilí. A to je úžasné.

V neposlední řadě byla dnes vydána nová verze Nuxtu – ve [4.2.0](https://github.com/nuxt/nuxt/releases/tag/v4.2.0) tým Nuxtu dodává lepší kontrolu nad rušením načítání dat s novým `AbortController` nebo vylepšené DevEx prostřednictvím podrobnějších informací o chybách ve vývojovém režimu. A samozřejmě spousta dalších vylepšení a oprav.

---

Jsem si docela jistý, že jsem propásl několik dalších zajímavých novinek a vydání. Ale myslím, že jsem zatím natrhál dostatek čerstvého ovoce z kvetoucí Vue zahrady. Uvidíme se příští měsíc s další dávkou.
