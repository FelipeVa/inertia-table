export declare function filterObject(obj: Record<string, any>, callback: (key: string) => boolean): {
    [k: string]: any;
};
export declare function omit(obj: Record<string, any>, keys: string[]): {
    [k: string]: any;
};
export declare function omitNotation(obj: Record<string, any>, keys: string[]): {
    [x: string]: any;
};
export declare function queryKeyFor(key: string, tableName?: string): string;
export declare const flattenKeyValueParams: (obj: Record<string, any>, parentKey?: string) => string[];
export declare function getParamsObject(url?: string): Record<string, any>;
