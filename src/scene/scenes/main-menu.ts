import { h1, ul, li, a } from '../../lib/dom/index.js'
import { emptyExcept, fragment } from '../../lib/dom/util.js'
import { Scene } from '../../types.js'

export const mainMenuScene: Scene = {
  start: async () => {
    console.debug('Starting main menu scene...')

    const view = fragment(
      h1('TD Engine'),
      ul(
        li(a({ href: '#make' }, 'Make')),
        li(a({ href: '#play' }, 'Play'))
      )
    )

    document.body.append(view)
  },
  stop: async () => {
    console.debug('Stopping main menu scene...')

    emptyExcept(document.body, 'script')
  }
}
