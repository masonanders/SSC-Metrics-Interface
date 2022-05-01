import { RequestType } from './types';

export const requestTypeSheetEndColumnMap = {
  [RequestType.REFINING]: 'U',
  [RequestType.MANUFACTURING]: 'T',
  [RequestType.DISTRIBUTING]: 'R',
} as const;

export const requestTypeSheetRequestIdCellMap = {
  [RequestType.REFINING]: 'U',
  [RequestType.MANUFACTURING]: 'T',
  [RequestType.DISTRIBUTING]: 'R',
} as const;

// Requested
export const requestTypeSheetTimeRequestedColumnMap = {
  [RequestType.REFINING]: 'R',
  [RequestType.MANUFACTURING]: 'Q',
  [RequestType.DISTRIBUTING]: 'O',
};

// Accepted
export const requestTypeSheetAcceptedByColumnMap = {
  [RequestType.REFINING]: 'G',
  [RequestType.MANUFACTURING]: 'I',
  [RequestType.DISTRIBUTING]: 'L',
};

export const requestTypeSheetTimeAcceptedColumnMap = {
  [RequestType.REFINING]: 'S',
  [RequestType.MANUFACTURING]: 'R',
  [RequestType.DISTRIBUTING]: 'P',
};

// Completed
export const requestTypeSheetCompletedColumnMap = {
  [RequestType.REFINING]: 'H',
  [RequestType.MANUFACTURING]: 'J',
  [RequestType.DISTRIBUTING]: 'M',
};

export const requestTypeSheetTimeCompletedColumnMap = {
  [RequestType.REFINING]: 'T',
  [RequestType.MANUFACTURING]: 'S',
  [RequestType.DISTRIBUTING]: 'Q',
};
