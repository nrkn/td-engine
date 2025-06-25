import {
  createElement, Svg, Path, Square, Rect, Line, Circle, transform
} from './svg.js'

import { Length, DistanceToLine } from './geometry.js'

const groupSymbol = Symbol( 'group' )
const creepSymbol = Symbol( 'creep' )
const hpSymbol = Symbol( 'hp' )
const gunSymbol = Symbol( 'gun' )

const Client = ( container, config ) => {
  const {
    boardSize, scale, unit, halfUnit, quarterUnit, eigthUnit, outline
  } = config
  const debug = container.querySelector( '#debug' )
  const svg = Svg( boardSize[ 0 ], boardSize[ 1 ], scale )
  const bg = Rect( boardSize[ 0 ], boardSize[ 1 ], '#111', '#111', 0 )
  const cursor = Circle( 0, 0, halfUnit, '#0f0', 'rgba( 0, 255, 0, 0.25 )', outline )

  let pathPoints = []
  let towers = []

  container.appendChild( svg )

  const offscreen = {
    translate: [ -boardSize[ 0 ], -boardSize[ 1 ] ]
  }

  const enableCursor = () => {
    cursor.setAttributeNS( null, 'stroke', '#0f0' )
    cursor.setAttributeNS( null, 'fill', 'rgba( 0, 255, 0, 0.25 )' )
  }

  const disableCursor = () => {
    cursor.setAttributeNS( null, 'stroke', '#f00' )
    cursor.setAttributeNS( null, 'fill', 'rgba( 255, 0, 0, 0.25 )' )
  }

  const canPlace = ( x, y ) => {
    if( pathPoints.length < 2 ) return false

    // distance from every line in level is > thickness of path
    for( let i = 0; i < pathPoints.length - 1; i++ ){
      const from = pathPoints[ i ]
      const to = pathPoints[ i + 1 ]
      const x1 = from[ 0 ]
      const y1 = from[ 1 ]
      const x2 = to[ 0 ]
      const y2 = to[ 1 ]

      const distance = DistanceToLine( x1, y1, x2, y2, x, y )

      if( distance < unit ) return false
    }

    let canPlace = true

    towers.forEach( tower => {
      if( !canPlace ) return

      const distance = Length( tower.point.x, tower.point.y, x, y )

      canPlace = distance > unit
    })

    return canPlace
  }

  const moveCursor = e => {
    svg.appendChild( cursor )

    const rect = svg.getBoundingClientRect()
    const x = ( e.pageX - rect.left ) / scale
    const y = ( e.pageY - rect.top ) / scale

    transform( cursor, {
      translate: [ x, y ]
    })

    if( canPlace( x, y ) ){
      enableCursor()
    } else {
      disableCursor()
    }
  }

  const click = e => {
    const rect = svg.getBoundingClientRect()
    const x = ( e.pageX - rect.left ) / scale
    const y = ( e.pageY - rect.top ) / scale

    if( canPlace( x, y ) ){
      client.userActions.push( [ 'addTower', x, y ] )
    }
  }

  const clear = () => {
    pathPoints = []
    towers = []
    client.userActions = []

    while( svg.firstChild )
      svg.removeChild( svg.firstChild )

    svg.appendChild( bg )

    svg.appendChild( cursor )
    svg.addEventListener( 'mousemove', moveCursor )
    svg.addEventListener( 'click', click )
  }

  const addPath = points => {
    pathPoints.push( ...points )

    const path = Path( points, '#666', unit )

    svg.appendChild( path )
  }

  const addCreep = creep => {
    const group = createElement( 'g', { width: unit, height: unit } )
    const square = Square( halfUnit, 'red', 'rgba( 255, 0, 0, 0.5 )', outline )
    const maxLine = Line( -quarterUnit, -halfUnit, quarterUnit, -halfUnit, '#f00', outline )
    const hpLine = Line( -quarterUnit, -halfUnit, quarterUnit, -halfUnit, '#0f0', outline )

    group.appendChild( square )
    group.appendChild( maxLine )
    group.appendChild( hpLine )

    transform( group, offscreen )

    creep[ groupSymbol ] = group
    creep[ creepSymbol ] = square
    creep[ hpSymbol ] = hpLine

    svg.appendChild( group )
  }

  const addTower = tower => {
    towers.push( tower )

    const group = createElement( 'g', { width: unit, height: unit } )
    const range = Circle( halfUnit, halfUnit, tower.range, 'rgba( 0, 255, 0, 0.5 )', 'rgba( 0, 255, 0, 0.1 )', outline )
    const circle = Circle( halfUnit, halfUnit, halfUnit, '#0f0', 'rgba( 0, 255, 0, 0.25 )', outline )
    const gun = Rect( unit, quarterUnit, '#0f0', 'rgba( 0, 255, 0, 0.25 )', outline )

    group.appendChild( range )
    group.appendChild( circle )
    group.appendChild( gun )

    const gunTransform = {
      translate: [ eigthUnit, halfUnit - eigthUnit ]
    }

    transform( gun, gunTransform )

    transform( group, {
      translate: [ tower.point.x - halfUnit, tower.point.y - halfUnit ]
    })

    tower[ groupSymbol ] = group
    tower[ gunSymbol ] = gun

    svg.appendChild( group )
  }

  const addProjectile = projectile => {
    const group = createElement( 'g', { width: unit, height: unit } )
    const bullet = Circle( halfUnit, halfUnit, outline, 'rgba( 0, 255, 0, 0.5 )', '#0f0', outline )

    group.appendChild( bullet )

    transform( group, {
      translate: [ projectile.point.x - halfUnit, projectile.point.y - halfUnit ]
    })

    projectile[ groupSymbol ] = group

    svg.appendChild( group )
  }

  const removeCreep = creep => {
    transform( creep[ groupSymbol ], offscreen )
  }

  const removeProjectile = projectile => {
    transform( projectile[ groupSymbol ], offscreen )
  }

  const updateCreep = creep => {
    const { point } = creep

    if( !point ){
      transform( creep[ groupSymbol ], offscreen )

      return
    }

    const groupTransform = {
      translate: [ point.x, point.y ]
    }

    transform( creep[ groupSymbol ], groupTransform )

    const creepTransform = {
      translate: [ -quarterUnit, -quarterUnit ],
      rotate: [ creep.facing, quarterUnit, quarterUnit ]
    }

    transform( creep[ creepSymbol ], creepTransform )

    const hp = creep.hp.current / creep.hp.max
    const hpWidth = hp * halfUnit
    const hpX2 = hpWidth - quarterUnit

    creep[ hpSymbol ].setAttributeNS( null, 'x2', hpX2 )
  }

  const updateTower = tower => {
    const groupTransform = {
      rotate: [ tower.facing, tower.point.x, tower.point.y ],
      translate: [ tower.point.x - halfUnit, tower.point.y - halfUnit ]
    }

    transform( tower[ groupSymbol ], groupTransform )
  }

  const updateProjectile = projectile => {
    const { point } = projectile

    const groupTransform = {
      translate: [ projectile.point.x - halfUnit, projectile.point.y - halfUnit ]
    }

    transform( projectile[ groupSymbol ], groupTransform )
  }

  const updateDebug = value => {
    debug.innerText = JSON.stringify( value, null, 2 )
  }

  const actions = {
    clear, addPath, addCreep, addTower, addProjectile, removeCreep,
    removeProjectile, updateCreep, updateTower, updateProjectile, updateDebug
  }

  const client = ( name, ...args ) => {
    if( name in actions ){
      actions[ name ]( ...args )

      return true
    }

    return false
  }

  client.userActions = []

  return client
}

export { Client }
