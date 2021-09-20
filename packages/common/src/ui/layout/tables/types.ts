import { ObjectWithStringKeys } from './../../../types/utility';
import { LocaleKey } from '@openmsupply-client/common/src/intl/intlHelpers';
import { ReactNode, RefObject } from 'react';
import { Column } from 'react-table';
import { SortBy, SortRule } from '../../../hooks/useSortBy';

export enum ColumnFormat {
  date,
  integer,
  real,
  text,
}

export interface ColumnDefinition<T> {
  label: LocaleKey;
  format?: ColumnFormat;
  key: keyof T;
  sortable?: boolean; // defaults to true
  align?: 'left' | 'right' | 'center';
  width?: number;
  maxWidth?: number;
  minWidth?: number;
}

export enum GenericColumnType {
  Selection = 'selection',
}

export interface QueryProps<D extends ObjectWithStringKeys> {
  first: number;
  offset: number;
  sortBy?: SortRule<D>[];
}

export interface QueryResponse<T> {
  data: T[];
  totalLength: number;
}

export interface DataTableApi<T> {
  selectAllRows: () => void;
  deselectAllRows: () => void;
  toggleSelectAllRows: () => void;
  selectedRows: T[];
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data?: T[];
  sortBy: SortBy<T>;
  isLoading?: boolean;
  onSortBy: (sortRule: SortRule<T>) => void;
  pagination: { page: number; total?: number; offset: number; first: number };
  onChangePage: (page: number) => void;
  onRowClick?: (row: T) => void;
  tableApi: RefObject<DataTableApi<T>>;
  children?: ReactNode;
}
