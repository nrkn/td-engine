import { ElArg, HElement } from './types.js'
import { isElement, isNode, isTextNode } from './predicates.js'
import { createFunctionChain } from './next.js'

type NextArg = (...args: any[]) => void

const noop: NextArg = () => { }

export const handleArg = (el: HElement, arg: ElArg) =>
  handleChildArg(el, arg,
    () => handleObjectArg(el, arg)
  )

export const handleChildArg = (
  el: Node, arg: ElArg, next = noop
) => {
  if (typeof arg === 'string') arg = document.createTextNode(arg)
  if (isNode(arg)) return el.appendChild(arg)

  next()
}

const handleObjectArg = (
  el: HElement, arg: ElArg
) => {
  // arg cannot be string by this point but ts doesn't know that, hence cast
  for (const key in arg as any) {
    chain.handle(el, key, arg[key])
  }
}

export const textFromArg = (arg: ElArg) =>
  typeof arg === 'string' ?
    arg :
    typeof arg === 'number' ?
      String(arg) :
      isTextNode(arg) ?
        arg.data :
        isElement(arg) && arg.textContent ?
          arg.textContent :
          ''

const handleEvent = (
  el: HElement, key: string, value: any, next: NextArg
) =>
  typeof value === 'function' ? el.addEventListener(key, value) : next()

const handleStyle = (
  el: HElement, key: string, value: any, next: NextArg
) =>
  key === 'style' ?
    typeof value === 'string' ?
      el.setAttribute('style', value) :
      Object.assign(el.style, value) :
    next()

const handleDataset = (
  el: HElement, key: string, value: any, next: NextArg
) =>
  key === 'data' ?
    Object.keys(value).forEach(key => el.dataset[key] = String(value[key])) :
    next()

const handleAttribute = (
  el: HElement, key: string, value: any
) => {
  if (value === true) {
    el.setAttribute(key, '')

    return
  }

  if (value === undefined || value === null || value === false) {
    el.removeAttribute(key)

    return
  }

  if (Array.isArray(value)) {
    el.setAttribute(key, value.join(' '))

    return
  }

  el.setAttribute(key, String(value))
}


//

const chain = createFunctionChain()

chain.registerHandler(handleEvent)
chain.registerHandler(handleStyle)
chain.registerHandler(handleDataset)
chain.registerHandler(handleAttribute)

