import { Creep } from './creep.js'
import { Tower } from './tower.js'

const startTowers = [
  { x: 5, y: 3 },
  { x: 5, y: 7 },
  { x: 5, y: 11 }
]

const Level = config => {
  const { unit, halfUnit } = config

  const level = {
    money: 50,
    lives: 10,
    path: [
      [ 1, 1 ],
      [ 9, 3 ],
      [ 2, 5 ],
      [ 8, 7 ],
      [ 3, 9 ],
      [ 7, 11 ],
      [ 5, 13 ],
      [ 5, 14 ]
    ],
    creeps: [],
    towers: [],
    projectiles: []
  }

  for( let i = 0; i < 100; i++ ){
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
