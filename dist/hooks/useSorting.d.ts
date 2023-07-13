import { Column, UseSortingOptions } from '../types/common';
export declare function useSorting({ tableName, queryKey, column }: UseSortingOptions): {
    onSortBy: (overrideColumn?: Column) => void;
};
