import { Maybe } from '../../lib/types.js';
export type EditData = {
    id: string;
    name: string;
    tags?: string[];
};
export type PathData = EditData & {
    path: [x: number, y: number][];
};
export type RewardType = 'money' | 'xp';
export type Reward = [type: RewardType, amount: number];
export type CreepData = EditData & {
    speed: number;
    maxHp: number;
    rewards: Reward[];
};
type WaveItemShared = {
    startMs: number;
    pathId: string;
    creepId: string;
};
export type WaveCreep = {
    type: 'creep';
} & WaveItemShared;
export type WaveGroup = {
    type: 'group';
    intervalMs: number;
    count: number;
} & WaveItemShared;
export type WaveItem = WaveCreep | WaveGroup;
export type Wave = {
    creeps: WaveItem[];
    durationMs: number;
};
export type TowerData = EditData & {
    nextId: Maybe<string>;
    cost: number;
    sellPrice: number;
    bulletId: string;
    range: number;
    firingIntervalMs: number;
};
export type BulletData = EditData & {
    damage: number;
    speed: number;
};
export type LevelData = EditData & {
    lives: number;
    startMoney: number;
    pathIds: string[];
    waves: Wave[];
    towerIds: string[];
};
export type WorldData = EditData & {
    levelIds: string[];
};
export type CampaignData = EditData & {
    creeps: Record<string, CreepData>;
    towers: Record<string, TowerData>;
    bullets: Record<string, BulletData>;
    paths: Record<string, PathData>;
    levels: Record<string, LevelData>;
    worlds: Record<string, WorldData>;
    worldIds: string[];
};
export {};
