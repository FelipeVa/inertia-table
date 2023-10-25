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

export type TableItemType<T> = T;

export type ChildrenProps<T> = {
  data: T[];
  selectedItems: TableItemType<T>[];
  onSelectItem: (item: TableItemType<T>) => void;
};

export type RenderRow<T> = {
  row: T;
  selectedRows: T[];
  onSelectRow: (row: T) => void;
};

export type RowWithActions<T> = {
  getValue: <K extends keyof T>(key: K) => T[K];
  isSelected: boolean;
  toggleSelected: () => void;
};

export type RenderFooter = {
  tableName?: string;
  meta?: Meta;
  links?: Links;
  perPageOptions?: number[];
  perPage?: string;
  paginationPosition?: PaginationPosition;
};

export type RenderHeader = {
  tableName: string;
  columns: Column[];
  filters?: Filter[];
};

export type RenderAction<T> = {
  row: T;
};

export type RenderSelectedRowActions<T> = {
  rows: T[];
};

export type PaginationPosition = 'top' | 'bottom' | 'both';
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

type FilterType = 'select' | 'datepicker';

export type SearchableItem = {
  value: string | null | undefined | Date;
  name: string;
  label: string;
};

export interface Search extends SearchableItem {
  isGlobal: boolean;
  placeholder: string;
  type: FilterType;
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

export type FilterItemProps = {
  filter: Filter;
  onFilter: (filter: Filter, value: Date | string | null | undefined) => void;
};

export type ActiveFiltersProps = {
  tableName: string;
  filters: Filter[];
};

export type ColumnMenuProps = {
  tableName: string;
  columns: Column[];
};

export type FilterMenuProps = {
  tableName: string;
  filters: Filter[];
};

export type NewSavedFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveFilter: (filterName: string) => void;
};

export type SavedFilterMenuProps = {
  tableName: string;
};

export type SearchInputProps = {
  tableName: string;
  search: Search;
};

export type SearchMenuProps = {
  tableName: string;
  searches: Search[];
};

export type PerPageOptionSelectorProps = {
  tableName: string;
  perPage: string;
  options: number[];
};

export type SelectedRecordRowProps<T> = {
  items: T[];
  selectedItems: T[];
  onSelectAll: () => void;
  onDeselectAll: () => void;
};

export type TableFooterProps = {
  tableName: string;
  meta: Meta;
  links?: Links;
  perPageOptions?: number[];
  perPage?: string;
  paginationPosition?: PaginationPosition;
};

export type UseSortingOptions = {
  tableName: string;
  queryKey?: string;
  column?: Column;
};

export type UseSavedFiltersOptions = {
  tableName: string;
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
