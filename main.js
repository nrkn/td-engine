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
    { x: 2.5, y: 1.75 }
  ]

  for( let i = 0; i < 10; i++ ){
    const creep = Creep()

    creep.location = 0 - i * config.unit * 2

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
