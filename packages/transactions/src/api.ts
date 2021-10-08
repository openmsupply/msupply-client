import { ObjectWithStringKeys } from './../../common/src/types/utility';
import { Transaction, SortBy, ListApi } from '@openmsupply-client/common';
import { Environment } from '@openmsupply-client/config';
import { request, gql } from 'graphql-request';
import { OutboundShipment } from './OutboundShipment/DetailView/types';

export const getDetailQuery = (): string => gql`
  query invoice($id: String!) {
    invoice(id: $id) {
      id
      color
      comment
      status
      type
      entered
      confirmed
      invoiceNumber
      total
      color
      name
      lines {
        id
        itemCode
        itemName
        expiry
        quantity
      }
    }
  }
`;

export const getMutation = (): string => gql`
  mutation updateInvoice($invoicePatch: InvoicePatch) {
    updateInvoice(invoice: $invoicePatch) {
      id
      color
      comment
      status
      type
      entered
      confirmed
      invoiceNumber
      total
      color
      name
    }
  }
`;

export const getDeleteMutation = (): string => gql`
  mutation deleteInvoices($invoices: [InvoicePatch]) {
    deleteInvoices(invoices: $invoices) {
      id
    }
  }
`;

export const getListQuery = (): string => gql`
  query invoices($first: Int, $offset: Int, $sort: String, $desc: Boolean) {
    invoices(first: $first, offset: $offset, sort: $sort, desc: $desc) {
      data {
        id
        color
        comment
        status
        type
        entered
        confirmed
        invoiceNumber
        total
        name
      }
      totalLength
    }
  }
`;

export const deleteFn = async (invoices: Transaction[]) => {
  await request(Environment.API_URL, getDeleteMutation(), {
    invoices,
  });
};

export const listQueryFn = async <T extends ObjectWithStringKeys>(queryParams: {
  first: number;
  offset: number;
  sortBy: SortBy<T>;
}): Promise<{ data: Transaction[]; totalLength: number }> => {
  const { first, offset, sortBy } = queryParams;

  const { invoices } = await request(Environment.API_URL, getListQuery(), {
    first,
    offset,
    sort: sortBy.key,
    desc: sortBy.isDesc,
  });

  return invoices;
};

export const detailQueryFn = (id: string) => async (): Promise<Transaction> => {
  const result = await request(Environment.API_URL, getDetailQuery(), {
    id,
  });
  const { invoice } = result;
  return invoice;
};

export const updateFn = async (updated: Transaction): Promise<Transaction> => {
  const patch = { invoicePatch: updated };
  const result = await request(Environment.API_URL, getMutation(), patch);
  const { updateInvoice } = result;
  return updateInvoice;
};

export const OutboundShipmentListViewApi: ListApi<Transaction> = {
  onQuery:
    ({ first, offset, sortBy }) =>
    () =>
      listQueryFn({ first, offset, sortBy }),
  onDelete: deleteFn,
  onUpdate: updateFn,
};

interface Api<ReadType, UpdateType> {
  onRead: () => Promise<ReadType>;
  onUpdate: (val: UpdateType) => Promise<ReadType>;
}

export const getOutboundShipmentDetailViewApi: (
  id: string
) => Api<Transaction, OutboundShipment> = (id: string) => ({
  onRead: detailQueryFn(id),
  onUpdate: async (
    outboundShipment: OutboundShipment
  ): Promise<Transaction> => {
    const result = await updateFn(outboundShipment);
    return result;
  },
});
