import { FilterValue, SearchableItem, UseFilteringOptions } from '../types/common';
export declare function useFiltering(props?: UseFilteringOptions): {
    onFilter: (filter: SearchableItem, value: FilterValue) => void;
    onFilterByName: (filterName: string, value: FilterValue) => void;
    onMultiFilterByObject: (filters: Record<string, FilterValue>, omit?: string[]) => void;
    onFilterFor: (filterName: string, value: FilterValue) => void;
    filterValue: (filterName: string) => any;
    removeFilter: (filter: SearchableItem) => void;
    clearFilters: () => void;
};
