/*********************************************************************
 * td-motion.ts – runtime helpers for creep movement & path handling *
 *********************************************************************/
import { CampaignData, WaveCreep, PathData, CreepData } from './types.js';
type Vec = [number, number];
export declare const sub: ([ax, ay]: Vec, [bx, by]: Vec) => Vec;
export declare const len: ([x, y]: Vec) => number;
export declare const angleOf: ([x, y]: Vec) => number;
export declare const lerp: ([ax, ay]: Vec, [bx, by]: Vec, t: number) => Vec;
export type PathSeg = {
    a: Vec;
    b: Vec;
    len: number;
    angle: number;
    cumLen: number;
};
export type PathLut = {
    id: string;
    segs: PathSeg[];
    totalLen: number;
};
export declare const buildPathLut: (p: PathData) => PathLut;
export declare const buildPathRegistry: (campaign: CampaignData) => Record<string, PathLut>;
export type CreepState = 'moving' | 'turning' | 'exited';
export type CreepInstance = {
    spawnTime: number;
    creep: CreepData;
    path: PathLut;
    waveIdx: number;
    state: CreepState;
    segIdx: number;
    distOnSeg: number;
    pos: Vec;
    facing: number;
    turnRemaining: number;
};
export declare const makeCreepInstance: (spawn: WaveCreep, campaign: CampaignData, pathReg: Record<string, PathLut>, waveIdx: number, spawnTimeAbs: number) => CreepInstance;
export type MotionEventType = 'creep-spawn' | 'start-move' | 'stop-move' | 'start-turn' | 'stop-turn' | 'creep-exit';
export type MotionEvent = [
    time: number,
    type: MotionEventType,
    info: unknown
];
export declare const stepCreep: (inst: CreepInstance, now: number, dt: number, outEvts: any[][]) => void;
export declare const stepAllCreeps: (creeps: CreepInstance[], now: number, dt: number, outEvts: any[][]) => void;
export {};
