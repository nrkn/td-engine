import { Config } from './config.js'
import { Level } from './level.js'
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
  level = Level( config )
  game = Game( level, config )

  window.requestAnimationFrame( onFrame )
}

start()
