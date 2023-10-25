import {
  Paginated,
  TablePropReturns,
  UseTableOptions,
  UseTableReturns,
} from '@/types/common';
import { usePage } from '@inertiajs/react';

export function useTable<T>({
  name = 'default',
  resource,
}: UseTableOptions): UseTableReturns<T> {
  const props = usePage<{
    tableProps: Record<string, TablePropReturns>;
  }>().props;

  const data = (resource ? props[resource] : props[name]) as Paginated<T>;
  const tableProps = props.tableProps[name];

  if (!tableProps) {
    throw new Error(`Table ${name} does not exist`);
  }

  const isHiddenColumn = (columnName: keyof T) => {
    return (
      tableProps.columns.find((column) => column.name === columnName)?.hidden ??
      false
    );
  };

  return {
    tableName: name,
    tableProps: {
      name,
      ...tableProps,
      ...data,
    },
    isHiddenColumn,
  };
}
