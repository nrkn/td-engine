import { h1, ul, li, a, h2 } from '../../lib/dom/index.js'
import { emptyExcept, fragment } from '../../lib/dom/util.js'
import { Scene } from '../../types.js'

export const makeScene: Scene = {
  start: async () => {
    console.debug('Starting make scene...')

    const view = fragment(
      h1('TD Engine'),
      h2('Make'),
      ul(
        li(a({ href: '#make-new' }, 'Make New Game')),
        li(a({ href: '#make-edit' }, 'Edit a Game')),
        li(a({ href: '#main-menu' }, 'Back to Main Menu'))
      )
    )

    document.body.append(view)
  },
  stop: async () => {
    console.debug('Stopping make scene...')

    emptyExcept(document.body, 'script')
  }
}