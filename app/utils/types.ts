// SEO META TAGS

export type MetaDef = {
  type?: 'website' | 'article'
  url?: string
  title?: string
  dscr?: string
}

// ARTICLES

// TODO how to infer this type from content collection definition
export type Article = {
  file: string
  cat: string
  title: string
  dscr: string
  tags: string[]
  created: string
  edited?: string
  english?: string
  wip?: boolean
  unchecked?: boolean
  hidden?: boolean
}

export type ArticleLink = {
  date: string
  link: string
  title: string
  dscr: string
  external: boolean
}

export type ArticleSeries = {
  title: string
  dscr: string
  linkTitle: string
  linkURL: string
  match: string
}

// FUN IMAGES

export type Fun = {
  id: string
  title: string
  explain?: string
  added: string
}

// EXTERNAL NEWS
// fetched from alois-seckar.cz

export type NewsItem = {
  date: string
  title: string
  link: string
  dscr: string
  external: boolean
}

export type Last5News = {
  item1: NewsItem
  item2: NewsItem
  item3: NewsItem
  item4: NewsItem
  item5: NewsItem
}
