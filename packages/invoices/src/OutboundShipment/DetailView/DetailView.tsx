import React, { FC } from 'react';
import { useParams } from 'react-router';
import {
  Column,
  TableProvider,
  createTableStore,
  useColumns,
  useDocument,
  useToggle,
  GenericColumnKey,
  getNotePopoverColumn,
  getRowExpandColumn,
  useOmSupplyApi,
} from '@openmsupply-client/common';
import { reducer, OutboundAction } from './reducer';
import { getOutboundShipmentDetailViewApi } from '../../api';
import { GeneralTab } from './tabs/GeneralTab';
import { ItemDetailsModal } from './modals/ItemDetailsModal';

import { OutboundShipmentSummaryItem } from './types';
import { Toolbar } from './Toolbar';
import { isInvoiceEditable } from '../utils';
import { Footer } from './Footer';
import { AppBarButtons } from './AppBarButtons';
import { SidePanel } from './SidePanel';

const useDraftOutbound = () => {
  const { id } = useParams();
  const { api } = useOmSupplyApi();

  const { draft, save, dispatch, state } = useDocument(
    ['invoice', id],
    reducer,
    getOutboundShipmentDetailViewApi(api)
  );

  const onChangeSortBy = (column: Column<OutboundShipmentSummaryItem>) => {
    dispatch(OutboundAction.onSortBy(column));
  };

  return { draft, save, dispatch, onChangeSortBy, sortBy: state.sortBy };
};

export const DetailView: FC = () => {
  const { draft, onChangeSortBy, save, sortBy } = useDraftOutbound();

  const itemModalControl = useToggle();

  const columns = useColumns(
    [
      getNotePopoverColumn<OutboundShipmentSummaryItem>(),
      'itemCode',
      'itemName',
      'batch',
      'expiryDate',
      'locationDescription',
      'sellPricePerPack',
      'packSize',
      'itemUnit',
      'unitQuantity',
      'numberOfPacks',
      getRowExpandColumn<OutboundShipmentSummaryItem>(),
      GenericColumnKey.Selection,
    ],
    { onChangeSortBy, sortBy },
    [sortBy]
  );

  return draft ? (
    <TableProvider createStore={createTableStore}>
      <AppBarButtons
        isDisabled={!isInvoiceEditable(draft)}
        onAddItem={itemModalControl.toggleOn}
      />

      <ItemDetailsModal
        isOpen={itemModalControl.isOn}
        onClose={itemModalControl.toggleOff}
        upsertInvoiceLine={line => draft.upsertLine?.(line)}
      />

      <Toolbar draft={draft} />

      <GeneralTab columns={columns} data={draft.items} />

      <Footer draft={draft} save={save} />
      <SidePanel draft={draft} />
    </TableProvider>
  ) : null;
};
