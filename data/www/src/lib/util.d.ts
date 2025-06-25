type Fit = {
    x: number;
    y: number;
    w: number;
    h: number;
    scale: number;
};
export declare const objectFit: (parentWidth: number, parentHeight: number, childWidth: number, childHeight: number) => Fit;
export {};
