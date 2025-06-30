import { emptyExcept } from './lib/dom/util.js'
import { Maybe } from './lib/types.js'
import { maybe } from './lib/util.js'
import { isSceneName } from './scene/predicates.js'
import { mainMenuScene } from './scene/scenes/main-menu.js'
import { makeScene } from './scene/scenes/make.js'
import { playScene } from './scene/scenes/play.js'
import { SceneName } from './scene/types.js'
import { Scene } from './types.js'

// scene defs

const scenes: Record<SceneName, Scene> = {
  'main-menu': mainMenuScene,
  'make': makeScene,
  'play': playScene
}

// router

let currentScene: Maybe<SceneName> = null

const stopCurrent = async () => {
  if (!maybe(currentScene)) return

  await scenes[currentScene].stop()
}

const startScene = async (sceneName: SceneName) => {
  currentScene = sceneName
  await scenes[currentScene].start()

  const newHash = `#${currentScene}`

  if (location.hash !== newHash) {
    location.hash = newHash
  }
}

const navigate = async (defaultScene?: SceneName) => {
  const hash = location.hash.slice(1)

  if (isSceneName(hash)) {
    // maybe we want to reload it, but for now this is fine
    if (hash === currentScene) return

    await stopCurrent()
    await startScene(hash)

    return
  }

  if (maybe(defaultScene)) {
    console.error(
      `Invalid scene name: ${hash}. Using default scene: ${defaultScene}.`
    )

    await stopCurrent()
    await startScene(defaultScene)

    return
  }

  console.error(`Invalid scene name: ${hash}. Staying on current scene.`)
}

const onNavigate = () => navigate()

// game scene

const startGame = async () => {
  if (maybe(currentScene)) {
    console.warn('Game is already running.')

    return
  }

  // we don't know who started the game or what state they left the dom in
  emptyExcept(document.body, 'script')

  // whatever's in location.hash, or main-menu if not a valid scene name
  await navigate('main-menu')

  addEventListener('hashchange', onNavigate)
}

const stopGame = async () => {
  if (!maybe(currentScene)) {
    console.warn('Game is not running.')

    return
  }

  await stopCurrent()

  currentScene = null

  removeEventListener('hashchange', onNavigate)

  // the sub scene should do this itself, but just in case it forgot
  emptyExcept(document.body, 'script')
}

export const game: Scene = {
  start: startGame,
  stop: stopGame
}
