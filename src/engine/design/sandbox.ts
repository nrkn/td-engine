import { testCampaign } from '../../data/test-campaign.js'
import { assrt } from '../../lib/util.js'
import { CampaignData, Wave, WaveCreep, WaveItem } from './types.js'

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
      const overlap = (
        sendNextWaveEarly ? w.durationMs * earlyModifier : w.durationMs
      )

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
        const { pathId, creepId } = aw.creeps[aw.nextCreep]

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
}

console.log('waves sim, no sending waves early')

simulateWaves(testCampaign)

console.log('waves sim, sending waves early')

simulateWaves(testCampaign, true, 0.25)
