export declare const createFunctionChain: () => {
    registerHandler: (fn: (...args: any) => any) => void;
    handle: (...args: any[]) => void;
};
