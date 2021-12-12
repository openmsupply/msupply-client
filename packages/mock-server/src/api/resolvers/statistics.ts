import { db } from './../../data/database';
import { ResolvedInvoiceCounts, ResolvedStockCounts } from './../../data/types';
import { InvoiceNodeType } from '@openmsupply-client/common/src/types/schema';

export const statisticsResolver = {
  invoice: (type: InvoiceNodeType): ResolvedInvoiceCounts => {
    const getStats = (type: InvoiceNodeType) => {
      switch (type) {
        case InvoiceNodeType.OutboundShipment:
          return db.get.statistics.outboundShipment;
        case InvoiceNodeType.InboundShipment:
          return db.get.statistics.inboundShipment;
        default:
          throw new Error('Invoice type not supported!');
      }
    };

    return {
      __typename: 'InvoiceCounts',
      ...getStats(type),
    };
  },
  stock: (): ResolvedStockCounts => ({
    __typename: 'StockCountsConnector',
    ...db.get.statistics.stock,
  }),
};
