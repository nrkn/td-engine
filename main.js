import { Config } from './config.js'
import { Level } from './level.js'
import { Creep } from './creep.js'
import { Tower } from './tower.js'
import { Client } from './svg-client.js'
import { Game } from './game.js'

const config = Config()
const client = Client( document.body, config )

let level, game, last, total
let remainder = 0

const onFrame = time => {
  if( !last ){
    last = total = time
  }

  const elapsed = time - last
  const ticks = ~~( elapsed + remainder )
  const fps = Math.round( 1000 / elapsed )

  remainder = Math.max( elapsed - ticks, ticks - elapsed )
  last = time
  total += elapsed

  while( client.userActions.length ){
    const action = client.userActions.shift()

    if( action[ 0 ] === 'addTower' ){
      const tower = Tower()
      tower.point.x = action[ 1 ]
      tower.point.y = action[ 2 ]

      game.buyTower( tower )
    }
  }

  const actions = game.tick( ticks )

  let gameOver = false

  actions.forEach( action => {
    const handled = client( ...action )

    if( !handled && action[ 0 ] === 'gameOver' ){
      gameOver = true
    }
  })

  const debugValue = {
    fps,
    money: level.money,
    lives: level.lives,
    time: ~~( total / 1000 )
  }

  client( 'updateDebug', debugValue )

  if( gameOver ){
    if( window.confirm( 'You died' ) ){
      start()
    }
  } else {
    window.requestAnimationFrame( onFrame )
  }
}

const start = () => {
  last = null
  remainder = 0
  level = Level()

  const startTowers = [
  ]

  for( let i = 0; i < 50; i++ ){
    const creep = Creep()

    creep.location = -5 - i * config.unit * 2
    creep.speed *= 1.5
    creep.hp.max *= 1.5
    creep.hp.current *= 1.5

    level.creeps.push( creep )
  }

  startTowers.forEach( point => {
    const tower = Tower()

    tower.point = point

    level.towers.push( tower )
  })

  game = Game( level, config )

  window.requestAnimationFrame( onFrame )
}

start()
