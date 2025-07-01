import { Maybe } from '../../lib/types.js'

/*
  WIP

  rough prototyping, types for tower defense game engine

  main focus of this module - what types do authors use to define 
  levels/waves/creeps/towers etc

  but keep in mind - what types does the engine need at runtime etc

  how can we keep them flexible and general enough, eg using tags and only
  keeping generic properties on the data definitions

  currently assumes linear progression through levels->worlds, consider 
  branching paths

  currently assumes linear upgrade paths for towers, consider branching paths
*/

export type EditData = {
  // unique id for this item
  id: string
  // the display name of this item
  name: string

  // custom data for this item
  // might be used for drawing, custom behaviors, grouping, filtering etc
  //
  // tags can be either a simple id eg "pulse", or a kv eg "move=pulse"
  //
  // we won't have any custom engine tags to begin with, as we add them we will
  // need to document them - or they may end up being entirely user driven and
  // engine remains agnostic
  tags?: string[]
}

export type PtTuple = [x: number, y: number]

// creeps spawn at start and exit at end
// worry about more complex scenarios later
export type PathData = EditData & {
  // the geometry of the path, as a polyline, in svg units
  path: PtTuple[]
}

export type RewardType = 'money' | 'xp'

export type Reward = [type: RewardType, amount: number]

// data used to define creeps
export type CreepData = EditData & {
  // base speed as svg units per ms
  // could potentially be affected by tags, eg 'pulse' might slow down and 
  // speed up etc
  speed: number

  // when moving between path segments, how long it takes to turn to face the 
  // next segment
  // ms per full turn eg 2π rads; if 0 or undefined, creep turns instantly
  msPerTurn?: number

  // max hp - runtime engine will track current/max hp
  maxHp: number

  // typically 1 xp reward and 1 money reward but up to author 
  // could also be eg auto populated using a formula 
  rewards: Reward[]
}
/*
  creep tags:
    anything custom that the author may want to define
    could define behaviour, but also visuals, eg a tag may be linked to SVG
    geometry defined elsewhere, or to a color etc
*/

type WaveItemShared = {
  // the time that this creep enters the path relative to the start of the wave
  startMs: number,
  // the id of the path this creep will follow
  pathId: string,
  // the id of the creepData prototype this creep will use
  creepId: string
}

export type WaveCreep = {
  // discriminator
  type: 'creep'
} & WaveItemShared

export type WaveGroup = {
  // discriminator
  type: 'group'

  // how long between each creep spawned in this group
  intervalMs: number
  // the id of the path this group will follow
  count: number
} & WaveItemShared

export type WaveItem = WaveCreep | WaveGroup

/*
  runtime creep instance might look like:
  
  {
    startMs: number
    pathId: string
    creepId: string
    hp: number
    
    // classes and data:
    // could be used for effects eg buffs/debuffs etc
    // may be populated by the engine or from the tags in CreepData
    // 
    // using set and map for faster runtime lookups
    //
    // if from tags, for tags of the form "pulse"
    classes: Set<string>
    // if from tags, for tags of the form "move=pulse"
    data: Map<string, string>
  }

  we will also need eg position, facing etc - these can be derived but we might
  want to store them temporarily in the instance between updates for performance

  we can create all of the instance creeps at level load time to avoid gc churn;   
  if later we allow dynamic spawning, we can use an object pool instead
*/

export type Wave = {
  // creeps in this wave and the time that they enter
  // can be a mix of WaveCreep and WaveGroup
  // at runtime, we will expand WaveGroup into multiple WaveCreeps, but we 
  // will keep the grouping in the design data for a better authoring experience
  creeps: WaveItem[]
  // time in ms until the next wave starts automatically if not called early
  durationMs: number

  // if defined, the user cannot send the next wave before this time
  // it should be <= durationMs, otherwise that is very silly
  minDurationMs?: number
}

// later we may make this more complex, eg a tower might have a list of 
// gunIds rather than a single bulletId etc
// later on, we will need towers that fire a ray instead of a projectile and 
// various other cool attack types
export type TowerData = EditData & {
  // the id of next tower if upgradable
  nextId: Maybe<string>
  // if we add branching upgrades, could be:
  // nextIds: Maybe<string[]>

  // cost to buy/upgrade to this tower
  cost: number
  // sell price for this tower
  sellPrice: number

  // how long building, selling or upgrading this tower takes, in ms
  buildTimeMs?: number // if 0 or undefined, tower is built instantly
  sellTimeMs?: number // if 0 or undefined, tower is sold instantly
  upgradeTimeMs?: number // if 0 or undefined, tower is upgraded instantly

  // type of bullet this tower fires
  bulletId: string
  // how far this tower can see to target creeps, in svg units
  range: number
  // firing rate, in ms
  firingIntervalMs: number
}
/*
  tags may be involved in special weapon types, drawing etc
*/

// standard projectile, later we will add more complex ones, eg homing, 
// bouncing; effect based like slow, poison etc
export type BulletData = EditData & {
  // how much damage this bullet does
  damage: number
  // how fast the bullet moves, in svg units per ms
  speed: number
}

export type LevelData = EditData & {
  // how many creeps can pass through before losing
  //
  // a future extension may be that as we have multiple paths, each path has its
  // own life counter
  lives: number

  // how much money the player starts with - could be carried over, could be 
  // a set amount etc depending on the level author
  startMoney: number

  // the paths used in this level
  //
  // may not be necessary - we could derive the list of paths used from 
  // the wave data - I feel better having it be explicit tho
  pathIds: string[]

  // the waves in this level
  waves: Wave[]

  // ids - whitelist of towers player is allowed to use
  towerIds: string[]
}
/*
  tags may be involved in custom level properties, they might link a custom
  intro/exit screen, etc
*/

export type WorldData = EditData & {
  // order of the levels in this world
  // may later be modified to allow branching paths
  levelIds: string[]
  // it's also possible that we could store the levels linearly as default 
  // behaviour and use tags to define edges for branching paths?
}
/*
  tags may be involved in custom world properties, they might link a custom
  intro/exit screen etc
*/

export type CampaignData = EditData & {
  // definitions of creeps, towers, bullets etc
  // id -> data
  creeps: Record<string, CreepData>
  towers: Record<string, TowerData>
  bullets: Record<string, BulletData>
  paths: Record<string, PathData>
  levels: Record<string, LevelData>
  worlds: Record<string, WorldData>

  // order of the worlds in this campaign
  // may later be modified to allow branching paths
  worldIds: string[]
}

