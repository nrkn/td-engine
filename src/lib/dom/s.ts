import { handleArg } from './args.js'
import { svgNs } from './const.js'
import { S } from './types.js'

export const s: S = (tagName, ...args ) => {
  const element = document.createElementNS( svgNs, tagName )

  for (const arg of args) handleArg(element, arg)

  return element
}
