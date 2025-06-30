import { attr } from './lib/dom/attr.js'
import { $text, circle, polyline, rect, svg } from './lib/dom/index.js'
import { objectFit } from './lib/util.js'

//

type Tuple2<A = number, B = A> = [A, B]

const testPath: Tuple2[] = [
  [-1, 1.1875],
  [2.75, 1.1875],
  [5, 3],
  [5, 5],
  [2.66, 7],
  [0.5, 5.25],
  [1.33, 3.66]
]

const testPathBounds = [0, 0, 6, 8] as const

//

const unit = 64
const doubleUnit = unit * 2
const quadUnit = unit * 4
const halfUnit = unit / 2
const quarterUnit = unit / 4
const eighthUnit = unit / 8
const outline = unit / 16

const vx = 0
const vy = 0
const vw = unit * 25
const vh = unit * 25

const viewBox = [vx, vy, vw, vh] as const

const pathBoundsSquare = [
  vx + doubleUnit, vy + doubleUnit,
  vw - quadUnit, vh - quadUnit
] as const

const testPathFit = objectFit(
  pathBoundsSquare[2], pathBoundsSquare[3],
  testPathBounds[2], testPathBounds[3]
)

const testPathX = testPathFit.x + pathBoundsSquare[0]
const testPathY = testPathFit.y + pathBoundsSquare[1]

const scaledTestPath = testPath.map(([x, y]) => {
  x *= testPathFit.scale
  y *= testPathFit.scale
  x += testPathX
  y += testPathY

  const pt: Tuple2 = [x, y]

  return pt
})

const testPathPolylinePoints = scaledTestPath
  .map(([x, y]) => `${x},${y}`).join(' ')

const rectAttr = (x: number, y: number, width: number, height: number) => ({
  x, y, width, height
})

const debugEl = $text(
  { x: halfUnit, y: unit, style: { fill: '#fed', font: `${unit}px monospace` } },
  '0x0'
)

const cursorEl = circle(
  {
    cx: -vw, cy: -vh, r: halfUnit,
    stroke: '#0f0', fill: 'rgba( 0, 255, 0, 0.25 )',
    'stroke-width': outline
  }
)

const viewport = svg(
  { id: 'viewport', viewBox, style: { backgroundColor: '#010' } },

  rect({ id: 'background', fill: '#121' }, rectAttr(...viewBox)),
  rect(
    {
      id: 'path-bounds-square',
      stroke: '#9a9', fill: 'none', 'stroke-width': outline, opacity: 0.5
    },
    rectAttr(...pathBoundsSquare)
  ),
  rect(
    {
      id: 'test-path-bounds',
      stroke: '#f99', fill: 'none', 'stroke-width': outline, opacity: 0.5,
      x: testPathX,
      y: testPathY,
      width: testPathFit.width,
      height: testPathFit.height
    }
  ),
  polyline({
    points: testPathPolylinePoints, stroke: '#666', fill: 'none',
    'stroke-width': unit, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
  }),
  debugEl,

  // last
  cursorEl
)

let iw = 0
let ih = 0
let icx = 0
let icy = 0
let orientation: 'landscape' | 'portrait' = 'landscape'

const onResize = () => {
  iw = innerWidth
  ih = innerHeight

  icx = iw / 2
  icy = ih / 2

  orientation = iw > ih ? 'landscape' : 'portrait'

  attr(viewport, { width: iw, height: ih })
}


const clientToViewport = (x: number, y: number) => {
  let vx = x - icx
  let vy = y - icy
  let scale = 1

  if (orientation === 'landscape') {
    scale = ih / viewBox[3]
  } else {
    scale = iw / viewBox[2]
  }

  vx /= scale
  vy /= scale

  vx += viewBox[0] + viewBox[2] / 2
  vy += viewBox[1] + viewBox[3] / 2

  return { x: vx, y: vy }
}

const onMouseMove = (e: MouseEvent) => {
  const { x, y } = clientToViewport(e.clientX, e.clientY)

  debugEl.textContent = `${x | 0}x${y | 0}`

  attr(cursorEl, { cx: x, cy: y })
}

export const startSandbox = () => {
  document.body.append(viewport)

  addEventListener('resize', onResize)
  viewport.addEventListener('mousemove', onMouseMove)

  onResize()
}

export const stopSandbox = () => {
  removeEventListener('resize', onResize)
  viewport.removeEventListener('mousemove', onMouseMove)

  viewport.remove()
}