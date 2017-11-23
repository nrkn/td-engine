const Tower = () => {
  const tower = {
    cost: 10,
    sell: 5,
    level: 1,
    facing: 0,
    range: 1.05,
    point: { x: 0, y: 0 },
    damage: 1,
    coolDown: {
      max: 250,
      current: 0
    },
    target: null
  }

  return tower
}

export { Tower }
