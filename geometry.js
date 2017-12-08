const Length = ( x1, y1, x2, y2 ) =>
  Math.sqrt( Math.pow( ( x1 - x2 ), 2 ) + Math.pow( ( y1 - y2 ), 2 ) )

const Vector = ( x1, y1, x2, y2 ) => {
  return {
    x: x2 - x1,
    y: y2 - y1
  }
}

const Normal = ( x, y, length ) => {
  return {
    x: x / length,
    y: y / length
  }
}

const Line = ( x1, y1, x2, y2 ) => {
  const length = Length( x1, y1, x2, y2 )
  const vector = Vector( x1, y1, x2, y2 )
  const normal = Normal( vector.x, vector.y, length )

  return { x1, y1, x2, y2, length, vector, normal }
}

/*
  where points:
  [
    [ x, y ],
    [ x, y ]
  ]
*/
const PolyLine = points => {
  const lines = []
  const length = points.length - 1

  for( let i = 0; i < length; i++ ){
    const startPoint = points[ i ]
    const endPoint = points[ i + 1 ]
    const line = Line( ...startPoint, ...endPoint )
    const start = i === 0 ? 0 : lines[ i - 1 ].end
    const end = start + line.length

    Object.assign( line, { start, end } )

    lines.push( line )
  }

  return lines
}

const Degrees = ( x, y ) => {
  const radians = Math.atan2( y, x )
  const degrees = 180 * radians / Math.PI

  return ( 360 + Math.round( degrees ) ) % 360
}

const Angle = ( x1, y1, x2, y2 ) => {
  const vector = Vector( x1, y1, x2, y2 )
  const degrees = Degrees( vector.x, vector.y )

  return degrees
}

const currentLine = ( lines, location ) =>
  lines.find( line => location >= line.start && location <= line.end )

const currentPoint = ( lines, location ) => {
  const line = currentLine( lines, location )

  if( !line ) return

  const distance = location - line.start

  const point = {
    x: ( line.normal.x * distance ) + line.x1,
    y: ( line.normal.y * distance ) + line.y1
  }

  return point
}

const currentFacing = ( lines, location ) => {
  const line = currentLine( lines, location )

  if( !line ) return

  const { x, y } = line.normal

  return Degrees( x, y )
}

const moveTowards = ( x, y, degrees, unit ) => {
  const radians = degrees * Math.PI / 180

  x += unit * Math.cos( radians )
  y += unit * Math.sin( radians )

  return { x, y }
}

const sqr = x => x * x
const dist2 = ( x1, y1, x2, y2 ) => sqr( x1 - x2 ) + sqr( y1 - y2 )
const distanceToLineSquared = ( x1, y1, x2, y2, x, y ) => {
  const l2 = dist2( x1, y1, x2, y2 )

  if( l2 === 0 ) return dist2( x, y, x1, y1 )

  let t = ( ( x - x1 ) * ( x2 - x1 ) + ( y - y1 ) * ( y2 - y1 ) ) / l2;

  t = Math.max( 0, Math.min( 1, t ) )

  return dist2( x , y, x1 + t * ( x2 - x1 ), y1 + t * ( y2 - y1 ) )
}

const DistanceToLine = ( x1, y1, x2, y2, x, y ) =>
  Math.sqrt( distanceToLineSquared( x1, y1, x2, y2, x, y ) )

export {
  Length, Line, PolyLine, Angle, currentLine, currentPoint, currentFacing,
  moveTowards, DistanceToLine
}
