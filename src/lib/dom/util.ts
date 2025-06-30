import { handleChildArg, textFromArg } from './args.js'
import { isElement } from './predicates.js'
import { ElArg, HElement } from './types.js'

export const text = (...args: ElArg[]) => {
  let data = ''

  args.forEach(arg => data += textFromArg(arg))

  return document.createTextNode(data)
}

export const fragment = (...args: ElArg[]) => {
  const documentFragment = document.createDocumentFragment()

  args.forEach(arg => handleChildArg(documentFragment, arg))

  return documentFragment
}

export const emptyExcept = (el: HElement, ...except: string[]) => {
  const whitelist = new Set(except.map(e => e.toLowerCase()))

  const children = Array.from(el.childNodes)

  for (const child of children) {
    if (isElement(child) && whitelist.has(child.localName)) {
      continue
    }

    child.remove()
  }
}
