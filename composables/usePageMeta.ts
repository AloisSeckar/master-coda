export const CODA_TYPE = 'website'
export const CODA_URL = 'https://master-coda.cz'
export const CODA_TITLE = 'Master Coda - The Light Side of the Code'
export const CODA_DSCR = 'Nepravidelný blog o programování'

export const CODA_PAGE_META: MetaDef = {
  type: CODA_TYPE,
  url: CODA_URL,
  title: CODA_TITLE,
  dscr: CODA_DSCR
}

export function usePageMeta (meta: MetaDef) {
  return useSeoMeta({
    title: meta?.title || CODA_TITLE,
    description: meta?.dscr || CODA_DSCR,
    ogType: meta?.type || CODA_TYPE,
    ogUrl: meta?.url || CODA_URL,
    ogTitle: meta?.title || CODA_TITLE,
    ogDescription: meta?.dscr || CODA_DSCR,
    ogImage: 'https://master-coda.cz/master-coda.png',
    twitterCard: 'summary_large_image'
  })
}
