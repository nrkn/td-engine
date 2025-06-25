const svgns = 'http://www.w3.org/2000/svg'

const createElement = ( name, attributes = {} ) => {
  const el = document.createElementNS( svgns, name )

  Object.keys( attributes ).forEach( name => {
    const value = attributes[ name ]

    el.setAttributeNS( null, name, value )
  })

  return el
}

const Svg = ( width, height, scale ) => {
  const viewBox = `0 0 ${ width } ${ height }`

  width *= scale
  height *= scale

  const svg = createElement( 'svg', { width, height, viewBox })

  return svg
}

const Path = ( points, stroke, strokeWidth ) => {
  points = points.map( pair => `${ pair[ 0 ] },${ pair[ 1 ] }` ).join( ' ' )

  const fill = 'transparent'

  const path = createElement( 'polyline', {
    points, fill, stroke,
    'stroke-width': strokeWidth,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  })

  return path
}

const Square = ( size, stroke, fill, strokeWidth ) => {
  const width = size
  const height = size

  const square = createElement( 'rect', {
    width, height, fill, stroke,
    'stroke-width': strokeWidth
  })

  return square
}

const Rect = ( width, height, stroke, fill, strokeWidth ) => {
  const rect = createElement( 'rect', {
    width, height, stroke, fill,
    'stroke-width': strokeWidth
  })

  return rect
}

const Line = ( x1, y1, x2, y2, stroke, strokeWidth ) => {
  const line = createElement( 'line', {
    x1, y1, x2, y2, stroke,
    'stroke-width': strokeWidth
  })

  return line
}

const Circle = ( cx, cy, r, stroke, fill, strokeWidth ) => {
  const circle = createElement( 'circle', {
    cx, cy, r, stroke, fill,
    'stroke-width': strokeWidth
  })

  return circle
}

const transform = ( el, obj ) => {
  const transforms = Object.keys( obj ).map( key => {
    return `${ key }(${ obj[ key ].join( ' ' ) })`
  })

  el.setAttributeNS( null, 'transform', transforms.join( ' ' ) )
}

export { createElement, Svg, Path, Square, Rect, Line, Circle, transform }
