import { h1, ul, li, a, h2 } from '../../lib/dom/index.js'
import { emptyExcept, fragment } from '../../lib/dom/util.js'
import { Scene } from '../../types.js'

export const playScene: Scene = {
  start: async () => {
    console.debug('Starting play scene...')

    // todo - load the games 

    const games = fragment(
      li(
        'There are currently no games to play. ',
        a({ href: '#make' }, 'Make one?')
      )
    )

    const view = fragment(
      h1('TD Engine'),
      h2('Play'),
      ul(
        games,
        li(a({ href: '#main-menu' }, 'Back to Main Menu'))
      )
    )

    document.body.append(view)
  },
  stop: async () => {
    console.debug('Stopping play scene...')

    emptyExcept(document.body, 'script')
  }
}