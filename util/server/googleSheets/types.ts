export enum ValueInputOption {
  RAW = 'RAW',
  USER_ENTERED = 'USER_ENTERED',
}

export type RangeCoordinate = { column: string; row: string | number };

export enum Sheet {
  MANUFACTURING_REQUESTS = 'Manufacturing Requests',
  REFINING_REQUESTS = 'Refining Requests',
  DELIVERY_REQUESTS = 'Delivery Requests',
  FEEDBACK = 'Web app feedback',
  LISTS = 'Lists',
}

export enum SheetBool {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

export enum SheetDimension {
  ROWS = 'ROWS',
  COLUMNS = 'COLUMNS',
}
