export function useAsset (path: string): string {
  const assets = import.meta.glob<string>('~/assets/img/**/*', {
    eager: true,
    import: 'default'
  })
  return assets['/assets/' + path] || assets['/assets/img/not-found.webp']!
}
