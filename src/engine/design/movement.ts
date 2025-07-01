import { PtTuple } from './types.js'

type EventType = 'move' | 'turn'

type MoveEvent = [type: EventType, durationMs: number, totalMs: number]

export const simulateMovement = (
  // svg units
  polyline: PtTuple[],
  // svg units per ms
  speed: number,
  // when moving between path segments, how long it takes to turn to face the 
  // next segment
  // ms per full turn eg 2π rads; if 0 or undefined, creep turns instantly
  msPerTurn = 0
) => {
  const events: MoveEvent[] = []

  let time = 0

  const data = polylineData(polyline)

  for (const segment of data) {
    if (segment.type === 'line') {
      // move for the length of the segment
      const duration = segment.length / speed // in ms
      time += duration
      events.push(['move', duration, time])
    } else if (segment.type === 'turn') {
      // turn for the duration of the turn
      const duration = segment.turns * msPerTurn // in ms
      time += duration
      events.push(['turn', duration, time])
    }
  }

  return events
}

type LineData = {
  type: 'line'
  // in svg units
  length: number 
  // rads - 0 is right/east
  direction: number
  // start and end point indices in the polyline
  lineIdx: [number, number] 
}

type TurnData = {
  type: 'turn'
  // 1 turn === 2π rads, so 90deg === 0.25
  turns: number 
}

type PolylineData = LineData | TurnData

export const polylineData = (polyline: PtTuple[]) => {
  const data: PolylineData[] = []

  for (let i = 0; i < polyline.length - 1; i++) {
    const p1 = polyline[i]
    const p2 = polyline[i + 1]

    const dx = p2[0] - p1[0]
    const dy = p2[1] - p1[1]
    const length = Math.sqrt(dx * dx + dy * dy)

    const direction = Math.atan2(dy, dx)

    data.push({ type: 'line', length, direction, lineIdx: [i, i + 1] })

    if (i < polyline.length - 2) {
      // calculate the angle to turn
      const nextP = polyline[i + 2]
      const angle = (
        Math.atan2(nextP[1] - p2[1], nextP[0] - p2[0]) - direction
      )
      // convert to turns
      const turns = Math.abs(angle / (Math.PI * 2))

      data.push({ type: 'turn', turns })
    }
  }

  return data
}