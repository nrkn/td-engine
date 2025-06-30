import { Fit } from './types.js';
export declare const maybe: <T>(value: T | null | undefined) => value is T;
export declare const assrt: <T>(value: T | null | undefined, message?: string) => T;
export declare const objectFit: (parentWidth: number, parentHeight: number, childWidth: number, childHeight: number) => Fit;
