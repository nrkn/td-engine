import { Creep } from './creep.js'
import { Tower } from './tower.js'

const startTowers = [
  { x: 2.5, y: 1.75 }
]

const Level = config => {
  const { unit, halfUnit } = config

  const level = {
    money: 50,
    lives: 10,
    path: [
      [ -1, 1.1875 ],
      [ 2.75, 1.1875 ],
      [ 5, 3 ],
      [ 5, 5 ],
      [ 2.66, 7 ],
      [ 0.5, 5.25 ],
      [ 1.33, 3.66 ]
    ],
    creeps: [],
    towers: [],
    projectiles: []
  }

  for( let i = 0; i < 10; i++ ){
    const creep = Creep()

    creep.location = 0 - i * unit * 2

    level.creeps.push( creep )
  }

  startTowers.forEach( point => {
    const tower = Tower()

    tower.point = point

    level.towers.push( tower )
  })

  return level
}

export { Level }
