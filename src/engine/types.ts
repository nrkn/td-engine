import { Maybe } from '../lib/types.js'

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

// creeps spawn at start and exit at end
// worry about more complex scenarios later
export type PathData = EditData & {
  // the geometry of the path, as a polyline, in svg units
  path: [x: number, y: number][]
}

export type RewardType = 'money' | 'xp'

export type Reward = [type: RewardType, amount: number]

// data used to define creeps
export type CreepData = EditData & {
  // base speed as svg units per ms
  // could potentially be affected by tags, eg 'pulse' might slow down and 
  // speed up etc
  speed: number

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

// decided to move the path id into the WaveCreep 
// it simplifies waves from a UX perspective - if you have multiple paths with
// their own waves, you have to have a send next button for each path etc
export type WaveCreep = {
  type: 'creep',
  // the time in ms that this creep enters the path
  enterTime: number,
  // the id of the path this creep will follow
  pathId: string,
  // the id of the creepData prototype this creep will use
  creepId: string
}

export type WaveGroup = {
  type: 'group',
  // how long before first creep in group enters
  startTime: number
  // how long between each creep spawned in this group
  deltaTime: number
  // number of creeps in this group
  copies: number
  // the id of the creepData prototype these creeps will use
  creepId: string
  // this type could become more complex later, eg 
  // creepIds: [ 1, 2, 3 ], if copies was 8 then it would be 1,2,3,1,2,3,1,2
  // or we could allow compositing of groups or whatever - but for now, a group
  // repeating the same creepId is sufficient
}

export type WaveItem = WaveCreep | WaveGroup

/*
  runtime creep instance might look like:
  
  {
    enterTime: number
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

  we can create all of the instance creeps at level load time to avoid gc churn   
  if later we allow dynamic spawning, we can use an object pool instead
*/

export type Wave = {
  // creeps in this wave and the time that they enter
  // can be a mix of WaveCreep and WaveGroup
  // at runtime, we will expand WaveGroup into multiple WaveCreeps, but we 
  // will keep the grouping in the design data for a better authoring experience
  creeps: WaveItem[]
  // time in ms until the next wave starts automatically if not called early
  duration: number
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

  // type of bullet this tower fires
  bulletId: string
  // how far this tower can see to target creeps, in svg units
  range: number
  // firing rate, in ms
  rate: number
}
/*
  tags may be involved in special weapon types, drawing etc
*/

// standard projectile, later we will add more complex ones, eg homing, 
// bouncing etc
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
