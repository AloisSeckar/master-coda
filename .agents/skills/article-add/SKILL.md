---
name: article-add
description: 'Add one or more articles, releases, or announcements as new entries to CodaDigest.md (IT list) or AINews.md (AI list) in master-coda. Use when the user provides URLs to add to the interesting IT or AI articles digest.'
argument-hint: '<IT|AI> <url> [<url> ...]'
---

# Add Articles to CodaDigest.md / AINews.md

Input: a list selector followed by one or more URLs (`/article-add <IT|AI> <url1> <url2> ...`).
Each URL becomes one table row in the selected file.

| First argument | Target file |
| --- | --- |
| `IT` | [CodaDigest.md](../../../CodaDigest.md) |
| `AI` | [AINews.md](../../../AINews.md) |

- The first argument is case-insensitive. If it is missing or is neither `IT` nor `AI` (for example, the user passes only URLs), ask which list to use. Do not guess.
- Only edit the selected file. Do not create other files or notes.
- Both files share the same row format and rules below. The only differences are noted in the Placement section.

## Entry format

```
| **`YYYY-MM-DD`** | [Article Title](URL) - short description with **bold** key terms |
```

- Title: the article's own title. Shorten only if it is very long or clickbaity.
- Description: one sentence, after ` - `, in a neutral informative tone. No emojis, no marketing wording,
  no opinions of your own. Say what the article announces or explains.
- Bold (`**...**`) the key product, project, release, or version, e.g. `**Rust**`, `**React**`, `**Maven**`.
  Use backticks for code identifiers, e.g. `` `HttpClient` ``.
- Use the original article URL exactly as the user gave it (do not add tracking parameters or rewrite it).

## Workflow

1. Fetch all URLs in parallel. Ask for the title, publication date, author, and a content summary.
2. Determine the date of each article (see below). Never guess it.
3. Read the current year sections of the selected file (`CodaDigest.md` or `AINews.md`) **after** fetching. The user edits the file by hand (shortening descriptions, fixing typos), so always work from the current content, not from memory.
4. Insert the rows (see placement below) with a single edit per file where possible.
5. Report briefly: one line per article with its date and the section it went to, plus any caveat.

## Determining the date

Use the real publication date, in this order of preference:

- The byline or date shown on the page. The date in the URL may be wrong or only approximate.
- GitHub release pages show relative dates ("2 weeks ago"). Fetch
  `https://api.github.com/repos/<owner>/<repo>/releases/tags/<tag>` and use `published_at`.
- Mailing-list announcements (mail-archive.com): use the date in the message header.
- For Anthropic launch pages (e.g. `anthropic.com/claude-...`): use the dated entry on <https://www.anthropic.com/news>. Research posts (`/research/...`) show "Published <date>" in the text.
- For OpenAI pages (`openai.com/index/...`) that show no date in the text: use the dated card on <https://openai.com/news/>.
- If the date cannot be determined, ask the user. Do not invent one. If the user supplies it later, add the entry then.

## Placement

- Entries are grouped in `## YYYY` sections, newest section first, each with the same table header in both files:

  ```
  ## 2026

  | Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Article |
  | --- | :-- |
  ```

- Put each entry into the section of its own year, which is not necessarily the current one
  (for example, a late December article added in January goes to the previous year).
- If the year section does not exist yet, create it directly above the newest existing year section, copying the header above.
- `CodaDigest.md` only: everything older than 2024 is collected in a single `## < 2024` section at the very bottom, above the closing
  `---` and the "this list is being maintained since" footer line. Do not create per-year sections below 2024.
- `AINews.md` only: the list is maintained since 11/2026, so there is no `## < 2024` section. It has an extra "Sources" section
  above the year sections; leave it untouched and keep year sections below it and above the closing `---` footer.
  If an article is older than the maintained-since date, still add it to its year section, but mention it in the report.
  A year section may exist with an empty table (header only); add rows directly below the header.
- Within a section, order rows by date, newest first. For equal dates, add the new row next to the existing rows of that date.
- The file may already contain a few out-of-order rows. Do not reorder or reformat existing rows.
- There are no yearly archive files (e.g. `CodaDigest2025.md`) at this time.

## Safe editing

- Match the existing text exactly in the old-string of the edit, and copy every unchanged row verbatim into the new string.
  After the edit, check that no existing row changed (for example, by grepping a neighbouring row). Past mistake:
  rewording in an unrelated row. Fix such slips immediately.
- Do not add a row for a URL that is already in the selected file. Tell the user instead.

## When a page cannot be read

- Cookie walls and long boilerplate are normal. Look for the article body, byline, and date in the fetched text.
- If a fetch redirects to an unrelated (ad or tracking) domain, do not follow it. Retry once, then try one alternative
  source (the project's own site or API). If the content is still unavailable, say so.
- Without readable content, write the description only from what is verifiable (for example, the title) and tell the user.
  If the date is also unknown, ask for it before adding the row.
