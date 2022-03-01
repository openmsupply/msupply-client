import React, { FC, useState } from 'react';
import {
  useNavigate,
  DataTable,
  useColumns,
  useListData,
  getNameAndColorColumn,
  TableProvider,
  createTableStore,
  useNotification,
  useTranslation,
  InvoiceNodeStatus,
  useCurrency,
  useAuthContext,
} from '@openmsupply-client/common';
import { NameSearchModal } from '@openmsupply-client/system/src/Name';
import { getStatusTranslator } from '../../utils';
import { Toolbar } from './Toolbar';
import { AppBarButtons } from './AppBarButtons';
import { getOutboundShipmentListViewApi } from './api';
import { useOutboundShipmentApi } from '../api';
import { OutboundShipmentRowFragment } from '../api/operations.generated';

export const OutboundShipmentListViewComponent: FC = () => {
  const t = useTranslation('common');
  const navigate = useNavigate();
  const { error } = useNotification();
  const api = useOutboundShipmentApi();
  const { storeId } = useAuthContext();

  const {
    totalCount,
    data,
    isLoading,
    onDelete,
    onUpdate,
    sortBy,
    onChangeSortBy,
    onCreate,
    onChangePage,
    pagination,
    filter,
    invalidate,
  } = useListData(
    {
      initialSortBy: { key: 'otherPartyName' },
      initialFilterBy: { type: { equalTo: 'OUTBOUND_SHIPMENT' } },
    },
    'invoice',
    getOutboundShipmentListViewApi(api, storeId)
  );

  const { c } = useCurrency();
  const columns = useColumns<OutboundShipmentRowFragment>(
    [
      [getNameAndColorColumn(), { setter: onUpdate }],
      [
        'status',
        {
          formatter: status =>
            getStatusTranslator(t)(status as InvoiceNodeStatus),
        },
      ],
      'invoiceNumber',
      'createdDatetime',
      'comment',
      [
        'totalAfterTax',
        {
          accessor: ({ rowData }) => c(rowData.pricing.totalAfterTax).format(),
        },
      ],
      'selection',
    ],
    { onChangeSortBy, sortBy },
    [sortBy]
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <NameSearchModal
        type="customer"
        open={open}
        onClose={() => setOpen(false)}
        onChange={async name => {
          setOpen(false);

          const createInvoice = async () => {
            const invoice = {
              id: String(Math.ceil(Math.random() * 1000000)),
              otherPartyId: name?.id,
            };

            try {
              const result = await onCreate(invoice);
              invalidate();
              navigate(result);
            } catch (e) {
              const errorSnack = error(
                'Failed to create invoice! ' + (e as Error).message
              );
              errorSnack();
            }
          };

          createInvoice();
        }}
      />

      <Toolbar onDelete={onDelete} data={data} filter={filter} />
      <AppBarButtons onCreate={setOpen} />

      <DataTable
        pagination={{ ...pagination, total: totalCount }}
        onChangePage={onChangePage}
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onRowClick={row => {
          navigate(row.id);
        }}
      />
    </>
  );
};

export const OutboundShipmentListView: FC = () => {
  return (
    <TableProvider createStore={createTableStore}>
      <OutboundShipmentListViewComponent />
    </TableProvider>
  );
};
