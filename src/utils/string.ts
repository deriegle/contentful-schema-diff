export function camelCase(str: string): string {
  return str.toLowerCase().replace(
    /-(.)/g,
    (_, group1) => group1.toUpperCase(),
  )
}

export function underscore(str: string): string {
  return str.replace(
    /([A-Z])/g,
    (match: string) => `_${match.toLowerCase()}`,
  )
}
