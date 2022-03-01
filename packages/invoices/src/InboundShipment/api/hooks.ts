import { useCallback } from 'react';
import { toItem } from '@openmsupply-client/system';
import {
  useQueryParams,
  useTableStore,
  useTranslation,
  useNotification,
  useNavigate,
  Item,
  getDataSorter,
  useSortBy,
  FieldSelectorControl,
  useQueryClient,
  useParams,
  useQuery,
  useAuthContext,
  useOmSupplyApi,
  useMutation,
  useFieldsSelector,
} from '@openmsupply-client/common';
import { canDeleteInvoice, inboundLinesToSummaryItems } from './../../utils';
import {
  Invoice,
  InvoiceLine,
  InboundShipmentItem,
  InvoiceRow,
} from './../../types';
import { getSdk } from './operations.generated';
import { getInboundQueries } from './api';

export const useInboundApi = () => {
  const { storeId } = useAuthContext();
  const { client } = useOmSupplyApi();
  const queries = getInboundQueries(getSdk(client), storeId);
  return { ...queries, storeId };
};

const useInvoiceNumber = () => {
  const { invoiceNumber = '' } = useParams();
  return invoiceNumber;
};

export const useInbound = () => {
  const invoiceNumber = useInvoiceNumber();
  const api = useInboundApi();
  return useQuery(['invoice', api.storeId, invoiceNumber], () =>
    api.get.byNumber(invoiceNumber)
  );
};

export const useIsInboundEditable = (): boolean => {
  const { status } = useInboundFields('status');
  return status === 'NEW' || status === 'SHIPPED' || status === 'DELIVERED';
};

export const useInboundShipmentSelector = <T = Invoice>(
  select?: (data: Invoice) => T
) => {
  const invoiceNumber = useInvoiceNumber();
  const api = useInboundApi();

  return useQuery(
    ['invoice', api.storeId, invoiceNumber],
    () => api.get.byNumber(invoiceNumber),
    {
      select,
    }
  );
};

export const useInboundFields = <KeyOfInvoice extends keyof Invoice>(
  keyOrKeys: KeyOfInvoice | KeyOfInvoice[]
): FieldSelectorControl<Invoice, KeyOfInvoice> => {
  const { data } = useInbound();
  const invoiceNumber = useInvoiceNumber();
  const api = useInboundApi();
  return useFieldsSelector(
    ['invoice', api.storeId, invoiceNumber],
    () => api.get.byNumber(invoiceNumber),
    (patch: Partial<Invoice>) => api.update({ ...patch, id: data?.id ?? '' }),
    keyOrKeys
  );
};

export const useInboundLines = (itemId?: string): InvoiceLine[] => {
  const selectItems = useCallback(
    (invoice: Invoice) => {
      return itemId
        ? invoice.lines.filter(
            ({ itemId: invoiceLineItemId }) => itemId === invoiceLineItemId
          )
        : invoice.lines;
    },
    [itemId]
  );

  const { data } = useInboundShipmentSelector(selectItems);

  return data ?? [];
};

export const useInboundItems = () => {
  const { sortBy, onChangeSortBy } = useSortBy<InboundShipmentItem>({
    key: 'itemName',
  });

  const selectItems = useCallback((invoice: Invoice) => {
    return inboundLinesToSummaryItems(invoice.lines).sort(
      getDataSorter(sortBy.key as keyof InboundShipmentItem, !!sortBy.isDesc)
    );
  }, []);

  const { data } = useInboundShipmentSelector(selectItems);

  return { data, sortBy, onSort: onChangeSortBy };
};

export const useNextItem = (currentItemId: string): Item | null => {
  const { data } = useInboundItems();

  if (!data) return null;
  const currentIndex = data.findIndex(({ itemId }) => itemId === currentItemId);
  const nextItem = data?.[(currentIndex + 1) % data.length];
  if (!nextItem) return null;

  return toItem(nextItem);
};

export const useSaveInboundLines = () => {
  const queryClient = useQueryClient();
  const invoiceNumber = useInvoiceNumber();
  const api = useInboundApi();
  return useMutation(api.upsertLines, {
    onSettled: () =>
      queryClient.invalidateQueries(['invoice', api.storeId, invoiceNumber]),
  });
};

export const useDeleteInboundLine = () => {
  // TODO: Shouldn't need to get the invoice ID here from the params as the mutation
  // input object should not require the invoice ID. Waiting for an API change.
  const { data } = useInbound();
  const invoiceNumber = useInvoiceNumber();
  const queryClient = useQueryClient();
  const api = useInboundApi();

  return useMutation((ids: string[]) => api.deleteLines(data?.id ?? '', ids), {
    onMutate: async (ids: string[]) => {
      await queryClient.cancelQueries(['invoice', api.storeId, invoiceNumber]);

      const previous = queryClient.getQueryData<Invoice>([
        'invoice',
        api.storeId,
        invoiceNumber,
      ]);

      if (previous) {
        queryClient.setQueryData<Invoice>(
          ['invoice', api.storeId, invoiceNumber],
          {
            ...previous,
            lines: previous.lines.filter(
              ({ id: lineId }) => !ids.includes(lineId)
            ),
          }
        );
      }

      return { previous, ids };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ['invoice', api.storeId, invoiceNumber],
        context?.previous
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['invoice', api.storeId, invoiceNumber]);
    },
  });
};

export const useInbounds = () => {
  const queryParams = useQueryParams<InvoiceRow>({
    initialSortBy: { key: 'otherPartyName' },
  });
  const api = useInboundApi();

  return {
    ...useQuery(['invoice', 'list', api.storeId, queryParams], () =>
      api.get.list({
        first: queryParams.first,
        offset: queryParams.offset,
        sortBy: queryParams.sortBy,
        filterBy: queryParams.filter.filterBy,
      })
    ),
    ...queryParams,
  };
};

export const useCreateInbound = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const api = useInboundApi();
  return useMutation(api.insert, {
    onSuccess: invoiceNumber => {
      navigate(String(invoiceNumber));
      queryClient.invalidateQueries(['invoice']);
    },
  });
};

export const useDeleteSelectedInbounds = () => {
  const queryClient = useQueryClient();
  const { data: rows } = useInbounds();
  const api = useInboundApi();
  const { mutate } = useMutation(api.delete);
  const t = useTranslation('replenishment');

  const { success, info } = useNotification();

  const { selectedRows } = useTableStore(state => ({
    selectedRows: Object.keys(state.rowState)
      .filter(id => state.rowState[id]?.isSelected)
      .map(selectedId => rows?.nodes?.find(({ id }) => selectedId === id))
      .filter(Boolean) as InvoiceRow[],
  }));

  const deleteAction = () => {
    const numberSelected = selectedRows.length;
    if (selectedRows && numberSelected > 0) {
      const canDeleteRows = selectedRows.every(canDeleteInvoice);
      if (!canDeleteRows) {
        const cannotDeleteSnack = info(t('messages.cant-delete-invoices'));
        cannotDeleteSnack();
      } else {
        mutate(selectedRows, {
          onSuccess: () => queryClient.invalidateQueries(['invoice']),
        });
        const deletedMessage = t('messages.deleted-invoices', {
          number: numberSelected,
        });
        const successSnack = success(deletedMessage);
        successSnack();
      }
    } else {
      const selectRowsSnack = info(t('messages.select-rows-to-delete'));
      selectRowsSnack();
    }
  };

  return deleteAction;
};
