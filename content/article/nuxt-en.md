---
file: 'nuxt'
cat: 'web'
title: 'Nuxt Tutorial'
dscr: 'Introduction to the tool that is currently my best choice for web development'
tags: ['web', 'JavaScript', 'Vue.js', 'Nuxt', 'tips']
date: '2024-03-25'
created: '25.03.2024'
edited: '05.05.2024'
---

Let me show you [Nuxt](https://nuxt.com/). A tool that makes web development a breeze. You need very little to have a ready application, which you can also deploy with just a few more clicks. Especially smaller projects that don't require too much additional functionality are written in it completely smoothly. At the same time, it offers plenty of options to go deeper and create sophisticated web applications.

In the following series of articles, we will gradually look at it in more detail.

## What is it about?

**Nuxt** is a framework for creating web applications in (predominantly) JavaScript, or TypeScript. It is built on top of [Vue.js](https://vuejs.org/), which is "the third one in the back" in the family of large and popular JavaScript frameworks (along with [React](https://react.dev/) and [Angular](https://angular.io/)). Unlike the mentioned two, it is not backed by a large tech company, but purely by an open-source community. A colleague who knows Angular finds programming in Vue "punk rock," but maybe that's why I've been enjoying exploring and examining its world lately.

Like other tools of similar type, it abstracts the developer from the need to constantly repeat boring and repetitive basic tasks and helps them focus on important functional and content matters. Nuxt goes even further than pure Vue.js, and many things that you would otherwise have to write manually, you can handle just by placing a file in the correct format into the designated directory.

This website is also written in it, for example.

## What do you need?

All you need is the latest LTS version of [Node.js](https://nodejs.org/) on the computer where you want to develop. The resulting application can also run in a Node.js environment, but it's not strictly necessary – Nuxt allows you to create output as static JavaScript that can be run in any modern browser. While you'll lose some features this way, simple static web hosting is sufficient for operation. On the other hand, in today's era of cloud services and containers, the "dynamic" variant is no longer a big problem either.

Other prerequisites include some knowledge of HTML, CSS, and JavaScript. Ideally, at least a passing knowledge of TypeScript is also good. The Vue.js and Nuxt developers themselves repeat everywhere that they don't force anyone into TS, but from my own experience, I say it's a big step forward and it's worth sacrificing some time learning and exploring dead ends.

To program comfortably, it's good to have some IDE. For JavaScript development, [VS Code](https://code.visualstudio.com/) is probably the best choice – it's designed for it, it's good, it's free, it has many plugins, and people from the Vue.js world also work in it most often.

For installing and managing JavaScript dependencies in a Node.js environment, you need a package manager – just like JS frameworks, there are primarily three options: `npm`, `pnpm`, and `yarn`. For a long time, I got by with `npm`, which came first and the current JavaScript world is largely built around it. However, the more advanced `pnpm` has one big advantage – using symlinks to a single central directory, it deduplicates dependencies from different projects, which otherwise get downloaded into local `node_modules` over and over again, taking up entire gigabytes on disk. Another minor advantage is that scripts defined in `package.json` can be run directly as `pnpm script` (in npm it's `npm run script`). I've never tried `yarn`, although I know many people prefer and recommend it. The choice is yours, the general principles are the same for all, and at the core, it's just about what the command syntax will be.

_Last but not least_, you need `Git` for managing and versioning source code. For smaller test projects, you might get by without it, but for developing anything larger, it's almost a necessity. If you prefer other version control systems, you'll have to figure something out – I once started with SVN at work, but I wouldn't want to go back to it.

## How to get started?

Guides, tips, and tricks will be added here. You can access individual chapters using the links in the box below.

For now, you can check out my gradually growing repository with demo projects (in English): [demos-nuxt @ GitHub](https://github.com/AloisSeckar/demos-nuxt). It assumes the use of `Git` and `pnpm`.

Then, of course, there are the official resources:
- [Nuxt documentation](https://nuxt.com/docs)
- [Nuxt forum](https://github.com/nuxt/nuxt/discussions)

I haven't found much in Czech yet, which is why I started writing these articles in 2023.

And now let's go on to the [first minimal project created using the Nuxt framework](/article/nuxt-simple).
