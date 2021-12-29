import React, { useEffect, useState } from 'react';

import {
  DialogButton,
  Grid,
  Item,
  useForm,
  useDialog,
  FormProvider,
  generateUUID,
  InlineSpinner,
  Box,
  useTranslation,
} from '@openmsupply-client/common';
import { useStockLines } from '@openmsupply-client/system';
import { BatchesTable, sortByExpiry } from './BatchesTable';
import { ItemDetailsForm } from './ItemDetailsForm';
import {
  BatchRow,
  OutboundShipment,
  OutboundShipmentRow,
  OutboundShipmentSummaryItem,
} from '../../../types';

interface ItemDetailsModalProps {
  summaryItem: OutboundShipmentSummaryItem | null;
  invoiceLine?: OutboundShipmentRow;
  isOpen: boolean;
  onClose: () => void;
  upsertInvoiceLine: (invoiceLine: OutboundShipmentRow) => void;
  onChangeItem: (item: Item | null) => void;
  onNext: () => void;
  isEditMode: boolean;
  isOnlyItem: boolean;
  draft: OutboundShipment;
}

export const getInvoiceLine = (
  id: string,
  summaryItem: OutboundShipmentSummaryItem,
  stockLineOrPlaceholder: Partial<BatchRow> & { id: string },
  numberOfPacks: number
): OutboundShipmentRow => ({
  id,
  numberOfPacks,
  invoiceId: '',
  itemId: summaryItem.itemId,
  itemName: summaryItem.itemName,
  itemCode: summaryItem.itemCode,
  // itemUnit: summaryItem.itemUnit ?? '',
  batch: stockLineOrPlaceholder.batch ?? '',
  locationName: stockLineOrPlaceholder.locationName ?? '',
  costPricePerPack: stockLineOrPlaceholder.costPricePerPack ?? 0,
  sellPricePerPack: stockLineOrPlaceholder.sellPricePerPack ?? 0,
  stockLineId: stockLineOrPlaceholder.id,
  packSize: stockLineOrPlaceholder.packSize ?? 1,
  expiryDate: stockLineOrPlaceholder.expiryDate
    ? new Date(stockLineOrPlaceholder.expiryDate)
    : null,
  note: stockLineOrPlaceholder?.note ?? '',
});

const createPlaceholderRow = (): BatchRow => ({
  availableNumberOfPacks: 0,
  batch: 'Placeholder',
  costPricePerPack: 0,
  id: 'placeholder',
  itemId: 'placeholder',
  onHold: false,
  packSize: 1,
  sellPricePerPack: 0,
  storeId: '',
  totalNumberOfPacks: 0,
  numberOfPacks: 0,
});

const useBatchRows = (summaryItem: OutboundShipmentSummaryItem | null) => {
  const [batchRows, setBatchRows] = useState<BatchRow[]>([]);
  const { data, isLoading } = useStockLines(summaryItem?.itemCode ?? '');

  useEffect(() => {
    if (!summaryItem) {
      return setBatchRows([]);
    }

    if (!data) return;

    setBatchRows(() => {
      const rows = data
        .map(batch => {
          const matchingInvoiceRow = Object.values(summaryItem.batches).find(
            ({ stockLineId }) => stockLineId === batch.id
          );
          return {
            ...batch,
            numberOfPacks: matchingInvoiceRow?.numberOfPacks ?? 0,
            availableNumberOfPacks:
              batch.availableNumberOfPacks +
              (matchingInvoiceRow?.numberOfPacks ?? 0),
          };
        })
        .sort(sortByExpiry);

      rows.push(createPlaceholderRow());
      return rows;
    });
  }, [data]);

  return { batchRows, isLoading, setBatchRows };
};

export type PackSizeController = ReturnType<typeof usePackSizeController>;

const usePackSizeController = (
  batches: {
    packSize: number;
    onHold: boolean;
    availableNumberOfPacks: number;
  }[]
) => {
  // Creating a sorted array of distinct pack sizes
  const packSizes = Array.from(
    new Set(
      batches
        .filter(
          ({ onHold, availableNumberOfPacks }) =>
            availableNumberOfPacks > 0 && !onHold
        )
        .reduce((sizes, { packSize }) => [...sizes, packSize], [] as number[])
        .sort((a, b) => a - b)
    )
  );

  const options = packSizes.map(packSize => ({
    label: String(packSize),
    value: packSize,
  }));

  const defaultPackSize = options[0] ?? { label: '', value: '' };

  const [selected, setSelected] = useState(defaultPackSize);

  const setPackSize = (newValue: number) => {
    const packSizeOption = options.find(({ value }) => value === newValue);
    if (!packSizeOption) return;
    setSelected(packSizeOption);
  };

  useEffect(() => {
    if (defaultPackSize.value && typeof defaultPackSize.value == 'number') {
      setPackSize(defaultPackSize.value);
    }
    if (packSizes.length === 0) {
      setSelected({ label: '', value: '' });
    }
  }, [defaultPackSize.value]);

  return { selected, setPackSize, options };
};

const sumAvailableQuantity = (batchRows: BatchRow[]) => {
  const sum = batchRows.reduce(
    (acc, { availableNumberOfPacks, packSize }) =>
      acc + availableNumberOfPacks * packSize,
    0
  );

  return sum;
};

const getAllocatedQuantity = (batchRows: BatchRow[]) => {
  return batchRows
    .filter(({ id }) => id !== 'placeholder')
    .reduce(
      (acc, { numberOfPacks, packSize }) => acc + numberOfPacks * packSize,
      0
    );
};

const issueStock = (
  batchRows: BatchRow[],
  idToIssue: string,
  value: number
) => {
  const foundRowIdx = batchRows.findIndex(({ id }) => id === idToIssue);
  const foundRow = batchRows[foundRowIdx];
  if (!foundRow) return [];

  const newBatchRows = [...batchRows];
  newBatchRows[foundRowIdx] = {
    ...foundRow,
    numberOfPacks: value,
  };

  return newBatchRows;
};

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  isOpen,
  onClose,
  upsertInvoiceLine,
  onChangeItem,
  summaryItem,
  onNext,
  isEditMode,
  isOnlyItem,
  draft,
}) => {
  const t = useTranslation(['distribution']);
  const methods = useForm({ mode: 'onBlur' });
  const { reset, register } = methods;

  const { batchRows, setBatchRows, isLoading } = useBatchRows(summaryItem);
  const packSizeController = usePackSizeController(batchRows);

  const { hideDialog, showDialog, Modal } = useDialog({
    onClose,
  });

  const onReset = () => {
    reset();
  };
  const onCancel = () => {
    onClose();
    onReset();
  };
  const upsert = () => {
    if (!summaryItem) return null;

    // TODO: Handle placeholder upserting.
    const invoiceLines = batchRows
      .filter(({ id }) => id !== 'placeholder')
      .map(batch =>
        getInvoiceLine(generateUUID(), summaryItem, batch, batch.numberOfPacks)
      );

    // Upsert each line. Any lines which do no already exist and have no had any
    // packs allocated, will not be created, but those which already exist and have
    // their quantity reduced to 0 will be marked for deletion.
    invoiceLines.forEach(upsertInvoiceLine);

    onReset();
  };
  const upsertAndClose = () => {
    upsert();
    onClose();
    onReset();
    onChangeItem(null);
  };

  const allocateQuantities = (
    newValue: number,
    issuePackSize: number | null
  ) => {
    // if invalid quantity entered, don't allocate
    if (newValue < 1 || Number.isNaN(newValue)) {
      return;
    }
    // If there is only one batch row, then it is the placeholder.
    // Assign all of the new value and short circuit.
    if (batchRows.length === 1) {
      setBatchRows(
        issueStock(batchRows, 'placeholder', newValue * (issuePackSize || 1))
      );
    }

    // calculations are normalised to units
    let toAllocate = newValue * (issuePackSize || 1);

    const newBatchRows = [...batchRows];
    const validBatches = newBatchRows
      .filter(
        ({ packSize, onHold, availableNumberOfPacks }) =>
          (issuePackSize ? packSize === issuePackSize : true) &&
          availableNumberOfPacks > 0 &&
          !onHold
      )
      .sort(sortByExpiry);

    validBatches.forEach(batch => {
      const batchRowIdx = newBatchRows.findIndex(({ id }) => batch.id === id);
      const batchRow = newBatchRows[batchRowIdx];
      if (!batchRow) return null;
      const currentAllocatedUnits = batchRow.numberOfPacks * batchRow.packSize;
      const totalAvailableUnits =
        batchRow.availableNumberOfPacks * batchRow.packSize;
      const availableUnits = totalAvailableUnits - currentAllocatedUnits;
      const allocatedUnits = Math.min(toAllocate, availableUnits);
      const allocatedNumberOfPacks = Math.floor(
        allocatedUnits / batchRow.packSize
      );

      toAllocate -= allocatedUnits;

      newBatchRows[batchRowIdx] = {
        ...batchRow,
        numberOfPacks: batchRow.numberOfPacks + allocatedNumberOfPacks,
      };
    });

    const placeholderIdx = newBatchRows.findIndex(
      ({ id }) => id === 'placeholder'
    );
    const placeholder = newBatchRows[placeholderIdx];

    if (!placeholder) throw new Error('No placeholder within item editing');

    newBatchRows[placeholderIdx] = {
      ...placeholder,
      numberOfPacks:
        placeholder.numberOfPacks + toAllocate * (issuePackSize || 1),
    };

    setBatchRows(newBatchRows);
  };

  const onChangeRowQuantity = (batchId: string, value: number) => {
    setBatchRows(issueStock(batchRows, batchId, value));
  };

  React.useEffect(() => {
    if (isOpen) showDialog();
    else {
      onChangeItem(null);
      hideDialog();
    }
  }, [isOpen]);

  return (
    <Modal
      title={t(isEditMode ? 'heading.edit-item' : 'heading.add-item')}
      cancelButton={<DialogButton variant="cancel" onClick={onCancel} />}
      nextButton={
        <DialogButton
          disabled={isEditMode && isOnlyItem}
          variant="next"
          onClick={onNext}
        />
      }
      okButton={<DialogButton variant="ok" onClick={upsertAndClose} />}
      height={600}
      width={900}
    >
      <FormProvider {...methods}>
        <form>
          <Grid container gap={0.5}>
            <ItemDetailsForm
              draft={draft}
              availableQuantity={sumAvailableQuantity(batchRows)}
              packSizeController={packSizeController}
              onChangeItem={onChangeItem}
              onChangeQuantity={(newQuantity, newPackSize) =>
                allocateQuantities(newQuantity, newPackSize)
              }
              register={register}
              allocatedQuantity={getAllocatedQuantity(batchRows)}
              summaryItem={summaryItem || undefined}
            />
            {!!summaryItem ? (
              !isLoading ? (
                <BatchesTable
                  onChange={onChangeRowQuantity}
                  register={register}
                  rows={batchRows}
                />
              ) : (
                <Box
                  display="flex"
                  flex={1}
                  height={300}
                  justifyContent="center"
                  alignItems="center"
                >
                  <InlineSpinner />
                </Box>
              )
            ) : null}
          </Grid>
        </form>
      </FormProvider>
    </Modal>
  );
};
