import { svgNs } from './const.js'

export const isNode = (value: any): value is Node =>
  value && typeof value.nodeType === 'number'

export const isElement = (value: any): value is Element =>
  value && value['nodeType'] === 1

export const isTextNode = (value: any): value is Text =>
  value && value['nodeType'] === 3

export const isSVGElement = (value: any): value is SVGElement =>
  isElement(value) && value.namespaceURI === svgNs

export const isHTMLOrSVGElement = (value: any): value is HTMLOrSVGElement =>
  isElement(value) && 'dataset' in value
