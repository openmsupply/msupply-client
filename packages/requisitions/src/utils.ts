import { SupplierRequisitionNodeStatus } from '@openmsupply-client/common';

import {
  Requisition,
  SupplierRequisition,
  CustomerRequisition,
  RequisitionRow,
} from './types';

export const placeholderSupplierRequisition: SupplierRequisition = {
  id: '',
  requisitionNumber: 0,
  isDeleted: false,
  lines: [],
  color: '#cdcdcd',
  otherParty: {
    id: '',
    name: '',
    code: '',
    isCustomer: false,
    isSupplier: true,
  },
  otherPartyId: '',
  otherPartyName: '',
  status: SupplierRequisitionNodeStatus.Draft,
  orderDate: null,
  requisitionDate: null,
  update: () => {
    throw new Error(
      'Placeholder callback update has been triggered. This should never happen!'
    );
  },
  updateOtherParty: () => {
    throw new Error(
      'Placeholder callback updateOtherParty has been triggered. This should never happen!'
    );
  },
  updateRequisitionDate: () => {
    throw new Error(
      'Placeholder callback updateRequisitionDate has been triggered. This should never happen!'
    );
  },
  updateOrderDate: () => {
    throw new Error(
      'Placeholder callback updateOrderDate has been triggered. This should never happen!'
    );
  },
};

export const placeholderCustomerRequisition: CustomerRequisition = {
  id: '',
  requisitionNumber: 0,
  isDeleted: false,
  lines: [],
  color: '#cdcdcd',
  otherParty: {
    id: '',
    name: '',
    code: '',
    isCustomer: false,
    isSupplier: true,
  },
  otherPartyId: '',
  otherPartyName: '',
  status: SupplierRequisitionNodeStatus.Draft,
  orderDate: null,
  requisitionDate: null,
  update: () => {
    throw new Error(
      'Placeholder callback update has been triggered. This should never happen!'
    );
  },
  updateOtherParty: () => {
    throw new Error(
      'Placeholder callback updateOtherParty has been triggered. This should never happen!'
    );
  },
  updateRequisitionDate: () => {
    throw new Error(
      'Placeholder callback updateRequisitionDate has been triggered. This should never happen!'
    );
  },
  updateOrderDate: () => {
    throw new Error(
      'Placeholder callback updateOrderDate has been triggered. This should never happen!'
    );
  },
};

export const isRequisitionEditable = (requisition: Requisition): boolean => {
  return (
    requisition.status === SupplierRequisitionNodeStatus.Draft ||
    requisition.status === SupplierRequisitionNodeStatus.InProgress
  );
};

// TODO: When supplier requisition statuses are finalised, this function should be passed
// `t` and should properly translate the status.
export const getSupplierRequisitionTranslator =
  () =>
  (currentStatus: SupplierRequisitionNodeStatus): string =>
    currentStatus;

// TODO: When supplier requisition statuses are finalised, this function should
// return the next status rather than just returning the current status
export const getNextSupplierRequisitionStatus = (
  currentStatus: SupplierRequisitionNodeStatus
): SupplierRequisitionNodeStatus => {
  const statuses = getSupplierRequisitionStatuses();
  const currentIdx = statuses.findIndex(
    requisitionStatus => requisitionStatus === currentStatus
  );

  if (currentIdx < 0) {
    throw new Error('Cannot find index of current supplier requisition idx');
  }

  const nextStatus = statuses[currentIdx + 1];

  if (!nextStatus) {
    throw new Error('Cannot find next supplier requisition status');
  }

  return nextStatus;
};

export const getSupplierRequisitionStatuses =
  (): SupplierRequisitionNodeStatus[] => [
    SupplierRequisitionNodeStatus.Draft,
    SupplierRequisitionNodeStatus.InProgress,
    SupplierRequisitionNodeStatus.Finalised,
    SupplierRequisitionNodeStatus.Sent,
  ];

export const canDeleteRequisition = (requisitionRow: RequisitionRow): boolean =>
  requisitionRow.status === SupplierRequisitionNodeStatus.Draft;

export const getNextStatusText = (
  status: SupplierRequisitionNodeStatus
): string => {
  const nextStatus = getNextSupplierRequisitionStatus(status);
  const translation = getSupplierRequisitionTranslator()(nextStatus);
  return translation;
};

export const createStatusLog = (
  status: 'DRAFT' | 'IN_PROGRESS' | 'FINALISED' | 'SENT'
) => {
  if (status === 'DRAFT') {
    return {
      DRAFT: new Date().toISOString(),
      IN_PROGRESS: null,
      FINALISED: null,
      SENT: null,
    };
  }
  if (status === 'IN_PROGRESS') {
    return {
      DRAFT: new Date().toISOString(),
      IN_PROGRESS: new Date().toISOString(),
      FINALISED: null,
      SENT: null,
    };
  }

  if (status === 'FINALISED') {
    return {
      DRAFT: new Date().toISOString(),
      IN_PROGRESS: new Date().toISOString(),
      FINALISED: new Date().toISOString(),
      SENT: null,
    };
  }

  return {
    DRAFT: new Date().toISOString(),
    IN_PROGRESS: new Date().toISOString(),
    FINALISED: new Date().toISOString(),
    SENT: new Date().toISOString(),
  };
};
