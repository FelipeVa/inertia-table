import { queryBuilder } from '@lifespikes/cogent-ts';
import {
  FilterValue,
  SearchableItem,
  UseFilteringOptions,
} from '@/types/common';
import { useParams } from './use-params';
import { omit, omitNotation, queryKeyFor } from '@/support/utils';
import { router } from '@inertiajs/react';

export function useFiltering(props?: UseFilteringOptions) {
  const { tableName = 'default', queryKey, filters } = props || {};
  const { params, currentPath } = useParams();
  const filterKey = queryKey || queryKeyFor('filter', tableName);
  const pageKey = queryKey || queryKeyFor('page', tableName);
  const baseBuilder = queryBuilder({
    baseUrl: currentPath,
  });
  const builder = baseBuilder();

  const omitKeys = (keys: string[]) =>
    omitNotation({ ...params }, [
      ...keys,
      !!props?.ignorePagination ? pageKey : '',
    ]);

  const onFilterByName = (filterName: string, value: FilterValue) => {
    let queryParams = omitKeys([`${filterKey}.${filterName}`]);

    if (value) {
      queryParams = {
        ...params,
        [`${filterKey}[${filterName}]`]: value,
      };
    }

    visit(queryParams);
  };

  const onMultiFilterByObject = (
    filters: Record<string, FilterValue>,
    omit?: string[],
  ) => {
    const keys = Object.keys(filters).map((key) => `${filterKey}.${key}`);

    let queryParams = omitKeys([
      ...keys,
      ...(omit ? omit.map((type) => `${filterKey}.${type}`) : []),
    ]);

    if (keys.length) {
      queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
        if (!value) {
          return acc;
        }

        return {
          ...acc,
          [`${filterKey}[${key}]`]: value,
        };
      }, queryParams);
    }

    visit(queryParams);
  };

  const onFilter = (filter: SearchableItem, value: FilterValue) => {
    let queryParams = omitKeys([`${filterKey}.${filter?.name}`]);

    if (value) {
      queryParams = {
        ...queryParams,
        [`${filterKey}[${filter?.name}]`]: value,
      };
    }

    visit(queryParams);
  };

  const onFilterFor = (filterName: string, value: FilterValue) => {
    const filter = filters?.find((f) => f.name === filterName);

    if (!filter) {
      throw new Error(`Filter with name ${filterName} not found`);
    }

    onFilter(filter, value);
  };

  const removeFilter = (filter: SearchableItem) => {
    const queryParams = {
      ...omitNotation(params, [`${filterKey}.${filter.name}`]),
    };

    visit(queryParams);
  };

  const clearFilters = () => {
    const queryParams = omit(params, [filterKey]);

    visit(queryParams);
  };

  const filterValue = (filterName: string) => {
    return params[filterKey]?.[filterName];
  };

  const visit = (params: Record<string, any>) => {
    router.visit(builder.params(params).get(), {
      method: 'get',
      preserveState: true,
      preserveScroll: true,
    });
  };

  return {
    onFilter,
    onFilterByName,
    onMultiFilterByObject,
    onFilterFor,
    filterValue,
    removeFilter,
    clearFilters,
  };
}
