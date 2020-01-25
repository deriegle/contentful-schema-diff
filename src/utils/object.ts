import * as util from 'util'

export function dump(obj: object): string {
  return util.inspect(obj, {
    depth: null,
    maxArrayLength: null,
    breakLength: 0,
  })
}
