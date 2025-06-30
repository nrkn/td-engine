import { game } from './game.js'
import { startSandbox } from './sandbox.js'

type Mode = 'game' | 'sandbox'

const start = (mode: Mode) => {
  if (mode === 'sandbox') {
    startSandbox()

    return
  }

  if (mode === 'game') {
    game.start()

    return
  }

  throw Error(`Unknown mode: ${mode}`)
}

//start('sandbox')
start('game')
