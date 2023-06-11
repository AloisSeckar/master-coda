export const CODA_TITLE = 'Master Coda - The Light Side of the Code'
export const CODA_DSCR = 'Nepravidelný blog o programování'

export function usePageMeta (title: string, description: string) {
  return useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: 'https://master-coda.netlify.app/master-coda.png',
    twitterCard: 'summary_large_image'
  })
}
