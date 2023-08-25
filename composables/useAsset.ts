export function useAsset (path: string): string {
  const assets = import.meta.glob<string>('~/assets/**/*', {
    eager: true,
    import: 'default'
  })
  return assets['/assets/' + path]
}
