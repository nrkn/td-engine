import { ElArg, H } from './types.js'
import { handleArg } from './args.js'

export const h: H = (tagName: string, ...args: ElArg[]) => {
  const element = document.createElement(tagName)

  for (const arg of args) handleArg(element, arg)

  return element
}
