import React, { FC } from 'react';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { Column } from '../../columns/types';
import { SortDescIcon } from '@common/icons';
import { RecordWithId } from '@common/types';
import { useDebounceCallback } from '@common/hooks';

export const HeaderRow: FC<{ dense?: boolean }> = ({ dense, ...props }) => (
  <TableRow
    {...props}
    sx={{
      display: 'flex',
      flex: '1 0 auto',
      height: !!dense ? '40px' : '60px',
      alignItems: 'center',
    }}
  />
);

interface HeaderCellProps<T extends RecordWithId> {
  column: Column<T>;
  dense?: boolean;
}

export const HeaderCell = <T extends RecordWithId>({
  column,
  dense = false,
}: HeaderCellProps<T>): JSX.Element => {
  const {
    maxWidth,
    minWidth,
    width,
    onChangeSortBy,
    key,
    sortable,
    align,
    sortBy,
    Header,
  } = column;

  const { direction, key: currentSortKey } = sortBy ?? {};

  const isSorted = key === currentSortKey;

  const onSort = useDebounceCallback(
    () => onChangeSortBy && sortable && onChangeSortBy(column),
    [column],
    150
  );

  return (
    <TableCell
      role="columnheader"
      onClick={onSort}
      align={align}
      padding={'none'}
      sx={{
        backgroundColor: 'transparent',
        borderBottom: '0px',
        paddingLeft: '16px',
        paddingRight: '16px',
        width,
        minWidth,
        maxWidth,
        flex: `${width} 0 auto`,
        fontWeight: 'bold',
        fontSize: dense ? '12px' : '14px',
      }}
      aria-label={String(key)}
      sortDirection={isSorted ? direction : false}
    >
      {sortable ? (
        <TableSortLabel
          hideSortIcon={false}
          active={isSorted}
          direction={direction}
          IconComponent={SortDescIcon}
        >
          <Header column={column} />
        </TableSortLabel>
      ) : (
        <Header column={column} />
      )}
    </TableCell>
  );
};
