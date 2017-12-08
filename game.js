import {
  Length, PolyLine, Angle, currentPoint, currentFacing, moveTowards
} from './geometry.js'

import { Projectile } from './projectile.js'

const closestTarget = ( from, targets, range = Infinity ) => {
  let target = null
  let min = Infinity

  targets.forEach( current => {
    if( !current.alive ) return
    if( !current.point ) return

    const currentDistance = Length(
      from.x, from.y,
      current.point.x, current.point.y
    )

    if( currentDistance > range ) return

    if( currentDistance < min ){
      min = currentDistance
      target = current
    }
  })

  return target
}

const Game = ( level, config ) => {
  let totalTicks = 0

  const lines = PolyLine( level.path )

  let actions = [
    [ 'clear' ],
    [ 'updateLives', level.lives ],
    [ 'addPath', level.path ]
  ]

  const userActions = []

  const killCreep = creep => {
    creep.alive = false
    actions.push([ 'removeCreep', creep ])
  }

  const killProjectile = projectile => {
    projectile.alive = false
    actions.push([ 'removeProjectile', projectile ])
  }

  const updateCreep = creep => {
    if( !creep.alive ) return

    creep.location += creep.speed

    if( creep.location > lines[ lines.length - 1 ].end ){
      level.lives -= 1

      actions.push([ 'updateLives', level.lives ])

      killCreep( creep )

      if( level.lives < 1 )
        actions.push([ 'gameOver' ])

      return
    }

    if( creep.location >= 0 ){
      creep.point = currentPoint( lines, creep.location )
      creep.facing = currentFacing( lines, creep.location )
    }
  }

  const updateTower = tower => {
    if( tower.target !== null && !tower.target.alive ){
      tower.target = null
    }

    if( tower.target !== null ){
      const targetDistance = Length(
        tower.point.x, tower.point.y,
        tower.target.point.x, tower.target.point.y
      )

      if( targetDistance > tower.range ){
        tower.target = null
      }
    }

    if( tower.target === null || !tower.target.alive ){
      tower.target = closestTarget( tower.point, level.creeps, tower.range )
    }

    if( tower.target !== null ){
      const angle = Angle(
        tower.point.x, tower.point.y,
        tower.target.point.x, tower.target.point.y
      )

      if( tower.facing !== angle ){
        tower.facing = angle
      }

      if( tower.coolDown.current === 0 ){
        const projectile = Projectile()

        projectile.facing = tower.facing
        projectile.point = tower.point
        projectile.damage = tower.damage

        level.projectiles.push( projectile )

        actions.push([ 'addProjectile', projectile ])

        tower.coolDown.current = tower.coolDown.max
      }
    }

    if( tower.coolDown.current > 0 ){
      tower.coolDown.current--
    }
  }

  const updateProjectile = projectile => {
    if( !projectile.alive ) return

    const target = closestTarget( projectile.point, level.creeps, config.halfUnit )

    if( target !== null ){
      target.hp.current -= projectile.damage

      if( target.hp.current <= 0 ){
        killCreep( target )

        level.money += target.reward
      }

      killProjectile( projectile )
    }

    projectile.point = moveTowards(
      projectile.point.x, projectile.point.y,
      projectile.facing, projectile.speed
    )

    const outOfBounds =
      projectile.point.x < 0 || projectile.point.y < 0 ||
      projectile.point.x > config.boardSize[ 0 ] ||
      projectile.point.y > config.boardSize[ 1 ]

    if( outOfBounds ){
      killProjectile( projectile )
    }
  }

  const tick = ticks => {
    for( let i = 0; i < ticks; i++ ){
      const currentTick = totalTicks + i

      if( userActions[ currentTick ] ){
        const userAction = userActions[ currentTick ]
        const type = userAction[ 0 ]

        if( type === 'addTower' ){
          level.towers.push( userAction[ 1 ] )
          actions.push( userAction )
        }
      }

      level.projectiles.forEach( updateProjectile )
      level.creeps.forEach( updateCreep )
      level.towers.forEach( updateTower )

      totalTicks++
    }

    level.projectiles.forEach( projectile => {
      if( !projectile.alive ) return

      actions.push([ 'updateProjectile', projectile ])
    })

    level.creeps.forEach( creep => {
      if( !creep.alive ) return

      actions.push([ 'updateCreep', creep ])
    })

    level.towers.forEach( tower => {
      actions.push([ 'updateTower', tower ])
    })

    const arr = actions.slice()

    actions.length = 0

    return arr
  }

  level.creeps.forEach( creep => {
    creep.point = currentPoint( lines, creep.location )
    actions.push([ 'addCreep', creep ])
  })

  level.towers.forEach( tower => {
    actions.push([ 'addTower', tower ])
  })

  const buyTower = tower => {
    if( level.money < tower.cost ) return false

    level.money -= tower.cost

    let index = totalTicks
    while( userActions[ index ] ){
      index++
    }
    userActions[ index ] = [ 'addTower', tower ]

    return true
  }

  const game = { tick, buyTower }

  return game
}

export { Game }
