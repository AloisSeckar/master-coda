// SEO META TAGS

export type MetaDef = {
  type?: 'website' | 'article',
  url?: string,
  title?: string,
  dscr?: string
}

// ARTICLES

export type Article = {
  id: string,
  cat: string,
  title: string,
  dscr: string,
  tags: string[],
  created: string,
  edited?: string,
  wip?: boolean
}

export type ArticleLink = {
  date: string,
  link: string,
  title: string,
  dscr: string,
  external: boolean
}

// FUN IMAGES

export type Fun = {
  id: string,
  title: string,
  explain?: string,
  added: string,
}

// EXTERNAL NEWS
// fetched from alois-seckar.cz

export type NewsItem = {
  date: string,
  title: string,
  link: string,
  dscr: string,
  external: boolean
}

export type Last5News = {
  item1: NewsItem,
  item2: NewsItem,
  item3: NewsItem,
  item4: NewsItem,
  item5: NewsItem,
}
