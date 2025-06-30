import { Fit } from './types.js'

export const maybe = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const assrt = <T>(
  value: T | null | undefined, message = 'Value is null or undefined'
): T => {
  if (!maybe(value)) throw Error(message)

  return value
}

export const objectFit = (
  parentWidth: number, parentHeight: number,
  childWidth: number, childHeight: number
): Fit => {
  const parentAspect = parentWidth / parentHeight
  const childAspect = childWidth / childHeight

  let x = 0
  let y = 0
  let width = childWidth
  let height = childHeight
  let scale = 1

  if (childAspect > parentAspect) {
    // child is wider than parent
    width = parentWidth
    height = width / childAspect
    y = (parentHeight - height) / 2
    scale = parentWidth / childWidth
  } else {
    // child is taller than parent or aspect ratios are equal
    height = parentHeight
    width = height * childAspect
    x = (parentWidth - width) / 2
    scale = parentHeight / childHeight
  }

  return { x, y, width, height, scale }
}

