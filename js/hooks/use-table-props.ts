import { usePage } from '@inertiajs/react';
import { TablePropReturns } from "@/types/common";

export function useTableProps(name: string) {
  const { tableProps } = usePage<{
    tableProps: Record<string, TablePropReturns>;
  }>().props;

  return tableProps[name];
}
