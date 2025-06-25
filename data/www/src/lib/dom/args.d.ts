import { ElArg, HElement } from './types.js';
type NextArg = (...args: any[]) => void;
export declare const handleArg: (el: HElement, arg: ElArg) => Node | undefined;
export declare const handleChildArg: (el: Node, arg: ElArg, next?: NextArg) => Node | undefined;
export declare const textFromArg: (arg: ElArg) => string;
export {};
