export type Fit = {
  // offset from parent x
  x: number
  // offset from parent y
  y: number
  // fitted width, matching aspect ratio of original child
  width: number
  // fitted height, matching aspect ratio of original child
  height: number
  // scale from original child to fitted
  scale: number
}

export type Orientation = 'portrait' | 'landscape'

export type Maybe<T> = T | null | undefined
