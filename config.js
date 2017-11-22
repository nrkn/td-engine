const Config = () => {
  const scale = 50
  const unit = 0.5
  const halfUnit = 0.5 * unit
  const quarterUnit = 0.25 * unit
  const eigthUnit = 0.125 * unit
  const outline = 0.025
  const boardSize = [ 10, 15 ]

  return { scale, unit, halfUnit, quarterUnit, eigthUnit, outline, boardSize }
}

export { Config }
