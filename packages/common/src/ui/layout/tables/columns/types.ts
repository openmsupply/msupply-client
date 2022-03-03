import { JSXElementConstructor } from 'react';
import { SortBy } from '@common/hooks';
import { useTranslation, useFormatDate, LocaleKey } from '@common/intl';
import { RecordWithId } from '@common/types';

export interface CellProps<T extends RecordWithId> {
  rowData: T;
  rows: T[];
  columns: Column<T>[];
  column: Column<T>;
  rowKey: string;
  columnIndex: number;
  rowIndex: number;
}

export interface HeaderProps<T extends RecordWithId> {
  column: Column<T>;
}

export enum ColumnFormat {
  Currency,
  Date,
  Integer,
  Real,
  Text,
}

export enum ColumnAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export type ColumnDataAccessor<T extends RecordWithId> = (params: {
  rowData: T;
  rows: T[];
}) => unknown;

export type Translators = {
  t: ReturnType<typeof useTranslation>;
  d: ReturnType<typeof useFormatDate>;
};

export type ColumnDataFormatter = (
  rowDataValue: unknown,
  t: Translators
) => string;

export type ColumnDataSetter<T> = (
  rowData: Partial<T> & { id: string }
) => void;

export enum GenericColumnKey {
  Selection = 'selection',
}

export interface Column<T extends RecordWithId> {
  key: keyof T | GenericColumnKey | string;
  accessor: ColumnDataAccessor<T>;

  label: LocaleKey | '';

  format: ColumnFormat;
  align: ColumnAlign;

  sortable: boolean;
  sortDescFirst: boolean;
  sortType: 'datetime' | 'numeric' | 'alphanumeric';
  sortInverted: boolean;
  getSortValue?: (row: T) => string | number;

  onChangeSortBy?: (column: Column<T>) => void;
  sortBy?: SortBy<T>;

  width: number;
  minWidth: number;
  maxWidth?: number;
  maxLength?: number;
  backgroundColor?: string;

  Cell: JSXElementConstructor<CellProps<T>>;
  Header: JSXElementConstructor<HeaderProps<T>>;

  formatter: ColumnDataFormatter;

  order?: number;

  setter: ColumnDataSetter<T>;
}

export interface ColumnDefinition<T extends RecordWithId>
  extends Partial<Omit<Column<T>, 'key'>> {
  key: keyof T | GenericColumnKey | string;
}
