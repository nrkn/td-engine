import { testCampaign } from '../../data/test-campaign.js'
import { assrt, maybe } from '../../lib/util.js'
import { polylineData, simulateMovement } from './movement.js'
import { CampaignData, PtTuple, Wave, WaveCreep, WaveItem } from './types.js'

const expandItems = (items: WaveItem[]): WaveCreep[] => {
  const out: WaveCreep[] = []

  for (const it of items) {
    if (it.type === 'creep') {
      out.push(it)
      continue
    }

    const { startMs, intervalMs, count, creepId, pathId } = it

    for (let i = 0; i < count; i++) {
      out.push({
        type: 'creep',
        startMs: startMs + i * intervalMs,
        pathId,
        creepId,
      })
    }
  }

  return out.sort((a, b) => a.startMs - b.startMs)
}

const expandWave = (w: Wave): WaveCreep[] => expandItems(w.creeps)

type ActiveWave = {
  idx: number
  start: number // absolute ms
  duration: number // durationMs
  creeps: WaveCreep[] // sorted, from expandWave
  nextCreep: number // cursor into creeps
  ended: boolean // have we already logged 'wave end'?
}

// quick and dirty simulation of waves, using the first level of the first world
/*
  todo:

  - simulate creep movement, don't log all movement, just log when:
    - creep starts moving, eg at spawn or after turning
    - creep stops moving, eg to turn
    - creep starts turning
    - creep stops turning
    - creep exits the path
  
*/
const simulateWaves = (
  campaign: CampaignData,
  sendNextWaveEarly = false,
  earlyModifier = 0.5
) => {
  // first level of first world
  const worldId = campaign.worldIds[0]
  const world = assrt(campaign.worlds[worldId], `World ${worldId} not found`)
  const levelId = world.levelIds[0]
  const level = assrt(campaign.levels[levelId], `Level ${levelId} not found`)

  const waves = level.waves
  const events: any[][] = []

  const log = (time: number, ...args: any[]) => events.push([time, ...args])

  let time = 0
  let nextWaveIdx = 0
  let nextWaveStartTime = 0
  const active: ActiveWave[] = []

  // bail early if level takes more than ~16 minutes to run
  const MAX_MS = 1e6

  // todo - creep movement

  /* -------------------------------------------------------------- */
  for (; time < MAX_MS; time++) {
    // if time for a new wave
    if (nextWaveIdx < waves.length && time >= nextWaveStartTime) {
      const w = waves[nextWaveIdx]
      const start = time

      active.push({
        idx: nextWaveIdx,
        start,
        duration: w.durationMs,
        creeps: expandWave(w),
        nextCreep: 0,
        ended: false,
      })

      log(time, 'wave start', nextWaveIdx)

      // when does next wave start
      let overlap = (
        sendNextWaveEarly ? w.durationMs * earlyModifier : w.durationMs
      )

      if (maybe(w.minDurationMs) && w.minDurationMs > overlap) {
        // if defined, the user cannot send the next wave before this time
        overlap = w.minDurationMs
      }

      nextWaveStartTime = start + overlap
      nextWaveIdx++
    }

    // backwards due to potential splice
    for (let i = active.length - 1; i >= 0; i--) {
      const aw = active[i]
      const relTime = time - aw.start

      // spawn due creeps
      while (
        aw.nextCreep < aw.creeps.length &&
        aw.creeps[aw.nextCreep].startMs <= relTime
      ) {
        const waveCreep = aw.creeps[aw.nextCreep]
        const { pathId, creepId } = waveCreep

        log(time, 'creep spawn', `wave[${aw.idx}]`, pathId, creepId)

        aw.nextCreep++
      }

      // wave ended
      if (!aw.ended && relTime >= aw.duration) {
        log(time, 'wave end', aw.idx)

        aw.ended = true
      }

      // retire wave once ended and any remaining creeps spawned
      if (aw.ended && aw.nextCreep >= aw.creeps.length) {
        active.splice(i, 1)
      }
    }

    // no active waves left 
    if (nextWaveIdx >= waves.length && active.length === 0) break
  }

  console.table(events)

  const firstWave = expandWave(waves[0])

  const firstBasic = assrt(
    firstWave.find(c => c.creepId === 'basic'),
    'First wave should have a basic creep'
  )

  const firstBasicData = assrt(
    campaign.creeps[firstBasic.creepId],
    `Creep ${firstBasic.creepId} not found`
  )

  const firstBoss = assrt(
    firstWave.find(c => c.creepId === 'boss'),
    'First wave should have a boss creep'
  )

  const firstBossData = assrt(
    campaign.creeps[firstBoss.creepId],
    `Creep ${firstBoss.creepId} not found`
  )

  const firstPath = assrt(
    campaign.paths[firstBasic.pathId],
    `Path ${firstBasic.pathId} not found`
  )

  const basicMoves = simulateMovement(
    firstPath.path, firstBasicData.speed, firstBasicData.msPerTurn
  )

  const bossMoves = simulateMovement(
    firstPath.path, firstBossData.speed, firstBossData.msPerTurn
  )

  const pathData = polylineData(firstPath.path)

  console.log('path data')
  console.table(pathData)

  console.log('basic creep moves')
  console.table(basicMoves)

  console.log('boss creep moves')
  console.table(bossMoves)
}

console.log('waves sim, no sending waves early')

simulateWaves(testCampaign)

console.log('waves sim, sending waves early')

simulateWaves(testCampaign, true, 0.25)

// just quickly test that polylineData works

const testPath: PtTuple[] = [
  [0, 0],
  [100, 0],
  [100, 100],
  [100, 0],
]

console.log('test path data')
console.table(polylineData(testPath))