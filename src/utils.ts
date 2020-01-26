import { IContentType, IEditorInterface } from './model'

interface IIndexedById {
  [id: string]: IContentType
}

interface IIndexedByContentType<T> {
  [id: string]: T
}

type EachSequenceOperation<T, U> = (item: T) => Promise<U>

export function indexById(types: IContentType[]): IIndexedById {
  const ret: IIndexedById = {}

  types.forEach((type) => ret[type.sys.id] = type)

  return ret
}

export function indexByContentType(items: IEditorInterface[]): IIndexedByContentType<IEditorInterface> {
  const ret: IIndexedByContentType<IEditorInterface> = {}

  items.forEach((item: IEditorInterface) => ret[item.sys.contentType.sys.id] = item)

  return ret
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function eachInSequence<T, U>(items: T[], op: EachSequenceOperation<T, U>): Promise<U[]> {
  const ret: U[] = []

  for (const item of items) {
    ret.push(await op(item))
  }

  return ret
}
