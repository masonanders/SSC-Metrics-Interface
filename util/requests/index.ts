import { sheets_v4 } from 'googleapis';
import getUniqueId from '../getUniqueId';
import batchUpdateSheetData from '../server/googleSheets/batchUpdateSheetData';
import fetchSheetData from '../server/googleSheets/fetchSheetData';
import { Sheet, SheetBool } from '../server/googleSheets/types';
import {
  DeliveryRequest,
  GatheringRequest,
  ManufacturingRequest,
  Priority,
  RequestType,
  Request,
} from './types';

// Sheet address maps
const typeToSheetMap = {
  [RequestType.GATHERING]: Sheet.GATHERING_REQUESTS,
  [RequestType.MANUFACTURING]: Sheet.MANUFACTURING_REQUESTS,
  [RequestType.DISTRIBUTING]: Sheet.DELIVERY_REQUESTS,
} as const;

export const requestTypeSheetEndColumnMap = {
  [RequestType.GATHERING]: 'T',
  [RequestType.MANUFACTURING]: 'T',
  [RequestType.DISTRIBUTING]: 'R',
} as const;

export const requestTypeSheetRequestIdCellMap = {
  [RequestType.GATHERING]: 'T',
  [RequestType.MANUFACTURING]: 'T',
  [RequestType.DISTRIBUTING]: 'R',
} as const;

export function validateRequestTypeParam(
  type: string | string[]
): type is RequestType {
  return (
    typeof type === 'string' &&
    [
      RequestType.GATHERING,
      RequestType.MANUFACTURING,
      RequestType.DISTRIBUTING,
    ].includes(type as RequestType)
  );
}

// Row processing helpers
export function processGatheringRequestsRow(
  row: string[],
  rowNum: number
): GatheringRequest {
  const [
    item,
    quantity,
    category,
    requester,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority,
    acceptedBy,
    completed,
    requiredSalvage,
    requiredComponents,
    requiredCrudeOil,
    requiredSulfur,
    craftTime,
    confirmed,
    timeRequested,
    timeAccepted,
    timeCompleted,
    uniqueId,
  ] = row;
  return {
    rowNum,
    item,
    quantity: parseInt(quantity),
    category,
    requester,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority: priority as Priority,
    acceptedBy,
    completed: completed && completed === SheetBool.TRUE,
    requiredSalvage: parseInt(requiredSalvage),
    requiredComponents: parseInt(requiredComponents),
    requiredCrudeOil: parseInt(requiredCrudeOil),
    requiredSulfur: parseInt(requiredSulfur),
    craftTime,
    confirmed: confirmed && confirmed === SheetBool.TRUE,
    timeRequested: new Date(timeRequested).getTime(),
    timeAccepted: new Date(timeAccepted).getTime(),
    timeCompleted: new Date(timeCompleted).getTime(),
    id: uniqueId,
  };
}

export function processManufacturingRequestsRow(
  row: string[],
  rowNum: number
): ManufacturingRequest {
  const [
    item,
    quantity,
    category,
    requester,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority,
    acceptedBy,
    completed,
    requiredBuildingMaterials,
    requiredExplosiveMaterials,
    requiredRefinedMaterials,
    requiredHeavyExplosiveMaterials,
    craftTime,
    confirmed,
    timeRequested,
    timeAccepted,
    timeCompleted,
    uniqueId,
  ] = row;
  return {
    rowNum,
    item,
    quantity: parseInt(quantity),
    category,
    requester,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority: priority as Priority,
    acceptedBy,
    completed: completed && completed === SheetBool.TRUE,
    requiredBuildingMaterials: parseInt(requiredBuildingMaterials),
    requiredExplosiveMaterials: parseInt(requiredExplosiveMaterials),
    requiredRefinedMaterials: parseInt(requiredRefinedMaterials),
    requiredHeavyExplosiveMaterials: parseInt(requiredHeavyExplosiveMaterials),
    craftTime,
    confirmed: confirmed && confirmed === SheetBool.TRUE,
    timeRequested: new Date(timeRequested).getTime(),
    timeAccepted: new Date(timeAccepted).getTime(),
    timeCompleted: new Date(timeCompleted).getTime(),
    id: uniqueId,
  };
}

export function processDelivereyRequestsRow(
  row: string[],
  rowNum: number
): DeliveryRequest {
  const [
    item,
    quantity,
    category,
    requester,
    pickupLocation,
    pickupRegion,
    pickupZone,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority,
    acceptedBy,
    completed,
    confirmed,
    timeRequested,
    timeAccepted,
    timeCompleted,
    uniqueId,
  ] = row;
  return {
    rowNum,
    item,
    quantity: parseInt(quantity),
    category,
    requester,
    pickupLocation,
    pickupRegion,
    pickupZone,
    deliveryLocation,
    deliveryRegion,
    deliveryZone,
    priority: priority as Priority,
    acceptedBy,
    completed: completed && completed === SheetBool.TRUE,
    confirmed: confirmed && confirmed === SheetBool.TRUE,
    timeRequested: new Date(timeRequested).getTime(),
    timeAccepted: new Date(timeAccepted).getTime(),
    timeCompleted: new Date(timeCompleted).getTime(),
    id: uniqueId,
  };
}

function getProcessRequestRowHelper(type: RequestType) {
  switch (type) {
    case RequestType.GATHERING:
      return processGatheringRequestsRow;
    case RequestType.MANUFACTURING:
      return processManufacturingRequestsRow;
    case RequestType.DISTRIBUTING:
      return processDelivereyRequestsRow;
  }
}

export function processRows(
  data: sheets_v4.Schema$ValueRange,
  type: RequestType
): { rows: Request[]; rowsWithoutIds: Request[] } {
  const rowsWithoutIds: Request[] = [];
  const rows: Request[] = data.values.reduce((rows, row, idx) => {
    const rowNum = idx + 1;
    // TODO: Determine which processing func to use
    const processRequestRow = getProcessRequestRowHelper(type);

    if (idx === 0 || !!row[0]) {
      const processedRow = processRequestRow(row, rowNum);

      if (processedRow.id) {
        return [...rows, processedRow];
      } else {
        const id = getUniqueId();
        const rowWithId = { ...processedRow, id };

        rowsWithoutIds.push(rowWithId);
        return [...rows, rowWithId];
      }
    }

    return rows;
  }, [] as Request[]);

  return { rows, rowsWithoutIds };
}

// HTTP Request helpers
export async function getRequestData(type: RequestType, toColumn: string) {
  return await fetchSheetData({
    sheet: typeToSheetMap[type],
    from: { column: 'A', row: 1 },
    to: { column: toColumn, row: 100 },
  });
}

export async function updateRequestData(
  type: RequestType,
  data: Parameters<typeof batchUpdateSheetData>[0]['data']
) {
  return await batchUpdateSheetData({
    sheet: typeToSheetMap[type],
    data,
  });
}
