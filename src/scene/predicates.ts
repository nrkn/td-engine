import { sceneNames } from './scene-names.js'
import { SceneName } from './types.js'

export const isSceneName = (name: string): name is SceneName =>
  sceneNames.includes(name as SceneName)
