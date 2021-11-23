import {
  getUnitQuantity,
  getSumOfKeyReducer,
} from '@openmsupply-client/common/src/utils/arrays/reducers';
import { Dispatch } from 'react';
import { produce } from 'immer';
import {
  Column,
  DocumentActionSet,
  DocumentActionType,
  SortBy,
  ifTheSameElseDefault,
  Item,
  arrayToRecord,
  getDataSorter,
} from '@openmsupply-client/common';
import { placeholderInvoice } from '../../utils';
import {
  Invoice,
  InvoiceLine,
  ActionType,
  OutboundShipment,
  OutboundShipmentAction,
  OutboundShipmentSummaryItem,
  OutboundShipmentRow,
} from '../../types';

const getExistingLine = (
  items: OutboundShipmentSummaryItem[],
  line: OutboundShipmentRow
): {
  existingSummaryItem?: OutboundShipmentSummaryItem;
  existingRow?: OutboundShipmentRow;
} => {
  const existingSummaryItem = items.find(
    item => !!item.batches[line.id] || item.itemId === line.itemId
  );

  if (!existingSummaryItem) return {};

  let existingRow = existingSummaryItem.batches[line.id];

  if (existingRow) return { existingRow, existingSummaryItem };

  existingRow = Object.values(existingSummaryItem.batches).find(
    ({ stockLineId }) => stockLineId === line.stockLineId
  );

  return { existingRow, existingSummaryItem };
};

export const recalculateSummary = (
  summaryItem: OutboundShipmentSummaryItem
): { unitQuantity: number; numberOfPacks: number } => {
  const unitQuantity = Object.values<OutboundShipmentRow>(
    summaryItem.batches
  ).reduce(getUnitQuantity, 0);

  const numberOfPacks = Object.values<OutboundShipmentRow>(
    summaryItem.batches
  ).reduce(getSumOfKeyReducer('numberOfPacks'), 0);

  return { unitQuantity, numberOfPacks };
};

export const OutboundAction = {
  upsertLine: (line: OutboundShipmentRow): OutboundShipmentAction => ({
    type: ActionType.UpsertLine,
    payload: { line },
  }),

  deleteLine: (line: OutboundShipmentRow): OutboundShipmentAction => ({
    type: ActionType.DeleteLine,
    payload: { line },
  }),

  // TODO: This type is not correct and should be the keyof OutboundShipment
  // or possibly a smaller sub set of 'allowable' updatable keys. For example
  // the date of a status change should not be editable.
  updateInvoice: <K extends keyof Invoice>(
    key: K,
    value: Invoice[K]
  ): OutboundShipmentAction => ({
    type: ActionType.UpdateInvoice,
    payload: { key, value },
  }),

  onSortBy: (
    column: Column<OutboundShipmentSummaryItem>
  ): OutboundShipmentAction => ({
    type: ActionType.SortBy,
    payload: { column },
  }),
};

export interface OutboundShipmentStateShape {
  draft: OutboundShipment;
  sortBy: SortBy<OutboundShipmentSummaryItem>;
}

export const itemToSummaryItem = (item: Item): OutboundShipmentSummaryItem => {
  return {
    id: item.id,
    itemId: item.id,
    itemName: item.name,
    itemCode: item.code,
    itemUnit: item.unitName,
    batches: {},
    unitQuantity: 0,
    numberOfPacks: 0,
  };
};

export const createSummaryItem = (
  itemId: string,
  batches: OutboundShipmentRow[] = []
): OutboundShipmentSummaryItem => {
  const item: OutboundShipmentSummaryItem = {
    id: itemId,
    itemId: itemId,
    itemName: ifTheSameElseDefault(batches, 'itemName', ''),
    itemCode: ifTheSameElseDefault(batches, 'itemCode', ''),
    // itemUnit: ifTheSameElseDefault(batches, 'itemUnit', ''),
    batches: arrayToRecord(batches),
    unitQuantity: batches.reduce(getUnitQuantity, 0),
    numberOfPacks: batches.reduce(getSumOfKeyReducer('numberOfPacks'), 0),
    // locationDescription: ifTheSameElseDefault(
    //   batches,
    //   'locationDescription',
    //   undefined
    // ),

    batch: ifTheSameElseDefault(batches, 'batch', '[multiple]'),
    // TODO: Likely should just be a string.
    sellPrice: ifTheSameElseDefault(batches, 'sellPricePerPack', undefined),
    // TODO: Likely should just be a string.
    packSize: ifTheSameElseDefault(batches, 'packSize', undefined),
  };

  return item;
};

export const getInitialState = (): OutboundShipmentStateShape => ({
  draft: placeholderInvoice,
  sortBy: { key: 'numberOfPacks', isDesc: true, direction: 'asc' },
});

export const reducer = (
  data: Invoice = placeholderInvoice,
  dispatch: Dispatch<DocumentActionSet<OutboundShipmentAction>> | null
): ((
  state: OutboundShipmentStateShape | undefined,
  action: DocumentActionSet<OutboundShipmentAction>
) => OutboundShipmentStateShape) =>
  produce(
    (
      state: OutboundShipmentStateShape = getInitialState(),
      action: DocumentActionSet<OutboundShipmentAction>
    ) => {
      switch (action.type) {
        case DocumentActionType.Init: {
          return state;
        }

        case DocumentActionType.Merge: {
          state.draft = {
            ...state.draft,
            ...data,
            status: state.draft.status,
          };

          state.draft.update = (key, value) => {
            dispatch?.(OutboundAction.updateInvoice(key, value));
          };

          state.draft.upsertLine = line =>
            dispatch?.(OutboundAction.upsertLine(line));

          state.draft.deleteLine = line =>
            dispatch?.(OutboundAction.deleteLine(line));

          state.draft.items = data.lines?.reduce((itemsArray, serverLine) => {
            const outboundShipmentRow = createLine(serverLine, state.draft);

            const { existingRow, existingSummaryItem } = getExistingLine(
              itemsArray,
              outboundShipmentRow
            );

            const summaryItem =
              existingSummaryItem ??
              createSummaryItem(serverLine.itemId, [outboundShipmentRow]);

            if (existingRow) {
              delete summaryItem.batches[existingRow.id];
              const newLine = mergeLines(serverLine, existingRow);
              console.log(newLine?.id, newLine);
              summaryItem.batches[newLine.id] = newLine;
            } else {
              summaryItem.batches[outboundShipmentRow.id] = outboundShipmentRow;
            }

            const { unitQuantity, numberOfPacks } =
              recalculateSummary(summaryItem);

            if (!existingSummaryItem) {
              itemsArray.push({
                ...summaryItem,
                unitQuantity,
                numberOfPacks,
              });
            } else {
              existingSummaryItem.unitQuantity = unitQuantity;
              existingSummaryItem.numberOfPacks = numberOfPacks;
            }

            return itemsArray;
          }, state.draft.items);

          break;
        }

        case ActionType.SortBy: {
          const { payload } = action;
          const { column } = payload;

          const { key } = column;

          const { draft, sortBy } = state;
          const { items } = draft;
          const { key: currentSortKey, isDesc: currentIsDesc } = sortBy;

          const newIsDesc = currentSortKey === key ? !currentIsDesc : false;
          const newDirection: 'asc' | 'desc' = newIsDesc ? 'desc' : 'asc';
          const newSortBy: SortBy<OutboundShipmentSummaryItem> = {
            key,
            isDesc: newIsDesc,
            direction: newDirection,
          };

          const newItems = items.sort(
            getDataSorter(
              newSortBy.key as keyof OutboundShipmentSummaryItem,
              !!newSortBy.isDesc
            )
          );

          draft.items = newItems;
          state.sortBy = newSortBy;

          break;
        }

        case ActionType.UpdateInvoice: {
          const { payload } = action;
          const { key, value } = payload;

          // TODO: The type of value is typed in the action creator,
          // but not in the action. Should be safe for now but should
          // be fixed
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state.draft[key] = value;

          break;
        }

        case ActionType.UpsertLine: {
          const { draft } = state;
          const { payload } = action;
          const { items } = draft;

          const { line } = payload;

          const { existingSummaryItem, existingRow } = getExistingLine(
            items,
            line
          );

          // If the row is being updated
          if (existingSummaryItem) {
            if (existingRow) {
              if (line.numberOfPacks === 0) {
                // Then, if the new number of packs is zero, delete the row
                // Deleting: If the line is created, remove it from state completely.
                if (line.isCreated) {
                  delete existingSummaryItem.batches[line.id];

                  // If this was the last line being removed, also remove the summary item.
                  if (!Object.values(existingSummaryItem.batches).length) {
                    draft.items = draft.items.filter(
                      ({ id }) => existingSummaryItem.id !== id
                    );
                  }
                  break;
                  // Otherwise, mark for deletion,
                } else {
                  existingRow.isUpdated = false;
                  existingRow.isDeleted = true;
                  existingRow.isCreated = false;
                  existingRow.numberOfPacks = line.numberOfPacks;
                }

                // Otherwise, update as per normal.
              } else {
                existingRow.isUpdated = existingRow.isCreated ? false : true;
                existingRow.isDeleted = false;
                existingRow.numberOfPacks = line.numberOfPacks;
              }

              const { unitQuantity, numberOfPacks } =
                recalculateSummary(existingSummaryItem);
              existingSummaryItem.unitQuantity = unitQuantity;
              existingSummaryItem.numberOfPacks = numberOfPacks;
              existingSummaryItem.batches[existingRow.id] = existingRow;
            } else {
              if (line.numberOfPacks === 0) break;
              const newLine = {
                ...line,
                invoiceId: draft.id,
                isCreated: true,
                isUpdated: false,
                isDeleted: false,
              };
              existingSummaryItem.batches[newLine.id] = newLine;
            }
          } else {
            // Ignore lines which have a number of packs of zero.
            if (line.numberOfPacks === 0) {
              break;
            }

            const newLine = {
              ...line,
              invoiceId: draft.id,
              isCreated: true,
              isUpdated: false,
              isDeleted: false,
            };
            const summaryItem = createSummaryItem(line.itemId, [newLine]);
            items.push(summaryItem);
          }

          break;
        }

        case ActionType.DeleteLine: {
          const { draft } = state;
          const { items } = draft;
          const { payload } = action;

          const { line } = payload;

          const { existingRow, existingSummaryItem } = getExistingLine(
            items,
            line
          );

          if (existingRow && existingSummaryItem) {
            if (existingRow.isCreated) {
              delete existingSummaryItem.batches[line.id];
              if (Object.keys(existingSummaryItem.batches).length === 0) {
                const idx = items.findIndex(
                  ({ id }) => id === existingSummaryItem.id
                );
                items.splice(idx, 1);
              }
            } else {
              if (existingSummaryItem.batches[line.id]) {
                // The if condition above doesn't help TS know that this is guaranteed
                // to be defined.
                (
                  existingSummaryItem.batches[
                    existingRow.id
                  ] as OutboundShipmentRow
                ).isDeleted = true;

                const allDeleted = Object.values(
                  existingSummaryItem.batches
                ).every(({ isDeleted }) => isDeleted);
                if (allDeleted) existingSummaryItem.isDeleted = true;
              }
            }
          }

          break;
        }
      }
      return state;
    }
  );

const mergeLines = (
  serverLine: InvoiceLine,
  clientLine: OutboundShipmentRow
) => {
  const newLine = {
    ...clientLine,
    ...serverLine,
    isUpdated: true,
    isCreated: false,
    isDeleted: false,
  };

  return newLine;
};

const createLine = (
  line: InvoiceLine,
  draft: OutboundShipment
): OutboundShipmentRow => {
  return {
    ...line,
    stockLineId: line.stockLine?.id ?? '',
    invoiceId: draft.id,
  };
};
