import { sheets_v4 } from 'googleapis';
import getUniqueId from '../getUniqueId';
import appendSheetData from '../server/googleSheets/appendSheetData';
import batchUpdateSheetData from '../server/googleSheets/batchUpdateSheetData';
import fetchSheetData from '../server/googleSheets/fetchSheetData';
import {
  Sheet,
  SheetBool,
  ValueInputOption,
} from '../server/googleSheets/types';
import { getItemCraftTime, getItemRawResource } from './items';
import {
  Category,
  ItemName,
  MaterialItemName,
  RawResource,
} from './items.types';
import { getRequiredResources } from './refining';
import {
  DeliveryRequest,
  RefiningRequest,
  ManufacturingRequest,
  Priority,
  RequestType,
  Request,
  RefiningRequestRow,
  RequestRow,
  DeliveryRequestRow,
  ManufacturingRequestRow,
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
    item: item as MaterialItemName,
    quantity: parseInt(quantity),
    category: category as RawResource,
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
    timeRequested,
    timeAccepted,
    timeCompleted,
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
    item: item as ItemName,
    quantity: parseInt(quantity),
    category: category as Category,
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
    timeRequested,
    timeAccepted,
    timeCompleted,
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
    item: item as ItemName,
    quantity: parseInt(quantity),
    category: category as Category,
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
    timeRequested,
    timeAccepted,
    timeCompleted,
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

// Row constructor helpers
function constructRefiningRequestRow(
  request: Partial<RefiningRequest>
): RefiningRequestRow {
  const {
    item,
    quantity,
    category = getItemRawResource(item),
    refineryZone,
    region,
    coordinates,
    acceptedBy,
    completed,
    craftTime = getItemCraftTime(item),
    confirmed,
    timeRequested = new Date().toUTCString(),
    timeAccepted,
    timeCompleted,
    id = getUniqueId(),
  } = request;

  const {
    requiredSalvage,
    requiredComponents,
    requiredSulfur,
    requiredCrudeOil,
    requiredAluminium,
    requiredIron,
    requiredCopper,
  } = getRequiredResources(item, quantity);

  return [
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
    id,
  ];
}

function constructManufacturingRequestRow(
  request: Partial<ManufacturingRequest>
): ManufacturingRequestRow {
  const {
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
    id,
  } = request;
  return [
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
    id,
  ];
}

function constructDistributionRequestRow(
  request: Partial<DeliveryRequest>
): DeliveryRequestRow {
  const {
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
    id,
  } = request;
  return [
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
    id,
  ];
}

export function constructRequestRow<R extends RequestType>(
  type: R,
  request: Partial<Request>
): RequestRow | [] {
  switch (type) {
    case RequestType.REFINING:
      return constructRefiningRequestRow(request as Partial<RefiningRequest>);
    case RequestType.MANUFACTURING:
      return constructManufacturingRequestRow(
        request as Partial<ManufacturingRequest>
      );
    case RequestType.DISTRIBUTING:
      return constructDistributionRequestRow(
        request as Partial<DeliveryRequest>
      );

    default:
      return [];
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

export async function addRequestData(
  type: RequestType,
  data: Parameters<typeof appendSheetData>[0]['data']
) {
  return await appendSheetData({
    sheet: typeToSheetMap[type],
    data,
  });
}
