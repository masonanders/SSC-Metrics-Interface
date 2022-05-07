import { sheets_v4 } from 'googleapis';
import getUniqueId from '../getUniqueId';
import batchUpdateSheetData from '../server/googleSheets/batchUpdateSheetData';
import fetchSheetData from '../server/googleSheets/fetchSheetData';
import {
  Sheet,
  SheetBool,
  ValueInputOption,
} from '../server/googleSheets/types';
import {
  DeliveryRequest,
  RefiningRequest,
  ManufacturingRequest,
  Priority,
  RequestType,
  Request,
} from './types';

// Sheet address maps
const typeToSheetMap = {
  [RequestType.REFINING]: Sheet.REFINING_REQUESTS,
  [RequestType.MANUFACTURING]: Sheet.MANUFACTURING_REQUESTS,
  [RequestType.DISTRIBUTING]: Sheet.DELIVERY_REQUESTS,
} as const;

export function validateRequestTypeParam(
  type: string | string[]
): type is RequestType {
  return (
    typeof type === 'string' &&
    [
      RequestType.REFINING,
      RequestType.MANUFACTURING,
      RequestType.DISTRIBUTING,
    ].includes(type as RequestType)
  );
}

// Row processing helpers
export function processRefiningRequestsRow(
  row: string[],
  rowNum: number
): RefiningRequest {
  const [
    item,
    quantity,
    category,
    refineryZone,
    region,
    coordinates,
    acceptedBy,
    completed,
    requiredSalvage,
    requiredComponents,
    requiredSulfur,
    requiredCrudeOil,
    requiredAluminium,
    requiredIron,
    requiredCopper,
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
    refineryZone,
    region,
    coordinates,
    acceptedBy,
    completed: completed && completed === SheetBool.TRUE,
    requiredSalvage: parseInt(requiredSalvage),
    requiredComponents: parseInt(requiredComponents),
    requiredSulfur: parseInt(requiredSulfur),
    requiredCrudeOil: parseInt(requiredCrudeOil),
    requiredAluminium: parseInt(requiredAluminium),
    requiredIron: parseInt(requiredIron),
    requiredCopper: parseInt(requiredCopper),
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
    case RequestType.REFINING:
      return processRefiningRequestsRow;
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
    to: { column: toColumn, row: 200 },
  });
}

export async function updateRequestData(
  type: RequestType,
  data: Parameters<typeof batchUpdateSheetData>[0]['data'],
  valueInput?: ValueInputOption
) {
  return await batchUpdateSheetData({
    sheet: typeToSheetMap[type],
    data,
    valueInputOption: valueInput,
  });
}
