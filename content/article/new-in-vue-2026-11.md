---
file: 'new-in-vue-2026-11'
cat: 'web'
title: 'New in Vue - Listopad 2026'
dscr: 'Novinky ze světa Vue.js, Nuxt a Vite za léto a podzim 2026'
tags: ['Vue.js', 'Nuxt', 'Vite', 'Vitest', 'newsletter', 'web', 'JavaScript', 'novinka']
date: '2026-11-14'
created: '14.11.2026'
edited: '14.11.2026'
english: 'https://dev.to/aloisseckar/new-in-vue-november-2026-4l2m'
---

Je to už nějaký čas, co jsem [vydal](https://dev.to/aloisseckar/new-in-vue-june-2026-28p) poslední várku novinek o Vue, Nuxtu, Vite a spol. Řekněme, že léto a podzim byly co se novinek týká mírně aktivní. Vyšla řada aktualizací a nespočet drobných vylepšení, ale (potenciálně) přelomové releasy jako Vue 3.6, Nitro v3 nebo Nuxt 5 jsou stále někde za horizontem. Pojďme se podívat, co máme.

![New Vue newsletter launched](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/csywjp8b1lrbu95xywgi.png)

---

Cesta k **Vue 3.6** s [Vapor Mode](https://dev.to/parsajiravand/what-is-vue-3-vapor-mode-3k2o) ještě není u konce, ale už snad opravdu míří do cíle. Po sedmnácté a poslední beta verzi, která vyšla v červnu, se od července objevují verze release candidate (RC). **RC.15** vyšla 12. listopadu. [Changelog](https://github.com/vuejs/core/blob/minor/CHANGELOG.md) ukazuje především intenzivní práci na Vapor funkcionalitě. Tým chce mít jistotu, že je vše co nejstabilnější a nejspolehlivější, než konečně dojde na očekávané oficiální vydání Vue 3.6. Mezitím je poslední dostupnou patch verzí v produkční větvi [**v3.5.45**](https://github.com/vuejs/core/releases/tag/v3.5.45).

Framework **Nuxt** zaznamenal od mého posledního souhrnu dva minor releasy. Verze **4.5** z července přešla na [**Vite 8**](https://vite.dev/blog/announcing-vite8), přinesla streamování SSR pro rychlejší [TTFB](https://www.debugbear.com/docs/metrics/time-to-first-byte), zavedla standardizovanou sadu chybových kódů pro snazší ladění a přidala composable `useLayout`. Všechny podrobnosti najdete [v tomto blogu](https://nuxt.com/blog/v4-5). Verze **4.6** následovala v říjnu. Dostala přepracované CLI, možnost importovat funkce pro Nitro z aliasu `nuxt/server`, popisnější chybová hlášení a spoustu dalších vychytávek, které najdete [v souhrnu vydání](https://nuxt.com/blog/v4-6). K dnešnímu dni je posledním dostupným vydáním [**v4.6.4**](https://github.com/nuxt/nuxt/releases/tag/v4.6.4).

Mezitím po dodatečném šestiměsíčním prodloužení definitivně skončila podpora pro Nuxt v3. Úplně poslední vydaný patch byl **3.21.11** z 5. srpna. A už teď je u něj [nahlášeno](https://npmx.dev/package/nuxt/v/3.21.11) několik zranitelností, takže pokud jste ještě nepřešli na v4, velmi doporučuji to udělat co nejdříve. V době, kdy se hledání zranitelností začíná orchestrovat pomocí AI, si zastaralý software nemůžete dovolit dlouho...

**Vite** vydává aktualizace pravidelně. Nejnovější dostupnou verzí je už [**v8.3.8**](https://github.com/vitejs/vite/releases/tag/v8.3.8). Mezitím jsou aktivně udržovány i větve 8.2.x, 8.1.x, 7.3.x a dokonce 6.4.x. A dnes už je k dispozici mnohem víc než jen samotný Vite. Sjednocený toolchain postavený na Rustu, který se nad ním nadstavuje a říká si **Vite+**, dozrál natolik, že byl koncem září [oficiálně vydán](https://voidzero.dev/posts/announcing-vite-plus-1-0). Osobně jsem ještě nenašel odvahu ani čas vyzkoušet jeho možnosti v praxi a stále si vystačím se svým „starým“ způsobem práce, ale pokud se chystáte začít něco nového, proč nevyužít sílu jediného příkazu `vp`, který slibuje zvládnout všechno, co JS/TS vývojář může potřebovat? Nebo pokud jste to už zkusili, jaká byla vaše zkušenost?

Ať tak či onak, když něco vyvineme, chceme to testovat. Když přijde na Vue.js a jeho přátele, pravděpodobně je vaše první volba **Vitest**. Nedávno prošel velkou aktualizací do [verze 5](https://vitest.dev/blog/vitest-5.html) - je teď mnohem rychlejší (jako by nebyl dost rychlý už předtím) a nabízí spoustu nových funkcí. A protože ekosystém nikdy nespí, už je tu [**v5.1.0**](https://github.com/vitest-dev/vitest/releases/tag/v5.1.0), která nabízí ještě víc.

Když už mluvíme o testování, rád bych si dnes udělal malou osobní reklamu - dávám dohromady plug'n'play řešení pro testování aplikací v Nuxtu. Je to základní [layer](https://nuxt.com/docs/4.x/getting-started/layers), který obsahuje Nuxt, Vitest, Playwright a hromadu spojovacího kódu, aby tvořila kompletní testovací sestava, kterou můžete hned začít používat. Dodává se s CLI, které ji umí napojit do vaší stávající Nuxt aplikace nebo také vytvořit z ničeho úplně novou. Také vyrábí ukázkové testy pro všechny běžné způsoby testování. Říkám tomu **Nuxt Spec** a pokud se chcete dozvědět víc, dokumentace je k dispozici [ZDE](https://nuxt-spec.netlify.app/).

Než dnešní díl uzavřu, tady je ještě pár dalších stručných novinek:

- Knihovna **Nuxt UI** se dál vyvíjí a nejnovější je [**v4.12.0**](https://github.com/nuxt/ui/releases/tag/v4.12.0)
- Knihovna pro správu stavu **Pinia** [dosáhla verze 4](https://github.com/vuejs/pinia/releases/tag/v4.0.0)
- Modul **Nuxt Fonts** [se stal stabilním](https://github.com/nuxt/fonts/releases/tag/v1.0.0)
- Nástroj **Nuxt DevTools** byl [aktualizován na v4](https://nuxt.com/blog/devtools-v4)

To je dnes vše. Doufám, že zvládnu i prosincové vydání, ve kterém vám popřeji veselé Vánoce a šťastný Nový rok se všemi skvělými novými nástroji ekosystému Vue.js.
