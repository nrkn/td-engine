import { Store } from './types.js';
export declare const createStore: <Id extends string = string, Value = any>(storeName: string) => Promise<Store<Id, Value>>;
