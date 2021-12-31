export function unfreeze(object: Object | any[]): any {
  return JSON.parse(JSON.stringify(object))
}
