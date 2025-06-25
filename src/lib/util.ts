// type Tuple4<A = number, B = A, C = A, D = A> = [A, B, C, D]

// // center the child element within the parent element
// // maintain aspect ratio of the child element when scaling to fit parent
// // return x,y,w,h
// export const objectFit = (
//   parentWidth: number, parentHeight: number,
//   childWidth: number, childHeight: number
// ): Tuple4 => {
//   const parentAspect = parentWidth / parentHeight
//   const childAspect = childWidth / childHeight

//   let x = 0, y = 0, w = childWidth, h = childHeight

//   if (childAspect > parentAspect) {
//     // child is wider than parent
//     w = parentWidth
//     h = w / childAspect
//     y = (parentHeight - h) / 2
//   } else {
//     // child is taller than parent or aspect ratios are equal
//     h = parentHeight
//     w = h * childAspect
//     x = (parentWidth - w) / 2
//   }

//   return [x, y, w, h]
// }

// export const objectFitScale = (
//   parentWidth: number, parentHeight: number,
//   childWidth: number, childHeight: number
// ): number => {
//   const parentAspect = parentWidth / parentHeight
//   const childAspect = childWidth / childHeight

//   if (childAspect > parentAspect) {
//     // child is wider than parent
//     return parentWidth / childWidth
//   } else {
//     // child is taller than parent or aspect ratios are equal
//     return parentHeight / childHeight
//   }
// }

type Fit = {
  x: number
  y: number
  w: number
  h: number
  scale: number
}

export const objectFit = (
  parentWidth: number, parentHeight: number,
  childWidth: number, childHeight: number
): Fit => {
  const parentAspect = parentWidth / parentHeight
  const childAspect = childWidth / childHeight

  let x = 0, y = 0, w = childWidth, h = childHeight, scale = 1

  if (childAspect > parentAspect) {
    // child is wider than parent
    w = parentWidth
    h = w / childAspect
    y = (parentHeight - h) / 2
    scale = parentWidth / childWidth
  } else {
    // child is taller than parent or aspect ratios are equal
    h = parentHeight
    w = h * childAspect
    x = (parentWidth - w) / 2
    scale = parentHeight / childHeight
  }

  return { x, y, w, h, scale }
}