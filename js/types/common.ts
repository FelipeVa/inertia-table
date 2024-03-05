export type Links = {
  first: string;
  last: string;
  prev: null;
  next: null;
};

export type Link = {
  url: null | string;
  label: string;
  active: boolean;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Paginated<T> = {
  data: T[];
  links: Links;
  meta: Meta;
};

/**
 * Hook
 */
export type Column = {
  name: string;
  label?: string;
  hidden: boolean;
  sortable: boolean;
  sorted: 'asc' | 'desc' | boolean;
};

export type FilterOption = {
  value: string;
  label: string;
};

type FilterType = 'select' | 'datepicker' | 'text' | 'search';

export type SearchableItem = {
  value: string | null | undefined | Date;
  name: string;
  label: string;
};

export interface Search extends SearchableItem {
  isGlobal: boolean;
  placeholder: string;
  type: FilterType;
  options: string[];
  selectedOption: string;
  isSelectable: boolean;
}

export interface Filter extends SearchableItem {
  options?: FilterOption[];
  type: FilterType;
}

export type TablePropReturns = {
  columns: Column[];
  filters: Filter[];
  searches: Search[];
  cursor: string | null;
  sort: string | null;
  defaultSort: string | null;
  page: number;
  pageName: string;
  perPage: string;
  perPageOptions: number[];
};

export type UseSortingOptions = {
  tableName: string;
  queryKey?: string;
  column?: Column;
};

export type UseFilteringOptions = {
  resourceName?: string;
  tableName?: string;
  queryKey?: string;
  filters?: SearchableItem[];
  ignorePagination?: boolean;
};

export type UseTableOptions = {
  name?: string;
  resource?: string;
};

export type UseTableReturns<T> = {
  tableName: string;
  tableProps: TablePropReturns &
    Paginated<T> & {
      name: string;
    };
  isHiddenColumn: (columnName: keyof T) => boolean;
};

export type FilterValue = Date | string | null | undefined;
