import { IContentType } from './model'

export function indexById(
  types: IContentType[],
): { [id: string]: IContentType } {
  const ret: any = {}
  types.forEach((type) => {
    ret[type.sys.id] = type
  })
  return ret
}

export function indexByContentType<T>(items: T[]): { [id: string]: T } {
  const ret: any = {}
  items.forEach((item: any) => {
    ret[item.sys.contentType.sys.id] = item
  })
  return ret
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })
}

export async function eachInSequence<T, U>(
  items: T[],
  op: (item: T, index?: number, items?: T[]) => Promise<U>,
): Promise<U[]> {
  const ret: U[] = []
  for (let i = 0; i < items.length; i++) {
    ret.push(await op(items[i], i, items))
  }
  return ret
}
