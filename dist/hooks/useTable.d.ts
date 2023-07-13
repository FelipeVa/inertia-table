import { UseTableOptions } from '../types/common';
export declare function useTable<T>({ name, resource }: UseTableOptions): {
    tableName: string;
    tableProps: {
        data: T[];
        links: import("../types/common").Links;
        meta: import("../types/common").Meta;
        columns: import("../types/common").Column[];
        filters: import("../types/common").Filter[];
        searches: import("../types/common").Search[];
        cursor: string | null;
        sort: string | null;
        defaultSort: string | null;
        page: number;
        pageName: string;
        perPage: string;
        perPageOptions: number[];
        name: string;
    };
    isHiddenColumn: (columnName: keyof T) => boolean;
};
