const Creep = () => {
  const creep = {
    facing: 0,
    location: 0,
    speed: 0.001,
    alive: true,
    hp: {
      max: 3,
      current: 3
    }
  }

  return creep
}

export { Creep }
