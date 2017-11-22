const Tower = () => {
  const tower = {
    facing: 0,
    range: 1.5,
    point: { x: 0, y: 0 },
    damage: 1,
    coolDown: {
      max: 500,
      current: 0
    },
    target: null
  }

  return tower
}

export { Tower }
