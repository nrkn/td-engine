import { ElArg, HElement } from './types.js';
export declare const text: (...args: ElArg[]) => Text;
export declare const fragment: (...args: ElArg[]) => DocumentFragment;
export declare const emptyExcept: (el: HElement, ...except: string[]) => void;
