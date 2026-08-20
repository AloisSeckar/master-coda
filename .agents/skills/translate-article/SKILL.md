---
name: translate-article
description: 'Translate an English article into Czech for publishing under content/article/. Use when the user runs "/translate <file-name>.md" or asks to translate a blog post from English to Czech.'
argument-hint: '<file-name>.md'
---

# Translate Article

Translates the body of an English article draft into Czech, following strict Markdown-preservation rules. The Czech translation is what ends up published as the site's actual article content under `content/article/`.

## When to Use

- User invokes `/translate <file-name>.md`
- User invokes `/translate-article <file-name>.md`
- User asks to translate an article / blog post from English into Czech

## Procedure

1. Resolve the target file within `content/article/<file-name>.md` folder. Fail if file cannot be found or opened.
2. Read the file and split it into:
   - The YAML frontmatter (between the first pair of `---` lines), if present.
   - The Markdown body (everything after the frontmatter, or the whole file if there's no frontmatter).
3. Translate only the **body** from English into Czech, strictly following these rules:
   - Never change the Markdown markup structure. Don't add or remove links. Do not change any URL.
   - Never change the contents of code blocks even if they appear to have a bug.
   - Always preserve the original line breaks. Do not add or remove blank lines.
   - Never change HTML-like tags or Vue component tags (e.g. `<WiseWords>`, `<ArticleImage>`).
   - Never change Nuxt Content tags (e.g. `::vue-newsletter`).
4. Save the translation into `content/article/<file-name>.md` (overwrite). Do not preserve the original.
5. If YAML frontmatter was not present, add it based on translated `content/article/<file-name>.md` content using the following template:

```yaml
---
file: '<file-name>'
cat: '<java|web|debugging|misc>'
title: '<article-title>'
dscr: '<one-sentence-description>'
tags: ['<relevant>', '<tags>', <...>]
date: 'YYYY-MM-DD'
created: 'DD.MM.YYYY'
edited: 'DD.MM.YYYY'
english: 'TBA'
unchecked: true
---
```

6. Reply with following confirmation:

```md
Translated <file-name>.md from English to Czech.

Do not forget to add the original link and check the metadata.
```
