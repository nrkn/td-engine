const Level = config => {
  const { unit, halfUnit } = config

  const level = {
    money: 30,
    lives: 15,
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

  return level
}

export { Level }
