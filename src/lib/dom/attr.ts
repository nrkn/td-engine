import { handleArg } from './args.js'
import { ElAttr, HElement } from './types.js'

export const attr = <T extends HElement>(el: T, ...args: ElAttr[]) => {
  for (const arg of args)
    handleArg(el, arg)

  return el
}
