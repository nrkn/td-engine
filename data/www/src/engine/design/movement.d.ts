import { PtTuple } from './types.js';
type EventType = 'move' | 'turn';
type MoveEvent = [type: EventType, durationMs: number, totalMs: number];
export declare const simulateMovement: (polyline: PtTuple[], speed: number, msPerTurn?: number) => MoveEvent[];
type LineData = {
    type: 'line';
    length: number;
    direction: number;
    lineIdx: [number, number];
};
type TurnData = {
    type: 'turn';
    turns: number;
};
type PolylineData = LineData | TurnData;
export declare const polylineData: (polyline: PtTuple[]) => PolylineData[];
export {};
