import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      source: 'article/*',
      type: 'page',
      schema: z.object({
        file: z.string(),
        cat: z.string(),
        title: z.string(),
        dscr: z.string(),
        tags: z.array(z.string()),
        date: z.date(),
        created: z.string().regex(/\d{2}\.\d{2}\.\d{4}/),
        edited: z.string().regex(/\d{2}\.\d{2}\.\d{4}/).optional(),
        english: z.string().optional(),
        wip: z.boolean().optional(),
        unchecked: z.boolean().optional(),
        hidden: z.boolean().optional(),
      }),
    }),
  },
})
