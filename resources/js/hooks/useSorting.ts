import { queryBuilder } from '@lifespikes/cogent-ts';
import { router } from '@inertiajs/react';
import { omit, queryKeyFor } from '../support/utils';
import { useTableProps } from './useTableProps';
import { useParams } from './useParams';
import { Column, UseSortingOptions } from '../types/common';

export function useSorting({ tableName, queryKey, column }: UseSortingOptions) {
  const sortQueryKey = queryKey || queryKeyFor('sort', tableName);
  const tableProps = useTableProps(tableName);
  const { params, currentPath } = useParams();
  const baseBuilder = queryBuilder({
    baseUrl: currentPath,
    queryParams: {
      sort: sortQueryKey,
    },
  });
  const builder = baseBuilder();
  const sortParam = tableProps.sort;
  const filteredParams = omit(params, [sortQueryKey]);

  const sortAsc = (column: Column) => {
    builder.sort([column.name]);
  };

  const sortDesc = (column: Column) => {
    builder.sort([`-${column.name}`]);
  };

  const removeSort = () => {
    builder.sort([]);
  };

  const onSortBy = (overrideColumn?: Column) => {
    const realColumn = overrideColumn || column;

    if (!realColumn) {
      throw new Error('Column is required');
    }

    if (Object.keys(filteredParams).length > 0) {
      builder.params(filteredParams);
    }

    if (sortParam === realColumn.name) {
      sortDesc(realColumn);
    } else if (sortParam === `-${realColumn.name}`) {
      removeSort();
    } else {
      sortAsc(realColumn);
    }

    router.visit(builder.get(), {
      method: 'get',
    });
  };

  return { onSortBy };
}
