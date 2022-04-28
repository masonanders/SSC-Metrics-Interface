export enum ValueInputOption {
  RAW = 'RAW',
  USER_ENTERED = 'USER_ENTERED',
}

export type RangeCoordinate = { column: string; row: string | number };

export enum Sheet {
  MANUFACTURING_REQUESTS = 'Manufacturing Requests',
  REFINING_REQUESTS = 'Refining Requests',
  DELIVERY_REQUESTS = 'Delivery Requests',
}

export enum SheetBool {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}
