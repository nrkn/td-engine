const Config = () => {
  const scale = 75
  const unit = 0.3
  const halfUnit = 0.5 * unit
  const quarterUnit = 0.25 * unit
  const eigthUnit = 0.125 * unit
  const outline = 0.0625 * unit
  const boardSize = [ 6, 8 ]

  return { scale, unit, halfUnit, quarterUnit, eigthUnit, outline, boardSize }
}

export { Config }
