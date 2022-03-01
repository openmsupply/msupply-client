import * as Types from '@openmsupply-client/common';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type OutboundShipmentLineFragment = { __typename: 'InvoiceLineNode', type: Types.InvoiceLineNodeType, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemCode: string, itemId: string, itemName: string, numberOfPacks: number, packSize: number, note?: string | null, invoiceId: string, locationName?: string | null, sellPricePerPack: number, item: { __typename: 'ItemNode', id: string, name: string, code: string, isVisible: boolean, unitName?: string | null, availableBatches: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, availableNumberOfPacks: number, costPricePerPack: number, itemId: string, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, expiryDate?: string | null }> } }, location?: { __typename: 'LocationNode', id: string, name: string, code: string, onHold: boolean, stock: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, costPricePerPack: number, itemId: string, availableNumberOfPacks: number, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number }> } } | null, stockLine?: { __typename: 'StockLineNode', availableNumberOfPacks: number, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemId: string, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, onHold: boolean, note?: string | null } | null };

export type OutboundShipmentFragment = { __typename: 'InvoiceNode', id: string, comment?: string | null, createdDatetime: string, allocatedDatetime?: string | null, deliveredDatetime?: string | null, pickedDatetime?: string | null, shippedDatetime?: string | null, verifiedDatetime?: string | null, invoiceNumber: number, colour?: string | null, onHold: boolean, otherPartyId: string, otherPartyName: string, status: Types.InvoiceNodeStatus, theirReference?: string | null, type: Types.InvoiceNodeType, lines: { __typename: 'InvoiceLineConnector', totalCount: number, nodes: Array<{ __typename: 'InvoiceLineNode', type: Types.InvoiceLineNodeType, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemCode: string, itemId: string, itemName: string, numberOfPacks: number, packSize: number, note?: string | null, invoiceId: string, locationName?: string | null, sellPricePerPack: number, item: { __typename: 'ItemNode', id: string, name: string, code: string, isVisible: boolean, unitName?: string | null, availableBatches: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, availableNumberOfPacks: number, costPricePerPack: number, itemId: string, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, expiryDate?: string | null }> } }, location?: { __typename: 'LocationNode', id: string, name: string, code: string, onHold: boolean, stock: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, costPricePerPack: number, itemId: string, availableNumberOfPacks: number, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number }> } } | null, stockLine?: { __typename: 'StockLineNode', availableNumberOfPacks: number, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemId: string, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, onHold: boolean, note?: string | null } | null }> }, otherParty: { __typename: 'NameNode', id: string, name: string, code: string, isCustomer: boolean, isSupplier: boolean }, pricing: { __typename: 'InvoicePricingNode', totalAfterTax: number, totalBeforeTax: number, stockTotalBeforeTax: number, stockTotalAfterTax: number, serviceTotalAfterTax: number, serviceTotalBeforeTax: number } };

export type OutboundShipmentRowFragment = { __typename: 'InvoiceNode', comment?: string | null, createdDatetime: string, allocatedDatetime?: string | null, deliveredDatetime?: string | null, pickedDatetime?: string | null, shippedDatetime?: string | null, verifiedDatetime?: string | null, id: string, invoiceNumber: number, otherPartyId: string, otherPartyName: string, theirReference?: string | null, type: Types.InvoiceNodeType, status: Types.InvoiceNodeStatus, colour?: string | null, pricing: { __typename: 'InvoicePricingNode', totalAfterTax: number, totalBeforeTax: number, stockTotalBeforeTax: number, stockTotalAfterTax: number, serviceTotalAfterTax: number, serviceTotalBeforeTax: number } };

export type InvoicesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  key: Types.InvoiceSortFieldInput;
  desc?: Types.InputMaybe<Types.Scalars['Boolean']>;
  filter?: Types.InputMaybe<Types.InvoiceFilterInput>;
  storeId: Types.Scalars['String'];
}>;


export type InvoicesQuery = { __typename: 'Queries', invoices: { __typename: 'InvoiceConnector', totalCount: number, nodes: Array<{ __typename: 'InvoiceNode', comment?: string | null, createdDatetime: string, allocatedDatetime?: string | null, deliveredDatetime?: string | null, pickedDatetime?: string | null, shippedDatetime?: string | null, verifiedDatetime?: string | null, id: string, invoiceNumber: number, otherPartyId: string, otherPartyName: string, theirReference?: string | null, type: Types.InvoiceNodeType, status: Types.InvoiceNodeStatus, colour?: string | null, pricing: { __typename: 'InvoicePricingNode', totalAfterTax: number, totalBeforeTax: number, stockTotalBeforeTax: number, stockTotalAfterTax: number, serviceTotalAfterTax: number, serviceTotalBeforeTax: number } }> } };

export type InvoiceQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  storeId: Types.Scalars['String'];
}>;


export type InvoiceQuery = { __typename: 'Queries', invoice: { __typename: 'InvoiceNode', id: string, comment?: string | null, createdDatetime: string, allocatedDatetime?: string | null, deliveredDatetime?: string | null, pickedDatetime?: string | null, shippedDatetime?: string | null, verifiedDatetime?: string | null, invoiceNumber: number, colour?: string | null, onHold: boolean, otherPartyId: string, otherPartyName: string, status: Types.InvoiceNodeStatus, theirReference?: string | null, type: Types.InvoiceNodeType, lines: { __typename: 'InvoiceLineConnector', totalCount: number, nodes: Array<{ __typename: 'InvoiceLineNode', type: Types.InvoiceLineNodeType, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemCode: string, itemId: string, itemName: string, numberOfPacks: number, packSize: number, note?: string | null, invoiceId: string, locationName?: string | null, sellPricePerPack: number, item: { __typename: 'ItemNode', id: string, name: string, code: string, isVisible: boolean, unitName?: string | null, availableBatches: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, availableNumberOfPacks: number, costPricePerPack: number, itemId: string, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, expiryDate?: string | null }> } }, location?: { __typename: 'LocationNode', id: string, name: string, code: string, onHold: boolean, stock: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, costPricePerPack: number, itemId: string, availableNumberOfPacks: number, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number }> } } | null, stockLine?: { __typename: 'StockLineNode', availableNumberOfPacks: number, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemId: string, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, onHold: boolean, note?: string | null } | null }> }, otherParty: { __typename: 'NameNode', id: string, name: string, code: string, isCustomer: boolean, isSupplier: boolean }, pricing: { __typename: 'InvoicePricingNode', totalAfterTax: number, totalBeforeTax: number, stockTotalBeforeTax: number, stockTotalAfterTax: number, serviceTotalAfterTax: number, serviceTotalBeforeTax: number } } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'RecordNotFound', description: string } } };

export type OutboundByNumberQueryVariables = Types.Exact<{
  invoiceNumber: Types.Scalars['Int'];
  storeId: Types.Scalars['String'];
}>;


export type OutboundByNumberQuery = { __typename: 'Queries', invoiceByNumber: { __typename: 'InvoiceNode', id: string, comment?: string | null, createdDatetime: string, allocatedDatetime?: string | null, deliveredDatetime?: string | null, pickedDatetime?: string | null, shippedDatetime?: string | null, verifiedDatetime?: string | null, invoiceNumber: number, colour?: string | null, onHold: boolean, otherPartyId: string, otherPartyName: string, status: Types.InvoiceNodeStatus, theirReference?: string | null, type: Types.InvoiceNodeType, lines: { __typename: 'InvoiceLineConnector', totalCount: number, nodes: Array<{ __typename: 'InvoiceLineNode', type: Types.InvoiceLineNodeType, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemCode: string, itemId: string, itemName: string, numberOfPacks: number, packSize: number, note?: string | null, invoiceId: string, locationName?: string | null, sellPricePerPack: number, item: { __typename: 'ItemNode', id: string, name: string, code: string, isVisible: boolean, unitName?: string | null, availableBatches: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, availableNumberOfPacks: number, costPricePerPack: number, itemId: string, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, expiryDate?: string | null }> } }, location?: { __typename: 'LocationNode', id: string, name: string, code: string, onHold: boolean, stock: { __typename: 'StockLineConnector', totalCount: number, nodes: Array<{ __typename: 'StockLineNode', id: string, costPricePerPack: number, itemId: string, availableNumberOfPacks: number, onHold: boolean, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number }> } } | null, stockLine?: { __typename: 'StockLineNode', availableNumberOfPacks: number, batch?: string | null, costPricePerPack: number, expiryDate?: string | null, id: string, itemId: string, packSize: number, sellPricePerPack: number, storeId: string, totalNumberOfPacks: number, onHold: boolean, note?: string | null } | null }> }, otherParty: { __typename: 'NameNode', id: string, name: string, code: string, isCustomer: boolean, isSupplier: boolean }, pricing: { __typename: 'InvoicePricingNode', totalAfterTax: number, totalBeforeTax: number, stockTotalBeforeTax: number, stockTotalAfterTax: number, serviceTotalAfterTax: number, serviceTotalBeforeTax: number } } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'RecordNotFound', description: string } } };

export type InsertOutboundShipmentMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  otherPartyId: Types.Scalars['String'];
  storeId: Types.Scalars['String'];
}>;


export type InsertOutboundShipmentMutation = { __typename: 'Mutations', insertOutboundShipment: { __typename: 'InsertOutboundShipmentError', error: { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'ForeignKeyError', description: string, key: Types.ForeignKey } | { __typename: 'OtherPartyCannotBeThisStoreError', description: string } | { __typename: 'OtherPartyNotACustomerError', description: string, otherParty: { __typename: 'NameNode', code: string, id: string, isCustomer: boolean, isSupplier: boolean, name: string } } | { __typename: 'RecordAlreadyExist', description: string } } | { __typename: 'InvoiceNode', id: string, invoiceNumber: number } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'RecordNotFound', description: string } } };

export type UpdateOutboundShipmentMutationVariables = Types.Exact<{
  input: Types.UpdateOutboundShipmentInput;
  storeId: Types.Scalars['String'];
}>;


export type UpdateOutboundShipmentMutation = { __typename: 'Mutations', updateOutboundShipment: { __typename: 'InvoiceNode', id: string } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'UpdateOutboundShipmentError', error: { __typename: 'CanOnlyChangeToAllocatedWhenNoUnallocatedLines', description: string } | { __typename: 'CanOnlyEditInvoicesInLoggedInStoreError', description: string } | { __typename: 'CannotChangeStatusOfInvoiceOnHold', description: string } | { __typename: 'CannotReverseInvoiceStatus', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceIsNotEditable', description: string } | { __typename: 'InvoiceLineHasNoStockLineError', description: string } | { __typename: 'NotAnOutboundShipmentError', description: string } | { __typename: 'OtherPartyCannotBeThisStoreError', description: string } | { __typename: 'OtherPartyNotACustomerError', description: string } | { __typename: 'RecordNotFound', description: string } } };

export type DeleteOutboundShipmentsMutationVariables = Types.Exact<{
  storeId: Types.Scalars['String'];
  deleteOutboundShipments: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type DeleteOutboundShipmentsMutation = { __typename: 'Mutations', batchOutboundShipment: { __typename: 'BatchOutboundShipmentResponse', deleteOutboundShipments?: Array<{ __typename: 'DeleteOutboundShipmentResponseWithId', id: string }> | null } };

export type UpsertOutboundShipmentMutationVariables = Types.Exact<{
  storeId: Types.Scalars['String'];
  input: Types.BatchOutboundShipmentInput;
}>;


export type UpsertOutboundShipmentMutation = { __typename: 'Mutations', batchOutboundShipment: { __typename: 'BatchOutboundShipmentResponse', insertOutboundShipmentUnallocatedLines?: Array<{ __typename: 'InsertOutboundShipmentUnallocatedLineResponseWithId', id: string, response: { __typename: 'InsertOutboundShipmentUnallocatedLineError', error: { __typename: 'ForeignKeyError', description: string } | { __typename: 'UnallocatedLineForItemAlreadyExists', description: string } | { __typename: 'UnallocatedLinesOnlyEditableInNewInvoice', description: string } } | { __typename: 'InvoiceLineNode', id: string } }> | null, deleteOutboundShipmentLines?: Array<{ __typename: 'DeleteOutboundShipmentLineResponseWithId', id: string, response: { __typename: 'DeleteOutboundShipmentLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'InvoiceLineBelongsToAnotherInvoice', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'DeleteResponse', id: string } }> | null, deleteOutboundShipmentServiceLines?: Array<{ __typename: 'DeleteOutboundShipmentServiceLineResponseWithId', id: string, response: { __typename: 'DeleteOutboundShipmentServiceLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'InvoiceLineBelongsToAnotherInvoice', description: string } | { __typename: 'NotAServiceItem', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'DeleteResponse', id: string } }> | null, deleteOutboundShipmentUnallocatedLines?: Array<{ __typename: 'DeleteOutboundShipmentUnallocatedLineResponseWithId', id: string, response: { __typename: 'DeleteOutboundShipmentUnallocatedLineError' } | { __typename: 'DeleteResponse', id: string } }> | null, deleteOutboundShipments?: Array<{ __typename: 'DeleteOutboundShipmentResponseWithId', id: string, response: { __typename: 'DeleteOutboundShipmentError', error: { __typename: 'CannotDeleteInvoiceWithLines', description: string } | { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'InternalError', description: string } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'DeleteResponse', id: string } }> | null, insertOutboundShipmentLines?: Array<{ __typename: 'InsertOutboundShipmentLineResponseWithId', id: string, response: { __typename: 'InsertOutboundShipmentLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'ItemDoesNotMatchStockLine', description: string } | { __typename: 'LocationIsOnHold', description: string } | { __typename: 'LocationNotFound', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'NotEnoughStockForReduction', description: string } | { __typename: 'RangeError', description: string } | { __typename: 'RecordAlreadyExist', description: string } | { __typename: 'StockLineAlreadyExistsInInvoice', description: string } | { __typename: 'StockLineDoesNotBelongToCurrentStore', description: string } | { __typename: 'StockLineIsOnHold', description: string } } | { __typename: 'InvoiceLineNode' } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string } | { __typename: 'RecordNotFound', description: string } } }> | null, insertOutboundShipmentServiceLines?: Array<{ __typename: 'InsertOutboundShipmentServiceLineResponseWithId', id: string, response: { __typename: 'InsertOutboundShipmentServiceLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InternalError', description: string } | { __typename: 'NotAServiceItem', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordAlreadyExist', description: string } } | { __typename: 'InvoiceLineNode' } }> | null, insertOutboundShipments?: Array<{ __typename: 'InsertOutboundShipmentResponseWithId', id: string, response: { __typename: 'InsertOutboundShipmentError', error: { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'OtherPartyCannotBeThisStoreError', description: string } | { __typename: 'OtherPartyNotACustomerError', description: string } | { __typename: 'RecordAlreadyExist', description: string } } | { __typename: 'InvoiceNode' } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string } | { __typename: 'RecordNotFound', description: string } } }> | null, updateOutboundShipmentLines?: Array<{ __typename: 'UpdateOutboundShipmentLineResponseWithId', id: string, response: { __typename: 'InvoiceLineNode' } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'UpdateOutboundShipmentLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'InvoiceLineBelongsToAnotherInvoice', description: string } | { __typename: 'ItemDoesNotMatchStockLine', description: string } | { __typename: 'LineDoesNotReferenceStockLine', description: string } | { __typename: 'LocationIsOnHold', description: string } | { __typename: 'LocationNotFound', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'NotEnoughStockForReduction', description: string } | { __typename: 'RangeError', description: string } | { __typename: 'RecordNotFound', description: string } | { __typename: 'StockLineAlreadyExistsInInvoice', description: string } | { __typename: 'StockLineDoesNotBelongToCurrentStore', description: string } | { __typename: 'StockLineIsOnHold', description: string } } }> | null, updateOutboundShipmentServiceLines?: Array<{ __typename: 'UpdateOutboundShipmentServiceLineResponseWithId', id: string, response: { __typename: 'InvoiceLineNode' } | { __typename: 'UpdateOutboundShipmentServiceLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InternalError', description: string } | { __typename: 'InvoiceLineBelongsToAnotherInvoice', description: string } | { __typename: 'NotAServiceItem', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordNotFound', description: string } } }> | null, updateOutboundShipmentUnallocatedLines?: Array<{ __typename: 'UpdateOutboundShipmentUnallocatedLineResponseWithId', id: string, response: { __typename: 'InvoiceLineNode' } | { __typename: 'UpdateOutboundShipmentUnallocatedLineError', error: { __typename: 'RecordDoesNotExist', description: string } } }> | null, updateOutboundShipments?: Array<{ __typename: 'UpdateOutboundShipmentResponseWithId', id: string, response: { __typename: 'InvoiceNode' } | { __typename: 'NodeError', error: { __typename: 'DatabaseError', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'UpdateOutboundShipmentError', error: { __typename: 'CanOnlyChangeToAllocatedWhenNoUnallocatedLines', description: string } | { __typename: 'CanOnlyEditInvoicesInLoggedInStoreError', description: string } | { __typename: 'CannotChangeStatusOfInvoiceOnHold', description: string } | { __typename: 'CannotReverseInvoiceStatus', description: string } | { __typename: 'DatabaseError', description: string } | { __typename: 'ForeignKeyError', description: string } | { __typename: 'InvoiceIsNotEditable', description: string } | { __typename: 'InvoiceLineHasNoStockLineError', description: string } | { __typename: 'NotAnOutboundShipmentError', description: string } | { __typename: 'OtherPartyCannotBeThisStoreError', description: string } | { __typename: 'OtherPartyNotACustomerError', description: string } | { __typename: 'RecordNotFound', description: string } } }> | null } };

export type DeleteOutboundShipmentLinesMutationVariables = Types.Exact<{
  storeId: Types.Scalars['String'];
  deleteOutboundShipmentLines: Array<Types.DeleteOutboundShipmentLineInput> | Types.DeleteOutboundShipmentLineInput;
}>;


export type DeleteOutboundShipmentLinesMutation = { __typename: 'Mutations', batchOutboundShipment: { __typename: 'BatchOutboundShipmentResponse', deleteOutboundShipmentLines?: Array<{ __typename: 'DeleteOutboundShipmentLineResponseWithId', id: string, response: { __typename: 'DeleteOutboundShipmentLineError', error: { __typename: 'CannotEditInvoice', description: string } | { __typename: 'DatabaseError', description: string, fullError: string } | { __typename: 'ForeignKeyError', description: string, key: Types.ForeignKey } | { __typename: 'InvoiceDoesNotBelongToCurrentStore', description: string } | { __typename: 'InvoiceLineBelongsToAnotherInvoice', description: string } | { __typename: 'NotAnOutboundShipment', description: string } | { __typename: 'RecordNotFound', description: string } } | { __typename: 'DeleteResponse', id: string } }> | null } };

export type InvoiceCountsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String'];
  timezoneOffset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type InvoiceCountsQuery = { __typename: 'Queries', invoiceCounts: { __typename: 'InvoiceCounts', outbound: { __typename: 'OutboundInvoiceCounts', toBePicked: number, created: { __typename: 'InvoiceCountsSummary', today: number, thisWeek: number } } } };

export const OutboundShipmentLineFragmentDoc = gql`
    fragment OutboundShipmentLine on InvoiceLineNode {
  __typename
  type
  batch
  costPricePerPack
  expiryDate
  id
  itemCode
  itemId
  itemName
  numberOfPacks
  packSize
  note
  invoiceId
  locationName
  sellPricePerPack
  type
  item {
    __typename
    id
    name
    code
    isVisible
    unitName
    availableBatches(storeId: $storeId) {
      totalCount
      nodes {
        id
        availableNumberOfPacks
        costPricePerPack
        itemId
        onHold
        packSize
        sellPricePerPack
        storeId
        totalNumberOfPacks
        expiryDate
      }
    }
  }
  location {
    __typename
    id
    name
    code
    onHold
    stock {
      __typename
      totalCount
      nodes {
        id
        costPricePerPack
        itemId
        availableNumberOfPacks
        onHold
        packSize
        sellPricePerPack
        storeId
        totalNumberOfPacks
      }
    }
  }
  stockLine {
    __typename
    availableNumberOfPacks
    batch
    costPricePerPack
    expiryDate
    id
    itemId
    packSize
    sellPricePerPack
    storeId
    totalNumberOfPacks
    onHold
    note
  }
}
    `;
export const OutboundShipmentFragmentDoc = gql`
    fragment OutboundShipment on InvoiceNode {
  __typename
  id
  comment
  createdDatetime
  allocatedDatetime
  deliveredDatetime
  pickedDatetime
  shippedDatetime
  verifiedDatetime
  invoiceNumber
  colour
  onHold
  otherPartyId
  otherPartyName
  status
  theirReference
  type
  lines {
    __typename
    nodes {
      ...OutboundShipmentLine
    }
    totalCount
  }
  otherParty {
    __typename
    id
    name
    code
    isCustomer
    isSupplier
  }
  pricing {
    __typename
    totalAfterTax
    totalBeforeTax
    stockTotalBeforeTax
    stockTotalAfterTax
    serviceTotalAfterTax
    serviceTotalBeforeTax
  }
}
    ${OutboundShipmentLineFragmentDoc}`;
export const OutboundShipmentRowFragmentDoc = gql`
    fragment OutboundShipmentRow on InvoiceNode {
  __typename
  comment
  createdDatetime
  allocatedDatetime
  deliveredDatetime
  pickedDatetime
  shippedDatetime
  verifiedDatetime
  id
  invoiceNumber
  otherPartyId
  otherPartyName
  theirReference
  type
  status
  colour
  pricing {
    __typename
    totalAfterTax
    totalBeforeTax
    stockTotalBeforeTax
    stockTotalAfterTax
    serviceTotalAfterTax
    serviceTotalBeforeTax
  }
}
    `;
export const InvoicesDocument = gql`
    query invoices($first: Int, $offset: Int, $key: InvoiceSortFieldInput!, $desc: Boolean, $filter: InvoiceFilterInput, $storeId: String!) {
  invoices(
    page: {first: $first, offset: $offset}
    sort: {key: $key, desc: $desc}
    filter: $filter
    storeId: $storeId
  ) {
    ... on InvoiceConnector {
      __typename
      nodes {
        ...OutboundShipmentRow
      }
      totalCount
    }
  }
}
    ${OutboundShipmentRowFragmentDoc}`;
export const InvoiceDocument = gql`
    query invoice($id: String!, $storeId: String!) {
  invoice(id: $id, storeId: $storeId) {
    __typename
    ... on NodeError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on RecordNotFound {
          __typename
          description
        }
      }
    }
    ... on InvoiceNode {
      ...OutboundShipment
    }
  }
}
    ${OutboundShipmentFragmentDoc}`;
export const OutboundByNumberDocument = gql`
    query outboundByNumber($invoiceNumber: Int!, $storeId: String!) {
  invoiceByNumber(
    invoiceNumber: $invoiceNumber
    storeId: $storeId
    type: OUTBOUND_SHIPMENT
  ) {
    __typename
    ... on NodeError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on RecordNotFound {
          __typename
          description
        }
      }
    }
    ... on InvoiceNode {
      ...OutboundShipment
    }
  }
}
    ${OutboundShipmentFragmentDoc}`;
export const InsertOutboundShipmentDocument = gql`
    mutation insertOutboundShipment($id: String!, $otherPartyId: String!, $storeId: String!) {
  insertOutboundShipment(
    storeId: $storeId
    input: {id: $id, otherPartyId: $otherPartyId}
  ) {
    __typename
    ... on InvoiceNode {
      id
      invoiceNumber
    }
    ... on InsertOutboundShipmentError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on ForeignKeyError {
          __typename
          description
          key
        }
        ... on OtherPartyCannotBeThisStoreError {
          __typename
          description
        }
        ... on OtherPartyNotACustomerError {
          __typename
          description
          otherParty {
            code
            id
            isCustomer
            isSupplier
            name
          }
        }
        ... on RecordAlreadyExist {
          __typename
          description
        }
      }
    }
    ... on NodeError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on RecordNotFound {
          __typename
          description
        }
      }
    }
  }
}
    `;
export const UpdateOutboundShipmentDocument = gql`
    mutation updateOutboundShipment($input: UpdateOutboundShipmentInput!, $storeId: String!) {
  updateOutboundShipment(input: $input, storeId: $storeId) {
    ... on InvoiceNode {
      __typename
      id
    }
    ... on NodeError {
      __typename
      error {
        description
        ... on DatabaseError {
          __typename
          description
          fullError
        }
        ... on RecordNotFound {
          __typename
          description
        }
      }
    }
    ... on UpdateOutboundShipmentError {
      __typename
      error {
        description
      }
    }
  }
}
    `;
export const DeleteOutboundShipmentsDocument = gql`
    mutation deleteOutboundShipments($storeId: String!, $deleteOutboundShipments: [String!]!) {
  batchOutboundShipment(
    storeId: $storeId
    input: {deleteOutboundShipments: $deleteOutboundShipments}
  ) {
    __typename
    deleteOutboundShipments {
      __typename
      id
    }
  }
}
    `;
export const UpsertOutboundShipmentDocument = gql`
    mutation upsertOutboundShipment($storeId: String!, $input: BatchOutboundShipmentInput!) {
  batchOutboundShipment(storeId: $storeId, input: $input) {
    __typename
    insertOutboundShipmentUnallocatedLines {
      id
      response {
        ... on InsertOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
          }
        }
        ... on InvoiceLineNode {
          id
        }
      }
    }
    deleteOutboundShipmentLines {
      id
      response {
        ... on DeleteOutboundShipmentLineError {
          __typename
          error {
            description
          }
        }
        ... on DeleteResponse {
          id
        }
      }
    }
    deleteOutboundShipmentServiceLines {
      id
      response {
        ... on DeleteResponse {
          id
        }
        ... on DeleteOutboundShipmentServiceLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    deleteOutboundShipmentUnallocatedLines {
      id
      response {
        ... on DeleteResponse {
          id
        }
      }
    }
    deleteOutboundShipments {
      id
      response {
        ... on DeleteResponse {
          id
        }
        ... on DeleteOutboundShipmentError {
          __typename
          error {
            description
          }
        }
      }
    }
    insertOutboundShipmentLines {
      id
      response {
        ... on InsertOutboundShipmentLineError {
          __typename
          error {
            description
          }
        }
        ... on NodeError {
          __typename
          error {
            description
          }
        }
      }
    }
    insertOutboundShipmentServiceLines {
      id
      response {
        ... on InsertOutboundShipmentServiceLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    insertOutboundShipments {
      id
      response {
        ... on InsertOutboundShipmentError {
          __typename
          error {
            description
          }
        }
        ... on NodeError {
          __typename
          error {
            description
          }
        }
      }
    }
    updateOutboundShipmentLines {
      id
      response {
        ... on NodeError {
          __typename
          error {
            description
          }
        }
        ... on UpdateOutboundShipmentLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    updateOutboundShipmentServiceLines {
      id
      response {
        ... on UpdateOutboundShipmentServiceLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    updateOutboundShipmentUnallocatedLines {
      id
      response {
        ... on UpdateOutboundShipmentUnallocatedLineError {
          __typename
          error {
            description
          }
        }
      }
    }
    updateOutboundShipments {
      id
      response {
        ... on UpdateOutboundShipmentError {
          __typename
          error {
            description
          }
        }
        ... on NodeError {
          __typename
          error {
            description
          }
        }
      }
    }
  }
}
    `;
export const DeleteOutboundShipmentLinesDocument = gql`
    mutation deleteOutboundShipmentLines($storeId: String!, $deleteOutboundShipmentLines: [DeleteOutboundShipmentLineInput!]!) {
  batchOutboundShipment(
    storeId: $storeId
    input: {deleteOutboundShipmentLines: $deleteOutboundShipmentLines}
  ) {
    deleteOutboundShipmentLines {
      id
      response {
        ... on DeleteOutboundShipmentLineError {
          __typename
          error {
            description
            ... on RecordNotFound {
              __typename
              description
            }
            ... on CannotEditInvoice {
              __typename
              description
            }
            ... on DatabaseError {
              __typename
              description
              fullError
            }
            ... on ForeignKeyError {
              __typename
              description
              key
            }
            ... on InvoiceDoesNotBelongToCurrentStore {
              __typename
              description
            }
            ... on InvoiceLineBelongsToAnotherInvoice {
              __typename
              description
            }
            ... on NotAnOutboundShipment {
              __typename
              description
            }
          }
        }
        ... on DeleteResponse {
          id
        }
      }
    }
  }
}
    `;
export const InvoiceCountsDocument = gql`
    query invoiceCounts($storeId: String!, $timezoneOffset: Int) {
  invoiceCounts(storeId: $storeId, timezoneOffset: $timezoneOffset) {
    outbound {
      created {
        today
        thisWeek
      }
      toBePicked
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    invoices(variables: InvoicesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InvoicesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InvoicesQuery>(InvoicesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'invoices');
    },
    invoice(variables: InvoiceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InvoiceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InvoiceQuery>(InvoiceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'invoice');
    },
    outboundByNumber(variables: OutboundByNumberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OutboundByNumberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OutboundByNumberQuery>(OutboundByNumberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'outboundByNumber');
    },
    insertOutboundShipment(variables: InsertOutboundShipmentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertOutboundShipmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertOutboundShipmentMutation>(InsertOutboundShipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'insertOutboundShipment');
    },
    updateOutboundShipment(variables: UpdateOutboundShipmentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOutboundShipmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOutboundShipmentMutation>(UpdateOutboundShipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateOutboundShipment');
    },
    deleteOutboundShipments(variables: DeleteOutboundShipmentsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteOutboundShipmentsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOutboundShipmentsMutation>(DeleteOutboundShipmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteOutboundShipments');
    },
    upsertOutboundShipment(variables: UpsertOutboundShipmentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertOutboundShipmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertOutboundShipmentMutation>(UpsertOutboundShipmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upsertOutboundShipment');
    },
    deleteOutboundShipmentLines(variables: DeleteOutboundShipmentLinesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteOutboundShipmentLinesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOutboundShipmentLinesMutation>(DeleteOutboundShipmentLinesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteOutboundShipmentLines');
    },
    invoiceCounts(variables: InvoiceCountsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InvoiceCountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<InvoiceCountsQuery>(InvoiceCountsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'invoiceCounts');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInvoicesQuery((req, res, ctx) => {
 *   const { first, offset, key, desc, filter, storeId } = req.variables;
 *   return res(
 *     ctx.data({ invoices })
 *   )
 * })
 */
export const mockInvoicesQuery = (resolver: ResponseResolver<GraphQLRequest<InvoicesQueryVariables>, GraphQLContext<InvoicesQuery>, any>) =>
  graphql.query<InvoicesQuery, InvoicesQueryVariables>(
    'invoices',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInvoiceQuery((req, res, ctx) => {
 *   const { id, storeId } = req.variables;
 *   return res(
 *     ctx.data({ invoice })
 *   )
 * })
 */
export const mockInvoiceQuery = (resolver: ResponseResolver<GraphQLRequest<InvoiceQueryVariables>, GraphQLContext<InvoiceQuery>, any>) =>
  graphql.query<InvoiceQuery, InvoiceQueryVariables>(
    'invoice',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOutboundByNumberQuery((req, res, ctx) => {
 *   const { invoiceNumber, storeId } = req.variables;
 *   return res(
 *     ctx.data({ invoiceByNumber })
 *   )
 * })
 */
export const mockOutboundByNumberQuery = (resolver: ResponseResolver<GraphQLRequest<OutboundByNumberQueryVariables>, GraphQLContext<OutboundByNumberQuery>, any>) =>
  graphql.query<OutboundByNumberQuery, OutboundByNumberQueryVariables>(
    'outboundByNumber',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInsertOutboundShipmentMutation((req, res, ctx) => {
 *   const { id, otherPartyId, storeId } = req.variables;
 *   return res(
 *     ctx.data({ insertOutboundShipment })
 *   )
 * })
 */
export const mockInsertOutboundShipmentMutation = (resolver: ResponseResolver<GraphQLRequest<InsertOutboundShipmentMutationVariables>, GraphQLContext<InsertOutboundShipmentMutation>, any>) =>
  graphql.mutation<InsertOutboundShipmentMutation, InsertOutboundShipmentMutationVariables>(
    'insertOutboundShipment',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateOutboundShipmentMutation((req, res, ctx) => {
 *   const { input, storeId } = req.variables;
 *   return res(
 *     ctx.data({ updateOutboundShipment })
 *   )
 * })
 */
export const mockUpdateOutboundShipmentMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateOutboundShipmentMutationVariables>, GraphQLContext<UpdateOutboundShipmentMutation>, any>) =>
  graphql.mutation<UpdateOutboundShipmentMutation, UpdateOutboundShipmentMutationVariables>(
    'updateOutboundShipment',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteOutboundShipmentsMutation((req, res, ctx) => {
 *   const { storeId, deleteOutboundShipments } = req.variables;
 *   return res(
 *     ctx.data({ batchOutboundShipment })
 *   )
 * })
 */
export const mockDeleteOutboundShipmentsMutation = (resolver: ResponseResolver<GraphQLRequest<DeleteOutboundShipmentsMutationVariables>, GraphQLContext<DeleteOutboundShipmentsMutation>, any>) =>
  graphql.mutation<DeleteOutboundShipmentsMutation, DeleteOutboundShipmentsMutationVariables>(
    'deleteOutboundShipments',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpsertOutboundShipmentMutation((req, res, ctx) => {
 *   const { storeId, input } = req.variables;
 *   return res(
 *     ctx.data({ batchOutboundShipment })
 *   )
 * })
 */
export const mockUpsertOutboundShipmentMutation = (resolver: ResponseResolver<GraphQLRequest<UpsertOutboundShipmentMutationVariables>, GraphQLContext<UpsertOutboundShipmentMutation>, any>) =>
  graphql.mutation<UpsertOutboundShipmentMutation, UpsertOutboundShipmentMutationVariables>(
    'upsertOutboundShipment',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteOutboundShipmentLinesMutation((req, res, ctx) => {
 *   const { storeId, deleteOutboundShipmentLines } = req.variables;
 *   return res(
 *     ctx.data({ batchOutboundShipment })
 *   )
 * })
 */
export const mockDeleteOutboundShipmentLinesMutation = (resolver: ResponseResolver<GraphQLRequest<DeleteOutboundShipmentLinesMutationVariables>, GraphQLContext<DeleteOutboundShipmentLinesMutation>, any>) =>
  graphql.mutation<DeleteOutboundShipmentLinesMutation, DeleteOutboundShipmentLinesMutationVariables>(
    'deleteOutboundShipmentLines',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInvoiceCountsQuery((req, res, ctx) => {
 *   const { storeId, timezoneOffset } = req.variables;
 *   return res(
 *     ctx.data({ invoiceCounts })
 *   )
 * })
 */
export const mockInvoiceCountsQuery = (resolver: ResponseResolver<GraphQLRequest<InvoiceCountsQueryVariables>, GraphQLContext<InvoiceCountsQuery>, any>) =>
  graphql.query<InvoiceCountsQuery, InvoiceCountsQueryVariables>(
    'invoiceCounts',
    resolver
  )
